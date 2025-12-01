import express from 'express';
import User from '../models/User';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get current user profile from DB
router.get('/me', authenticate, async (req, res) => {
    try {
        const asgardeoId = (req as any).user.sub; // Assuming 'sub' is the user ID in token
        const user = await User.findOne({ asgardeoId }).populate('organizationId');
        if (!user) {
            return res.status(404).json({ message: 'User not found in local DB' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

// Sync user (create if not exists) - called after login
router.post('/sync', authenticate, async (req, res) => {
    const { sub, email } = (req as any).user; // Extract from token
    // Note: email might need to be extracted from a different claim depending on config

    try {
        let user = await User.findOne({ asgardeoId: sub });
        if (!user) {
            user = new User({ asgardeoId: sub, email: email || 'unknown@example.com' }); // Fallback if email claim missing
            await user.save();
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

export default router;
