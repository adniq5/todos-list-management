const express = require("express");

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controller/category.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
} = require("../validator/category.validator");

const router = express.Router();

router.use(
  authMiddleware,
  roleMiddleware("user", "admin")
);

// CREATE
router.post(
  "/",
  createCategoryValidator,
  validate,
  create
);

// GET ALL
router.get("/", getAll);

// GET BY ID
router.get(
  "/:id",
  categoryIdValidator,
  validate,
  getById
);

// UPDATE
router.put(
  "/:id",
  updateCategoryValidator,
  validate,
  update
);

// DELETE
router.delete(
  "/:id",
  categoryIdValidator,
  validate,
  remove
);

module.exports = router;