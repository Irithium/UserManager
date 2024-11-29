"use strict";
const express = require("express");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { formatLastActivity } = require("../controllers/userController");
const router = express.Router();

const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);

    if (!req.user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (req.user.isBlocked) {
      return res
        .status(403)
        .json({ message: "Your account is blocked. Please contact support." });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

router.get("/current/:id", async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const user = await User.findOne({ where: { id: userId } });

  console.log(user);

  try {
    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: formatLastActivity(user.createdAt),
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked,
      lastActivity: formatLastActivity(user.lastActivity),
    };

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user data." });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (!users || users.length === 0) {
      return res.send("There are no users in the table");
    }

    const usersData = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      lastActivity: formatLastActivity(user.lastActivity),
      createdAt: formatLastActivity(user.createdAt),
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked,
    }));

    res.status(200).json(usersData);
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ error: "Error finding users, please refresh and try again" });
  }
});

router.put("/block", authenticateJWT, async (req, res) => {
  const { userIds } = req.body;

  try {
    const users = await User.findAll({ where: { id: userIds } });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    req.user.lastActivity = new Date();
    await req.user.save();

    for (const user of users) {
      user.isBlocked = true;
      await user.save();
    }

    res.json({ message: "Users have been blocked successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while blocking users." });
  }
});

router.put("/unblock", authenticateJWT, async (req, res) => {
  const { userIds } = req.body;
  try {
    const users = await User.findAll({ where: { id: userIds } });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    for (const user of users) {
      user.isBlocked = false;
      await user.save();
    }

    req.user.lastActivity = new Date();
    await req.user.save();

    res.json({ message: "Users have been unblocked successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while unblocking users." });
  }
});

router.put("/delete", authenticateJWT, async (req, res) => {
  const { userIds } = req.body;

  try {
    const users = await User.findAll({ where: { id: userIds } });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    for (const user of users) {
      await user.destroy();
    }

    req.user.lastActivity = new Date();
    await req.user.save();

    res.json({ message: "Users have been deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting users." });
  }
});

router.get("/sort", authenticateJWT, async (req, res) => {
  const { sortBy, order } = req.query;

  try {
    const orderDirection = order === "asc" ? "ASC" : "DESC";

    const orderColumn =
      sortBy === "name"
        ? "name"
        : sortBy === "email"
        ? "email"
        : sortBy === "lastActivity"
        ? "lastActivity"
        : "createdAt";

    const users = await User.findAll({
      order: [[orderColumn, orderDirection]],
    });

    const usersData = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      lastActivity: formatLastActivity(user.lastActivity),
      createdAt: formatLastActivity(user.createdAt),
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked,
    }));

    req.user.lastActivity = new Date();
    await req.user.save();

    res.json(usersData);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while sorting users." });
  }
});

module.exports = router;
