import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { authenticate } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/saas-platform')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

import orgRoutes from './routes/orgs';
import userRoutes from './routes/users';

// Routes
app.use('/api/orgs', orgRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('SaaS Platform API is running');
});

app.get('/api/protected', authenticate, (req, res) => {
    res.json({ message: 'This is a protected route', user: (req as any).user });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
