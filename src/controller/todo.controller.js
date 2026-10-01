const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../service/todo.service");

const {
  createActivityLog,
} = require("../service/activityLog.service");

const create = async (req, res) => {
  try {
    const todo = await createTodo(
      req.body,
      req.user.id
    );

    await createActivityLog({
      userId: req.user.id,
      action: "CREATE",
      resource: "Todo",
      resourceId: todo._id,
    });

    res.status(201).json({
      success: true,
      message: "Todo berhasil dibuat",
      data: todo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await getTodos(
      req.user.id,
      req.query
    );

    res.status(200).json({
      success: true,
      message: "Data Todo berhasil diambil",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const todo = await getTodoById(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Data Todo berhasil diambil",
      data: todo,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const todo = await updateTodo(
      req.params.id,
      req.body,
      req.user.id
    );

    await createActivityLog({
      userId: req.user.id,
      action: "UPDATE",
      resource: "Todo",
      resourceId: todo._id,
    });

    res.status(200).json({
      success: true,
      message: "Todo berhasil diperbarui",
      data: todo,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const todo = await deleteTodo(
      req.params.id,
      req.user.id
    );

    await createActivityLog({
      userId: req.user.id,
      action: "DELETE",
      resource: "Todo",
      resourceId: todo._id,
    });

    res.status(200).json({
      success: true,
      message: "Todo berhasil dihapus",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};