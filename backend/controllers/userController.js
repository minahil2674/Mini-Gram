import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    const user = await User.findById(userId)
      .select("-password -otp -otpExpiry")
      .populate("posts");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const { name, bio } = req.body;
    if (name) user.name = name;
    if (bio) user.bio = bio;

    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile-images",
      width: 500,
      height: 500,
      crop: "fill",
    });

    // Delete old image from Cloudinary if exists
    if (user.profileImage) {
      try {
        // Extract publicId from URL (better handling)
        // Cloudinary URLs usually: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<folder>/<public_id>.<ext>
        const urlParts = user.profileImage.split("/");
        const versionIndex = urlParts.findIndex((part) => part.startsWith("v"));
        const publicIdParts = urlParts.slice(versionIndex + 1); // folder and file name
        const publicIdWithExt = publicIdParts.join("/"); // e.g. profile-images/abc123.jpg
        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ""); // remove extension

        await cloudinary.uploader.destroy(publicId);
      } catch (cloudErr) {
        console.warn("Failed to delete old Cloudinary image:", cloudErr.message);
      }
    }

    user.profileImage = result.secure_url;
    await user.save();

    // Remove local uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) console.warn("Failed to delete temp file:", err.message);
    });

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
