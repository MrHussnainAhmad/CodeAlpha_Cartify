
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { createRouter } from 'next-connect';
import dbConnect from '../../../lib/db';
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
      let userProfile = await UserProfile.findOne({ clerkId: userId }).populate('addresses');
      if (!userProfile) {
        // Fallback: create profile from Clerk user if missing
        const user = await clerkClient.users.getUser(userId);
        const email = user.emailAddresses?.[0]?.emailAddress;
        if (!email) {
          return res.status(400).json({ error: 'No email on user' });
        }
        userProfile = await UserProfile.findOne({ email });
        if (!userProfile) {
          userProfile = await UserProfile.create({
            clerkId: userId,
            email,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
          });
        } else if (!userProfile.clerkId) {
          userProfile.clerkId = userId;
          await userProfile.save();
        }
      }
      res.status(200).json(userProfile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  })
  .put(async (req, res) => {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await dbConnect();
    try {
      const userProfile = await UserProfile.findOneAndUpdate({ clerkId: userId }, req.body, { new: true });
      if (!userProfile) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(userProfile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
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
