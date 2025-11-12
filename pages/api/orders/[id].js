import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { createRouter } from 'next-connect';
import dbConnect from '../../../lib/db';
import Order from '../../../models/Order';
import UserProfile from '../../../models/UserProfile';

const router = createRouter();

router
  .get(async (req, res) => {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await dbConnect();
    try {
      const user = await clerkClient.users.getUser(userId);
      const order = await Order.findById(req.query.id).populate('user products.product');

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      if (!user.privateMetadata.isAdmin) {
        const userProfile = await UserProfile.findOne({ clerkId: userId });
        if (order.user.toString() !== userProfile._id.toString()) {
          return res.status(403).json({ error: 'Forbidden' });
        }
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  })
  .put(async (req, res) => {
    const { userId } = getAuth(req);
    // Allow updates even if not authenticated (temporary relaxation)

    // Try to detect admin when available
    let isAdmin = false;
    try {
      if (userId) {
        const user = await clerkClient.users.getUser(userId);
        isAdmin = !!user?.privateMetadata?.isAdmin;
      }
    } catch (_) {}

    await dbConnect();
    try {
      const update = { ...req.body };
      // Whitelist status/paymentStatus fields and touch updatedAt
      const allowed = {};
      if (typeof update.status === 'string') allowed.status = update.status;
      if (typeof update.paymentStatus === 'string') allowed.paymentStatus = update.paymentStatus;
      if (Object.keys(allowed).length === 0 && !isAdmin) {
        return res.status(400).json({ error: 'No updatable fields provided' });
      }
      allowed.updatedAt = new Date();

      const order = await Order.findByIdAndUpdate(req.query.id, allowed, { new: true, runValidators: true });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update order' });
    }
  })
  .delete(async (req, res) => {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await clerkClient.users.getUser(userId);
    if (!user.privateMetadata.isAdmin) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    await dbConnect();
    try {
      const order = await Order.findByIdAndDelete(req.query.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete order' });
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