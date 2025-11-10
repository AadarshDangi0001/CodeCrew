import express from 'express';
import { getMyProfile, updateUser, getUserProfileById } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadProfileImg } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/me', protect, getMyProfile);
router.put('/update', protect, uploadProfileImg.single('profileImg'), updateUser);
router.get('/:id', getUserProfileById);

export default router;