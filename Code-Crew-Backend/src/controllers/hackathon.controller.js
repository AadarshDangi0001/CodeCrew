import Hackathon from '../models/hackathon.model.js';
import asyncHandler from '../middleware/async.middleware.js';

// Add Hackathon
export const addHackathon = asyncHandler(async (req, res) => {
  const data = req.body;
  if (req.file && req.file.path) {
    data.image = req.file.path; // Cloudinary URL
  }
  const hack = await Hackathon.create(data);
  res.status(201).json({ success: true, data: hack });
});

// Get All Hackathons
export const getHackathons = asyncHandler(async (req, res) => {
  const hacks = await Hackathon.find();
  res.json({ success: true, data: hacks });
});

// Update Hackathon
export const updateHackathon = asyncHandler(async (req, res) => {
  const data = req.body;
  // If a new image is uploaded, update it
  if (req.file && req.file.path) {
    data.image = req.file.path; // Cloudinary URL
  }
  const hack = await Hackathon.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!hack) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: hack });
});

// Delete Hackathon
export const deleteHackathon = asyncHandler(async (req, res) => {
  const hack = await Hackathon.findByIdAndDelete(req.params.id);
  if (!hack) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, message: 'Deleted' });
});