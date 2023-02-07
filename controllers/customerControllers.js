const express = require('express');
const { sendVerificationEmail } = require('../helpers/verification');
const { generateToken, verifyToken } = require('../helpers/jwt');
const router = express.Router();
const { User } = require('../models');
const { sendForgotPassword } = require('../helpers/forgotPassword');
const { hashPassword } = require('../helpers/bcryptjs');

class UserController {
  static async createUser(req, res) {
    try {
      const { email, name, password } = req.body;
      const user = await User.create({ email, name, password });
      await sendVerificationEmail(user);
      res.status(201).send('User created. Verification email sent.');
    } catch (err) {
      res.json(err);
    }
  }

  static async verifyUser(req, res) {
    try {
      const { token } = req.query;
      const user = await User.findOne({ where: { verificationToken: token } });
      user.verified = true;
      user.verificationToken = null;
      await user.save();
      res.send('User verified.');
    } catch (err) {
      res.json(err);
    }
  }

  static async forgetPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'User not found' }] });
      }

      // Generate JWT for reset password
      const resetToken = generateToken(user);
      // Update user with reset token
      await user.update({ resetPasswordToken: resetToken });

      // Send email with reset password link

      await sendForgotPassword(user);

      return res.json({ msg: 'Email sent' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }

  static async getResetPasswordForm(req, res) {
    try {
      // Find the user by the reset password token
      const user = await User.findOne({
        where: {
          resetPasswordToken: req.params.token,
        },
      });

      // Check if the reset token is valid
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid token' }] });
      }

      // Return the reset password form
      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

  static async postUpdatedPassword(req, res) {
    try {
      const { token } = req.params;
      const { password } = req.body;

      // Verify reset token
      const decoded = verifyToken(token);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'User not found' }] });
      }

      // Check if the reset token is valid
      if (user.resetPasswordToken !== token) {
        return res.status(400).json({ errors: [{ msg: 'Invalid token' }] });
      }

      // Hash the new password and update the user
      const hashedPassword = hashPassword(password);
      await user.update({ password: hashedPassword, resetPasswordToken: null });

      return res.json({ msg: 'Password reset successfully' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
}

module.exports = UserController;
