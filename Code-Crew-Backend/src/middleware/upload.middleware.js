import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profile_images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 400, height: 400, crop: 'limit' }],
  },
});

const hackathonStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hackathon_images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, crop: 'limit' }],
  },
});

export const uploadProfileImg = multer({ storage: profileStorage });
export const uploadHackathonImg = multer({ storage: hackathonStorage });