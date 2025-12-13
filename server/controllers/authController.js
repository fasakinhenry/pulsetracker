import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { sendEmail } from '../config/email.js';
import {
  welcomeEmail,
  otpEmail,
} from '../emails/templates/index.js                                                      ';

// Register new users with name, email and password
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: 'Verify Your Account',
      html: welcomeEmail(name),
    });

    res
      .status(201)
      .json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Log the users in with email and password
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Log the user out by clearing the token cookie
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
    });

    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Send Verification OTP to user's email
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    // Check if user is verified already
    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: 'Account is already verified' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

    await user.save();

    // Send OTP email
    await sendEmail({
      to: user.email,
      subject: 'Your Account Verification OTP',
      html: otpEmail(otp),
    });

    res
      .status(200)
      .json({ success: true, message: 'Verification OTP sent to email' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Verify user's email with OTP
export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.userId

  if (!userId || !otp) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' });
  }

  try {
    const user = await userModel.findById(userId);

    // Check if user does not exist
    if (!user) {
      return res.json({ success: false, message: 'User not found!' });
    }

    if (user.verifyOtp === '' || user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (user.verifyOtpExpiresAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' });
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpiresAt = 0;

    await user.save();
    return res.json({ success: true, message: 'Email Verified successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Check if a user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true, message: 'User is authenticated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Send password reset OTP to user's email
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: 'Email is required' });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User with this email not found' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpiresAt = Date.now() + 15 * 60 * 1000; // 1 hour from now

    await user.save();

    // Send OTP email
    await sendEmail({
      to: user.email,
      subject: 'Your Password Reset OTP',
      html: otpEmail(otp),
    });

    return res.json({ success: true, message: 'Password reset OTP sent to email' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Reset user's password using OTP
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: 'Email, OTP, and new password are required' });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User with this email not found' });
    }
    if (user.resetOtp === '' || user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    if (user.resetOtpExpiresAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpiresAt = 0;

    await user.save();
    return res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
