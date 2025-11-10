import User from '../models/user.model.js';
import CrewApplication from '../models/crew.model.js';
import asyncHandler from '../middleware/async.middleware.js';
import cloudinary from '../utils/cloudinary.js';

// @desc      Get my profile (user + crew)
// @route     GET /api/v1/user/me
// @access    Private
export const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  const crew = await CrewApplication.findOne({ user: req.user.id });
  res.json({ success: true, data: { user, crew } });
});

// @desc      Update user details
// @route     PUT /api/v1/user/update
// @access    Private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  // Save old public_id before updating
  const oldPublicId = user.profileImgPublicId;

  // Handle new image upload
  if (req.file && req.file.path && req.file.filename) {
    // Save new image URL and public_id
    user.profileImg = req.file.path;
    user.profileImgPublicId = req.file.filename; // CloudinaryStorage sets filename as public_id
  }

  // ...update other fields...

  await user.save();

  // Delete old image from Cloudinary if a new one was uploaded
  if (oldPublicId && req.file && req.file.filename && oldPublicId !== req.file.filename) {
    await cloudinary.uploader.destroy(oldPublicId);
  }

  res.status(200).json({ success: true, data: user });
});

// @desc      Get user profile by ID (admin)
// @route     GET /api/v1/user/:id
// @access    Private/Admin
export const getUserProfileById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  const crew = await CrewApplication.findOne({ user: user._id });
  res.json({ success: true, data: { ...user.toObject(), ...crew?.toObject() } });
});