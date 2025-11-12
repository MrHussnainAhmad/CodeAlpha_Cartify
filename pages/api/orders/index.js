
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { createRouter } from 'next-connect';
import dbConnect from '../../../lib/db';
import Order from '../../../models/Order';
import UserProfile from '../../../models/UserProfile';

const router = createRouter();

router
  .get(async (req, res) => {
    // const { userId } = auth(req);
    // if (!userId) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    await dbConnect();
    try {
      // const user = await clerkClient.users.getUser(userId);
      // if (user.privateMetadata.isAdmin) {
      const raw = await Order.find({})
        .populate('user')
        .populate('products.product')
        .populate('shippingAddress');

      // Map DB schema to UI schema expected by lib/orders.ts consumers
      const toFulfillmentDisplay = (s) => {
        switch ((s || '').toLowerCase()) {
          case 'processing':
          case 'pending':
            return 'Processing';
          case 'on_way':
          case 'shipped':
            return 'On Way';
          case 'about_to_deliver':
            return 'About to Deliver';
          case 'delivered':
            return 'Delivered';
          case 'cancelled':
          case 'canceled':
            return 'Canceled';
          default:
            return 'Processing';
        }
      };

      const orders = raw.map((o) => {
        const items = (o.products || []).map((p) => {
          const prod = p.product || {};
          const price = prod.originalPrice ?? prod.price ?? 0;
          return {
            productId: String(prod._id || ''),
            name: prod.name || 'Product',
            price: Number(price) || 0,
            quantity: Number(p.quantity) || 0,
          };
        });

        const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
        const shippingCost = 0;
        const totalAmount = typeof o.total === 'number' ? o.total : subtotal + shippingCost;

        // Existing UI "status" is used to reflect payment-like state for display
        const statusRaw = (o.status || '').toLowerCase();
        const status = statusRaw === 'failed' ? 'failed'
          : (statusRaw === 'canceled' || statusRaw === 'cancelled') ? 'canceled'
          : 'paid'; // treat fulfillment in progress as paid
        const paymentStatus = status === 'paid' ? 'succeeded' : status;

        const customerEmail = (o.user && o.user.email) || '';

        return {
          _id: String(o._id),
          paymentIntentId: String(o._id),
          userId: o.user ? String(o.user._id) : '',
          items,
          subtotal,
          shippingCost,
          totalAmount,
          currency: 'usd',
          status,
          paymentStatus,
          fulfillmentStatus: toFulfillmentDisplay(statusRaw),
          dbStatus: statusRaw,
          customerEmail,
          billingAddress: undefined,
          shippingAddress: o.shippingAddress || undefined,
          createdAt: o.createdAt ? new Date(o.createdAt).toISOString() : new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      });

      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(orders);
      // }
      // const userProfile = await UserProfile.findOne({ clerkId: userId });
      // const orders = await Order.find({ user: userProfile._id }).populate('products.product');
      // res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  })
  .post(async (req, res) => {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await dbConnect();
    try {
      const userProfile = await UserProfile.findOne({ clerkId: userId });
      const order = await Order.create({ ...req.body, user: userProfile._id });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});
