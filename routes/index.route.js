import express from 'express';
import userRoutes from './user.route.js';
import seedRoutes from './seed.route.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/seed', seedRoutes);

export default router