const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const {
  handleValidationErrors,
  validateRegister,
  validateLogin,
} = require("../middlewares/authMiddleware");
const { API_ENDPOINTS, ERROR_MESSAGES } = require("../constants");
const { formatLastActivity } = require("../utils/formatters");

const router = express.Router();

router.post(
  API_ENDPOINTS.REGISTER,
  handleValidationErrors,
  validateRegister,
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: ERROR_MESSAGES.EMAIL_IN_USE });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        lastActivity: new Date(),
      });

      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(201).json({
        message: "User  created successfully.",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: formatLastActivity(newUser.createdAt),
          isAdmin: newUser.isAdmin,
          isBlocked: newUser.isBlocked,
          lastActivity: formatLastActivity(newUser.lastActivity),
        },
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: ERROR_MESSAGES.EMAIL_IN_USE });
      }
      res.status(500).json({ message: ERROR_MESSAGES.REGISTER_FAILED });
    }
  }
);

router.post(
  API_ENDPOINTS.LOGIN,
  validateLogin,
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }

      if (user.isBlocked) {
        return res
          .status(403)
          .json({ message: ERROR_MESSAGES.ACCOUNT_BLOCKED });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
      }

      await User.update(
        { lastActivity: new Date() },
        { where: { id: user.id } }
      );

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: formatLastActivity(user.createdAt),
          isAdmin: user.isAdmin,
          isBlocked: user.isBlocked,
          lastActivity: formatLastActivity(user.lastActivity),
        },
      });
    } catch (error) {
      res.status(500).json({ message: ERROR_MESSAGES.LOGIN_FAILED });
    }
  }
);

module.exports = router;
