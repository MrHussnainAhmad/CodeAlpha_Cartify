import { createRouter } from 'next-connect';
import dbConnect from '../../../lib/db';
import Order from '../../../models/Order';
import UserProfile from '../../../models/UserProfile';
import Address from '../../../models/Address';
import Product from '../../../models/Product';

const router = createRouter();

// Fallback endpoint to persist an order after successful payment on the client.
// This does NOT process payments. It only records the order so admin can see it
// in case the Stripe webhook is not configured or did not fire.
router.post(async (req, res) => {
  await dbConnect();
  try {
    const {
      items, // [{ id: productId, name, price, quantity }]
      shippingAddress, // Stripe AddressElement value shape
      email,
      totalAmount, // number (base currency units)
      shippingCost,
    } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items are required' });
    }

    // Normalize email (fallback if missing)
    const customerEmail = typeof email === 'string' && email.includes('@') ? email : 'guest@example.com';

    // Compute total if missing/invalid
    const computedSubtotal = items.reduce((sum, i) => {
      const price = Number(i?.price ?? i?.product?.originalPrice ?? i?.product?.price ?? 0) || 0;
      const qty = Number(i?.quantity) || 0;
      return sum + price * qty;
    }, 0);
    const ship = typeof shippingCost === 'number' ? shippingCost : 0;
    const normalizedTotal = (typeof totalAmount === 'number' && totalAmount > 0) ? totalAmount : (computedSubtotal + ship);

    // Resolve or create the user profile by email
    let userProfile = await UserProfile.findOne({ email: customerEmail });
    if (!userProfile) {
      userProfile = await UserProfile.create({ email: customerEmail });
    }

    // Optionally create a shipping address document
    let shippingAddressId = undefined;
    if (shippingAddress) {
      const addrDoc = await Address.create({
        user: userProfile._id,
        name: shippingAddress.name || 'Shipping Address',
        email: customerEmail,
        streetAddress: shippingAddress.address?.line1 || 'Unknown street',
        apartment: shippingAddress.address?.line2 || '',
        city: shippingAddress.address?.city || 'Unknown city',
        state: shippingAddress.address?.state || 'NA',
        postalCode: shippingAddress.address?.postal_code || '00000',
        country: shippingAddress.address?.country || 'US',
        phone: shippingAddress.phone || 'Not provided',
        isDefault: false,
      });
      shippingAddressId = addrDoc._id;
    }

    // Map items to Order.products [{ product, quantity }]
    const products = items
      .map((i) => {
        const productId = i?.id || i?.product?._id;
        const quantity = Number(i?.quantity) || 0;
        if (!productId || quantity <= 0) return null;
        return { product: productId, quantity };
      })
      .filter(Boolean);

    if (products.length === 0) {
      return res.status(400).json({ error: 'No valid items provided' });
    }

    // Create the order document
    const order = await Order.create({
      user: userProfile._id,
      products,
      total: normalizedTotal,
      status: 'processing',
      shippingAddress: shippingAddressId,
      createdAt: new Date(),
    });

    // Reduce stock for each purchased item (best-effort)
    for (const item of items) {
      try {
        const productId = item?.id || item?.product?._id;
        const qty = Number(item?.quantity) || 0;
        if (!productId || qty <= 0) continue;
        const product = await Product.findById(productId);
        if (!product) continue;
        const currentStock = Number(product.stock) || 0;
        const newStock = Math.max(0, currentStock - qty);
        const updateData = { stock: newStock };
        if (newStock === 0) updateData.status = 'Out of Stock';
        await Product.findByIdAndUpdate(productId, updateData);
      } catch (_) {
        // ignore single item stock reduction failure
      }
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(201).json(order);
  } catch (error) {
    console.error('Error persisting order after payment:', error);
    return res.status(500).json({ error: 'Failed to persist order' });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(405).end('Method Not Allowed');
  },
});
