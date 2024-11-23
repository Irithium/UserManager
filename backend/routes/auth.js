const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const {
  handleValidationErrors,
  validateRegister,
  validateLogin,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/register",

  async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      console.log(existingUser);

      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        lastActivity: new Date(),
      });

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          lastActivity: newUser.lastActivity,
        },
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Email is already in use." });
      }

      res.status(400).json({ error: "Error creating user, please try again." });
    }
  }
);

router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    await User.update({ lastActivity: new Date() }, { where: { id: user.id } });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  }
);

module.exports = router;
