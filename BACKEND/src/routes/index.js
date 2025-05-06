import express from 'express';
const router = express.Router();
import tailorRoutes from './tailorshop.js';
import userRoutes from './user.js'; // Imports the user router
import orderRoutes from './order.js'; // Imports the order router

router.use('/user', userRoutes); // Mounts userRoutes like /user/createUser
router.use('/tailor',tailorRoutes); // Mounts tailorshopRoutes like /tailorshop/create
router.use('/order', orderRoutes); // STILL COMMENTED OUT

export default router;
