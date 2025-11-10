import express from 'express';
import { addHackathon, getHackathons, updateHackathon, deleteHackathon } from '../controllers/hackathon.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/admin.middleware.js';
import { uploadHackathonImg } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getHackathons);
router.post('/', protect, adminOnly, uploadHackathonImg.single('image'), addHackathon);
router.put('/:id', protect, adminOnly, uploadHackathonImg.single('image'), updateHackathon);
router.delete('/:id', protect, adminOnly, deleteHackathon);

export default router;