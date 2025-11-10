import mongoose from 'mongoose';

const HackathonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  link: { type: String, required: true },
  prizePool: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: String, required: true },
  date: { type: Date, required: true },
  rounds: { type: String, required: true },
  venue: { type: String, required: true },
  entryFee: { type: String, required: true },
  image: { type: String }, // <-- Add this line
  createdAt: { type: Date, default: Date.now }
});

const Hackathon = mongoose.model('Hackathon', HackathonSchema);
export default Hackathon;