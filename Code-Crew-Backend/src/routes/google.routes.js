import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "https://www.codecrew.space/?error=auth_failed" }),
  (req, res) => {
    // Issue JWT token and set cookie
    const token = req.user.getSignedJwtToken();
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
    // Redirect to frontend with token in URL so frontend can store it in localStorage
    res.redirect(`https://www.codecrew.space/?token=${token}`);
  }
);

export default router;