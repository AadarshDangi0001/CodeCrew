import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Issue JWT token and set cookie
    const token = req.user.getSignedJwtToken();
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true if using HTTPS
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
    // Redirect to frontend after login
    res.redirect("https://www.codecrew.space/");
  }
);

export default router;