import express from 'express';
import userPublicController from '../controllers/users/public.js'
import userPrivateController from '../controllers/users/private.js'

import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/create', userPublicController.createUser);
router.post('/login', userPublicController.loginUser);
router.post('/find', auth, userPrivateController.findUser);

router.get('/list', auth, userPrivateController.listUsers);

export default router