const { body, param } = require("express-validator");

const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nama kategori wajib diisi"),
];

const updateCategoryValidator = [
  param("id")
    .isMongoId()
    .withMessage("ID kategori tidak valid"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Nama kategori tidak boleh kosong"),
];

const categoryIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("ID kategori tidak valid"),
];

module.exports = {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
};