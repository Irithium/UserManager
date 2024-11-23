const { body, validationResult } = require("express-validator");

exports.validateRegister = [
  body("name").notEmpty().withMessage("El nombre es obligatorio."),
  body("email")
    .isEmail()
    .withMessage("Debes proporcionar un correo electrónico válido."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),
];

exports.validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Debes proporcionar un correo electrónico válido."),
  body("password").notEmpty().withMessage("La contraseña es obligatoria."),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
