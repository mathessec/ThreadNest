import express from 'express';
const router = express.Router();
import userRoutes from './user.js';
import tailorRoutes from './tailor.js';

router.use('/user', userRoutes);
router.use('/tailor', tailorRoutes);
router.get('*', (req, res) => {res.status(404).json({ message: 'Route not found' });});

export default router;

