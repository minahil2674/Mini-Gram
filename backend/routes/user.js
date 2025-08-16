import express from "express";
import { getProfile, updateProfile, updateProfileImage } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Get own or another user's profile
router.get("/profile", protect, getProfile);
router.get("/profile/:userId", protect, getProfile);

// Update name/bio (JSON body)
router.put("/profile", protect, updateProfile);

// Upload profile image (multipart/form-data)
router.put("/profile/image", protect, upload.single("profileImage"), updateProfileImage);

// Token verification
router.get("/verify-token", protect, (req, res) => {
  res.json({ valid: true });
});

export default router;
