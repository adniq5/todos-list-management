const { body } = require("express-validator");

const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nama wajib diisi"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email wajib diisi")
    .isEmail()
    .withMessage("Format email tidak valid"),

  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
];

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email wajib diisi")
    .isEmail()
    .withMessage("Format email tidak valid"),

  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi"),
];

module.exports = {
  registerValidator,
  loginValidator,
};