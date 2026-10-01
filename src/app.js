require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");

const {
  swaggerUi,
  swaggerDocument,
} = require("./config/swagger");
const authRoute = require("./route/auth.route");
const categoryRoute = require("./route/category.route");
const todoRoute = require("./route/todo.route");
const activityLogRoute = require("./route/activityLog.route");
const statsRoute = require("./route/stats.route");

const authMiddleware = require("./middleware/auth.middleware");
const roleMiddleware = require("./middleware/role.middleware");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/todos", todoRoute);
app.use("/api/activity-logs", activityLogRoute);
app.use("/api/stats", statsRoute);

connectDB();

app.get(
  "/api/test-admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Akses admin berhasil",
      user: req.user,
    });
  }
);

const PORT = process.env.PORT || 3000;

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;