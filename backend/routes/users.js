const express = require("express");
const { User } = require("../models/");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users || users.length === 0) {
      return res.send("There are no users in the table");
    }

    const userData = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      lastActivity: user.lastActivity,
    }));

    res.status(200).json(userData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res
      .status(500)
      .json({ error: "Error finding users, please refresh and try again" });
  }
});

module.exports = router;
