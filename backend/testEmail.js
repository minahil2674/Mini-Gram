import dotenv from "dotenv";
dotenv.config();

import transporter from "./transporter.js";

console.log("Email config:", {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  user: process.env.EMAIL_USER,
});

async function test() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: "Test Email",
      text: "Hello! This is a test email.",
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

test();
