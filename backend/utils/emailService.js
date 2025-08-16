import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables immediately to ensure they are available
dotenv.config();

// Create reusable transporter object using SMTP transport (Gmail)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send OTP email
const sendOTPEmail = async (toEmail, otp) => {
  try {
    const mailOptions = {
      // Updated 'from' field to use both name and email from environment variables
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: toEmail,
      subject: "Your OTP Code - MiniGram",
      text: `Your verification code is: ${otp}. It expires in 10 minutes.`,
      html: `
        <div>
          <h3>Your verification code is:</h3>
          <h2>${otp}</h2>
          <p>This code expires in 10 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ OTP email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
    return false;
  }
};

export default sendOTPEmail;
