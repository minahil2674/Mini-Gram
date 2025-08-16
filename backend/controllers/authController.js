import User from "../models/User.js";
import jwt from "jsonwebtoken";
import sendOTPEmail from "../utils/emailService.js";

// Constants
const JWT_EXPIRES = "7d";

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// REGISTER
export const register = async (req, res) => {
  try {
    const { name = "", email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    const user = await User.create({
      name,
      email: normalizedEmail,
      password, // will be hashed in schema
      otp,
      otpExpiry,
      isVerified: false,
    });

    // Send OTP email
    const emailSent = await sendOTPEmail(normalizedEmail, otp);
    if (!emailSent) {
      console.warn(`Failed to send OTP email to ${normalizedEmail}`);
      // Optional: you might want to delete the created user or inform client to retry
      // await User.findByIdAndDelete(user._id);
      // return res.status(500).json({ success: false, message: "Failed to send OTP email. Please try again." });
    }

    console.log(`OTP for ${normalizedEmail}: ${otp}`); // Remove in production

    return res.status(201).json({
      success: true,
      message: "Registered successfully. OTP sent. Please verify before login.",
      userId: user._id,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// VERIFY OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "User already verified" });
    }

    if (!user.otp || user.otp !== otp.trim()) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (!user.otpExpiry || Date.now() > user.otpExpiry) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: { id: user._id, email: user.email, name: user.name, isVerified: true },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: "Email not verified" });
    }

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      token,
      user: { id: user._id, email: user.email, name: user.name, isVerified: user.isVerified },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
