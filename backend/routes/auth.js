import express from "express";
import { register, verifyOTP, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user & send OTP
 */
router.post("/register", register);

/**
 * @route POST /api/auth/verify-otp
 * @desc Verify OTP after registration
 */
router.post("/verify-otp", verifyOTP);

/**
 * @route POST /api/auth/login
 * @desc Login user and return token
 */
router.post("/login", login);

/**
 * @route GET /api/auth/profile
 * @desc Get logged-in user profile
 */
router.get("/profile", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
