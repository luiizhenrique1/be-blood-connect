import express from 'express';
import userPublicController from '../controllers/users/public.js';
import userPrivateController from '../controllers/users/private.js';

import auth from '../middlewares/auth.middleware.js';
import verifyRole from '../middlewares/verifyRole.middleware.js';

const router = express.Router();

router.post('/create', userPublicController.createUser);
router.post('/login', userPublicController.loginUser);
router.get('/find', auth, verifyRole('DONOR'), userPrivateController.findUser);

// router.post('/create-blood-request', auth, verifyRole(['HOSPITAL'], userPrivateController.createBloodRequest));
// router.get('/get-nearby-requests', verifyRole(['DONOR']), userPrivateController.getNearbyRequests);

// edit user (hospital)
// edit user (donor)

router.post('/activate', auth, verifyRole('ADMIN'), userPrivateController.reactivateUser);
router.post('/deactivate', auth, verifyRole('ADMIN'), userPrivateController.deactivateUser);
router.get('/list', auth, userPrivateController.listUsers);

export default router