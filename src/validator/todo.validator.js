const { body, param } = require("express-validator");

const createTodoValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title wajib diisi"),

  body("category")
    .notEmpty()
    .withMessage("Category wajib diisi")
    .isMongoId()
    .withMessage("Category harus berupa ID MongoDB"),
];

const updateTodoValidator = [
  param("id")
    .isMongoId()
    .withMessage("ID Todo tidak valid"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title tidak boleh kosong"),

  body("category")
    .optional()
    .isMongoId()
    .withMessage("Category harus berupa ID MongoDB"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed harus berupa boolean"),
];

const todoIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("ID Todo tidak valid"),
];

module.exports = {
  createTodoValidator,
  updateTodoValidator,
  todoIdValidator,
};