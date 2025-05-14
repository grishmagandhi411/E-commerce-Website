import nodemailer from "nodemailer";

let otps = {}; 

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000; 

  otps[email] = { otp, expiresAt };

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const stored = otps[email];

  if (!stored) return res.status(400).json({ error: "No OTP found for this email" });
  if (Date.now() > stored.expiresAt) return res.status(400).json({ error: "OTP expired" });

  if (stored.otp === otp) {
    delete otps[email]; 
    res.json({ message: "OTP verified successfully, login successful" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
};
