import CrewApplication from '../models/crew.model.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.middleware.js';
import User from '../models/user.model.js';

// @desc      Apply to join crew
// @route     POST /api/v1/crew/apply
// @access    Private
export const applyToJoinCrew = asyncHandler(async (req, res, next) => {
  const {
    mobileNumber,
    techStack,
    college,
    branch,
    cityState,
    linkedin,
    github,
    codingPlatform,
    message // add this
  } = req.body;

  // Check if user already applied
  const existingApplication = await CrewApplication.findOne({ user: req.user.id });
  if (existingApplication) {
    // If the existing application is already approved, block re-application
    if (existingApplication.status === 'approved') {
      return next(new ErrorResponse('You have already submitted an application', 400));
    }

    // If not approved (pending/rejected), update the existing application with new data
    const updated = await CrewApplication.findOneAndUpdate(
      { user: req.user.id },
      {
        mobileNumber,
        techStack,
        college,
        branch,
        cityState,
        linkedin,
        github,
        codingPlatform,
        message,
        status: 'pending'
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ success: true, data: updated });
  }

  const application = await CrewApplication.create({
    user: req.user.id,
    mobileNumber,
    techStack,
    college,
    branch,
    cityState,
    linkedin,
    github,
    codingPlatform,
    message // add this
  });

  res.status(201).json({
    success: true,
    data: application
  });
});

// @desc      Get crew home data
// @route     GET /api/v1/crew/home
// @access    Private (Crew members only)
export const getCrewHome = asyncHandler(async (req, res, next) => {
  // Check if user is approved crew member
  const application = await CrewApplication.findOne({ 
    user: req.user.id,
    status: 'approved'
  });

  if (!application) {
    return next(new ErrorResponse('Not authorized to access crew home', 401));
  }

  // Update user role if not already crew
  if (req.user.role !== 'crew') {
    await User.findByIdAndUpdate(req.user.id, { role: 'crew' });
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Welcome to the crew home page!'
      // Add more crew-specific data here
    }
  });
});

// @desc      Get my crew application
// @route     GET /api/v1/crew/application
// @access    Private
export const getMyCrewApplication = asyncHandler(async (req, res, next) => {
    if (req.user.role !== 'crew') {
    await User.findByIdAndUpdate(req.user.id, { role: 'crew' });
  }
  const application = await CrewApplication.findOne({ user: req.user.id });
  res.status(200).json({
    success: true,
    data: application
  });

  
});

// @desc      Update my crew application details
// @route     PUT /api/v1/crew/update
// @access    Private
export const updateMyCrewDetails = asyncHandler(async (req, res, next) => {
  const updates = req.body;
  const application = await CrewApplication.findOneAndUpdate(
    { user: req.user.id },
    updates,
    { new: true, runValidators: true }
  );
  if (!application) {
    return next(new ErrorResponse('No crew application found', 404));
  }
  res.status(200).json({ success: true, data: application });
});