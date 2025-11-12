import { NextRequest, NextResponse } from 'next/server';
import { verifyStripeSignature } from '@/lib/stripe';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import UserProfile from '@/models/UserProfile';
import Address from '@/models/Address';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const isLocalhost = process.env.NODE_ENV === 'development' && !webhookSecret?.startsWith('whsec_');

    // Handle localhost development without webhook secret
    if (isLocalhost) {
      let event;
      try {
        event = JSON.parse(body);
      } catch (err) {
        return NextResponse.json(
          { error: 'Invalid JSON body' },
          { status: 400 }
        );
      }
      
      await handleWebhookEvent(event);
      return NextResponse.json({ received: true });
    }

    // Production mode - require signature verification
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }

    let event;
    try {
      event = verifyStripeSignature(body, signature);
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    await handleWebhookEvent(event);
    return NextResponse.json({ received: true });

  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Extracted event handling logic
async function handleWebhookEvent(event: any) {
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;
    
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    
    case 'payment_intent.canceled':
      await handlePaymentCanceled(event.data.object);
      break;
    
    default:
      // Unhandled event type
  }
}

async function handlePaymentSuccess(paymentIntent: any) {
  await dbConnect();
  try {
    const {
      id,
      amount,
      currency,
      metadata,
      receipt_email,
      created
    } = paymentIntent;

    // Parse metadata with error handling
    const clerkUserId = metadata.userId;
    if (!clerkUserId) {
      throw new Error('Missing userId in payment intent metadata');
    }

    let items: any[] = [];
    try {
      items = JSON.parse(metadata.items || '[]');
    } catch {
      items = [];
    }

    const subtotal = parseFloat(metadata.subtotal || '0');
    const shippingCost = parseFloat(metadata.shippingCost || '0');

    let shippingAddressMeta: any = null;
    try {
      shippingAddressMeta = metadata.shippingAddress ? JSON.parse(metadata.shippingAddress) : null;
    } catch {}

    // Resolve or create the user profile (by email + clerkId)
    const email = receipt_email || metadata.email || undefined;
    if (!email) {
      throw new Error('Missing customer email on payment');
    }

    let userProfile = await UserProfile.findOne({ email });
    if (!userProfile) {
      userProfile = await UserProfile.create({ email, clerkId: clerkUserId });
    } else if (!userProfile.clerkId) {
      // Backfill clerkId if missing
      userProfile.clerkId = clerkUserId;
      await userProfile.save();
    }

    // Create a shipping address document if we have one
    let shippingAddressId = undefined as any;
    if (shippingAddressMeta) {
      const addrDoc = await Address.create({
        user: userProfile._id,
        name: shippingAddressMeta.name || 'Shipping Address',
        email,
        streetAddress: shippingAddressMeta.address?.line1 || 'Unknown street',
        apartment: shippingAddressMeta.address?.line2 || '',
        city: shippingAddressMeta.address?.city || 'Unknown city',
        state: shippingAddressMeta.address?.state || 'NA',
        postalCode: shippingAddressMeta.address?.postal_code || '00000',
        country: shippingAddressMeta.address?.country || 'US',
        phone: shippingAddressMeta.phone || 'Not provided',
        isDefault: false,
      });
      shippingAddressId = addrDoc._id;
    }

    // Map items to existing product refs
    const products = items
      .filter((i: any) => i?.id && i?.quantity)
      .map((i: any) => ({ product: i.id, quantity: i.quantity }));

    // Persist order using the existing Order schema used by admin
    const orderDoc = await Order.create({
      user: userProfile._id,
      products,
      total: amount / 100, // in base currency
      status: 'processing',
      shippingAddress: shippingAddressId,
      createdAt: new Date(created * 1000),
    });

    // Reduce stock for each purchased item
    await reduceProductStock(items);

    return orderDoc;

  } catch (error) {
    console.error('❌ Error handling payment success:', error);
    console.error('Payment Intent ID:', paymentIntent.id);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}

async function handlePaymentFailed(paymentIntent: any) {
  await dbConnect();
  try {
    const { id, metadata } = paymentIntent;
    const userId = metadata.userId;

    // Payment failed - could be logged to monitoring service

    // Optionally create a failed order record
    const failedOrder = {
      paymentIntentId: id,
      userId,
      status: 'failed',
      paymentStatus: 'failed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await Order.create(failedOrder);

  } catch (error) {
    console.error('Error handling payment failure:', error);
    throw error;
  }
}

async function handlePaymentCanceled(paymentIntent: any) {
  await dbConnect();
  try {
    const { id, metadata } = paymentIntent;
    const userId = metadata.userId;

    // Payment canceled - could be logged to monitoring service

    // Optionally create a canceled order record
    const canceledOrder = {
      paymentIntentId: id,
      userId,
      status: 'canceled',
      paymentStatus: 'canceled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await Order.create(canceledOrder);

  } catch (error) {
    console.error('Error handling payment cancellation:', error);
    throw error;
  }
}

/**
 * Reduces stock quantity for purchased products in MongoDB
 * @param {Array} items - Array of purchased items with productId and quantity
 */
async function reduceProductStock(items: any[]) {
  await dbConnect();
  for (const item of items) {
    try {
      const productId = item.id;
      const { quantity } = item;
      
      if (!productId || !quantity || quantity <= 0) {
        continue;
      }

      // First, get the current product data
      const product = await Product.findById(productId);
      
      if (!product) {
        continue;
      }

      const currentStock = product.stock || 0;
      const newStock = Math.max(0, currentStock - quantity); // Ensure stock doesn't go below 0
      

      // Update the product stock
      const updateData: any = {
        stock: newStock,
      };

      // If stock reaches 0, update status to "Out of Stock"
      if (newStock === 0) {
        updateData.status = 'Out of Stock';
      }

      // Perform the update
      await Product.findByIdAndUpdate(productId, updateData);

      
    } catch (error) {
      // Continue with other items even if one fails
    }
  }
  
}