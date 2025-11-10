import express from 'express';
import { applyToJoinCrew, getCrewHome, getMyCrewApplication, updateMyCrewDetails } from '../controllers/crew.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/apply', protect, applyToJoinCrew);
router.get('/home', protect, getCrewHome);
router.get('/my', protect, getMyCrewApplication);
router.put('/update', protect, updateMyCrewDetails);

export default router;