const { body, validationResult } = require("express-validator");

exports.validateRegister = [
  body("name").notEmpty().withMessage("Name is required."),
  body("email")
    .isEmail()
    .withMessage("You must provide a valid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

exports.validateLogin = [
  body("email")
    .isEmail()
    .withMessage("You must provide a valid email address."),
  body("password").notEmpty().withMessage("Password is required."),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
