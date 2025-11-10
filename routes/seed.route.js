import express from 'express';
import createDummyUser from '../seed/users.seed.js';

import auth from '../middlewares/auth.middleware.js';
import verifyRole from '../middlewares/verifyRole.middleware.js';

const router = express.Router();

router.post('/create-dummy-users', auth, verifyRole('ADMIN'), createDummyUser);


export default router