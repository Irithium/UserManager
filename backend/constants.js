const API_ENDPOINTS = {
  REGISTER: "/register",
  LOGIN: "/login",
  CURRENT_USER: "/current",
};

const SUCCESS_MESSAGES = {
  REGISTER: "User created successfully",
  DELETE: "Users have been deleted successfully.",
};

const ERROR_MESSAGES = {
  EMPTY_USERS: "There are no users in the table",
  ACCESS_DENIED: "Access denied. No token provided.",
  USER_NOT_FOUND: "User not found.",
  EMAIL_IN_USE: "Email is already in use.",
  INVALID_CREDENTIALS: "Invalid credentials. Please check and try again.",
  REGISTER_FAILED: "An error occurred while registering the user.",
  LOGIN_FAILED: "Error login in, please try again.",
  ACCOUNT_BLOCKED: "Your account is blocked. Please contact support.",
  INVALID_TOKEN: "Invalid token.",
  USER_ID_REQUIRED: "User ID is required.",
  ERROR_RETRIEVING_USER: "Error retrieving user data.",
  ERROR_DELETING_USERS: "An error occurred while deleting users.",
  NO_USERS_FOUND: "Error finding users, please refresh and try again",
  SORT_FAILED: "An error occurred while sorting users.",
};

const STATUS_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const DB_DIALECT = "mysql";

module.exports = {
  API_ENDPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STATUS_CODES,
  DB_DIALECT,
};
