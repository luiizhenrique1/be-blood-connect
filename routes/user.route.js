import express from 'express';
import userController from '../controllers/users/public.js'

const router = express.Router();

// User routes
router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
// router.get('/list', userController.listUsers);

export default router