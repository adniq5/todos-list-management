const express = require("express");

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controller/todo.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const {
  createTodoValidator,
  updateTodoValidator,
  todoIdValidator,
} = require("../validator/todo.validator");

const router = express.Router();

router.use(
  authMiddleware,
  roleMiddleware("user", "admin")
);

// CREATE
router.post(
  "/",
  createTodoValidator,
  validate,
  create
);

// GET ALL
router.get("/", getAll);

// GET BY ID
router.get(
  "/:id",
  todoIdValidator,
  validate,
  getById
);

// UPDATE
router.put(
  "/:id",
  updateTodoValidator,
  validate,
  update
);

// DELETE
router.delete(
  "/:id",
  todoIdValidator,
  validate,
  remove
);

module.exports = router;