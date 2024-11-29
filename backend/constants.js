const API_ENDPOINTS = {
  REGISTER: "/register",
  LOGIN: "/login",
  CURRENT_USER: "/current",
};

const ERROR_MESSAGES = {
  ACCESS_DENIED: "Access denied. No token provided.",
  USER_NOT_FOUND: "User not found.",
  EMAIL_IN_USE: "Email is already in use.",
  INVALID_CREDENTIALS: "Invalid credentials. Please check and try again.",
  REGISTER_FAILED: "An error occurred while registering the user.",
  LOGIN_FAILED: "Error login in, please try again.",
  ACCOUNT_BLOCKED: "Your account is blocked. Please contact support.",
  INVALID_TOKEN: "Invalid token.",
  USER_ID_REQUIRED: "User  ID is required.",
  ERROR_RETRIEVING_USER: "Error retrieving user data.",
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
  DB_DIALECT,
};
