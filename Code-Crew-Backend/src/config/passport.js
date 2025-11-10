import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import dotenv from 'dotenv';

dotenv.config();

// Use environment variables for Google Client ID and Secret
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables');
}

// Update your passport GoogleStrategy
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/v1/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create user
    let user = await User.findOne({ googleId: profile.id });
    
    if (!user) {
      // Upload Google profile image to Cloudinary
      let profileImg = '';
      let profileImgPublicId = '';
      
      if (profile.photos && profile.photos[0] && profile.photos[0].value) {
        const result = await cloudinary.uploader.upload(profile.photos[0].value, {
          folder: 'profile_images',
          transformation: [{ width: 400, height: 400, crop: 'limit' }]
        });
        profileImg = result.secure_url;
        profileImgPublicId = result.public_id;
      }

      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        profileImg,
        profileImgPublicId
      });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});