import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import session from "express-session";
import passport from "passport";
import "./src/config/passport.js"; // import the above config



const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors({
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true
}));



app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middlewares (after body parsers)
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(helmet());

app.use(session({ secret: "your_secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());



//routes import
import authRoutes from './src/routes/auth.routes.js';
import crewRoutes from './src/routes/crew.routes.js';
import hackathonRoutes from './src/routes/hackathon.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import userRoutes from './src/routes/user.routes.js';
import googleRoutes from './src/routes/google.routes.js';
import paymentRoutes from './src/routes/payment.routes.js';

//routes used
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/crew', crewRoutes);
app.use('/api/v1/hackathons', hackathonRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', googleRoutes);
app.use('/api/v1/payment', paymentRoutes);


import errorHandler from './src/middleware/errorHandler.middleware.js';
app.use(errorHandler);


export { app }