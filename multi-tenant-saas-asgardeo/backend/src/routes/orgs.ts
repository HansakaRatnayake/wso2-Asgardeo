import express from 'express';
import Organization from '../models/Organization';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get all organizations (Admin only - simplified for now)
router.get('/', authenticate, async (req, res) => {
    try {
        const orgs = await Organization.find();
        res.json(orgs);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

// Create a new organization
router.post('/', authenticate, async (req, res) => {
    const { name, domain, adminEmail } = req.body;
    const org = new Organization({ name, domain, adminEmail });

    try {
        const newOrg = await org.save();
        res.status(201).json(newOrg);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

export default router;
