"use strict";
const express = require("express");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { formatLastActivity } = require("../utils/formatters");
const {
  ERROR_MESSAGES,
  STATUS_CODES,
  SUCCESS_MESSAGES,
} = require("../constants");

const router = express.Router();

const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ message: ERROR_MESSAGES.ACCESS_DENIED });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);

    if (!req.user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    if (req.user.isBlocked) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: ERROR_MESSAGES.ACCOUNT_BLOCKED });
    }

    next();
  } catch (error) {
    return res
      .status(STATUS_CODES.FORBIDDEN)
      .json({ message: ERROR_MESSAGES.INVALID_TOKEN });
  }
};

router.get("/current/:id", async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: ERROR_MESSAGES.USER_ID_REQUIRED });
  }

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

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
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.ERROR_RETRIEVING_USER });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({ order: [["createdAt", "DESC"]] });

    if (!users || users.length === 0) {
      return res.send(ERROR_MESSAGES.EMPTY_USERS);
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
    console.error(error);
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.NO_USERS_FOUND });
  }
});

const updateBlockStatus = async (req, res, blockStatus) => {
  const { userIds } = req.body;

  try {
    const users = await User.findAll({ where: { id: userIds } });

    if (users.length === 0) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    req.user.lastActivity = new Date();
    await req.user.save();

    for (const user of users) {
      user.isBlocked = blockStatus;
      await user.save();
    }

    res.json({
      message: `Users have been ${
        blockStatus ? "blocked" : "unblocked"
      } successfully.`,
    });
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: `An error occurred while ${
        blockStatus ? "blocking" : "un blocking"
      } users.`,
    });
  }
};

router.put("/block", authenticateJWT, (req, res) =>
  updateBlockStatus(req, res, true)
);

router.put("/unblock", authenticateJWT, (req, res) =>
  updateBlockStatus(req, res, false)
);

router.put("/delete", authenticateJWT, async (req, res) => {
  const { userIds } = req.body;

  try {
    const users = await User.findAll({ where: { id: userIds } });

    if (users.length === 0) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    for (const user of users) {
      await user.destroy();
    }

    req.user.lastActivity = new Date();
    await req.user.save();

    res.json({ message: SUCCESS_MESSAGES.DELETE });
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.ERROR_DELETING_USERS });
  }
});

router.get("/sort", authenticateJWT, async (req, res) => {
  const { sortBy, order, status } = req.query;

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

    const whereCondition = {};

    if (status === "blocked") {
      whereCondition.isBlocked = true;
    } else if (status === "unblocked") {
      whereCondition.isBlocked = false;
    }

    const users = await User.findAll({
      where: whereCondition,
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
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.SORT_FAILED });
  }
});

router.get("/filter", authenticateJWT, async (req, res) => {
  const { status } = req.query;

  try {
    let users;

    if (status === "blocked") {
      users = await User.findAll({ where: { isBlocked: true } });
    } else if (status === "unblocked") {
      users = await User.findAll({ where: { isBlocked: false } });
    } else {
      users = await User.findAll();
    }

    if (!users || users.length === 0) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.EMPTY_USERS });
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
    console.error(error);
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.NO_USERS_FOUND });
  }
});

module.exports = router;
