import User from '../models/User.js';

const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Check OTP
  if (user.otp !== String(otp).trim()) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  // Check expiry
  if (!user.otpExpires || user.otpExpires.getTime() < Date.now()) {
    return res.status(400).json({ success: false, message: 'OTP has expired' });
  }

  next();
};

export { verifyOTP };
