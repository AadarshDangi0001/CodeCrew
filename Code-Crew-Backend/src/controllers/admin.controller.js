import User from '../models/user.model.js';
import CrewApplication from '../models/crew.model.js';
import asyncHandler from '../middleware/async.middleware.js';

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  // Prevent deleting isAdmin users
  if (user.isAdmin) {
    return res.status(403).json({ success: false, message: 'Cannot delete admin users' });
  }

  await user.deleteOne();
  res.json({ success: true, message: 'User deleted' });
});

// Get all users with crew details
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().lean();
  const crewApps = await CrewApplication.find({ user: { $in: users.map(u => u._id) } }).lean();

  // Merge crew details into user objects
  const usersWithCrew = users.map(u => {
    const crew = crewApps.find(c => String(c.user) === String(u._id));
    return {
      ...u,
      status: crew?.status,
      mobileNumber: crew?.mobileNumber,
      techStack: crew?.techStack,
      college: crew?.college,
      branch: crew?.branch,
      cityState: crew?.cityState,
      linkedin: crew?.linkedin,
      github: crew?.github,
      codingPlatform: crew?.codingPlatform,
      message: crew?.message,
    };
  });

  res.json({ success: true, data: usersWithCrew });
});