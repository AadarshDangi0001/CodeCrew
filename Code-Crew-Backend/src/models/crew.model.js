import mongoose from 'mongoose';

const CrewApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  mobileNumber: {
    type: String,
    required: [true, 'Please add a mobile number'],
    maxlength: [20, 'Mobile number cannot be longer than 20 characters']
  },
  techStack: {
    type: String,
    required: [true, 'Please add your tech stack']
  },
  college: {
    type: String,
    required: [true, 'Please add your college']
  },
  branch: {
    type: String,
    required: [true, 'Please add your branch']
  },
  cityState: {
    type: String,
    required: [true, 'Please add your city and state']
  },
  linkedin: String,
  github: String,
  codingPlatform: String,
  message: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CrewApplication = mongoose.model('CrewApplication', CrewApplicationSchema);
export default CrewApplication;