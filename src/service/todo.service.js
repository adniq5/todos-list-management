const Todo = require("../model/todo.model");

const createTodo = async (
  { title, description, category },
  userId
) => {
  const todo = await Todo.create({
    title,
    description,
    category,
    user: userId,
    created_by: userId,
    updated_by: userId,
  });

  return todo;
};

const getTodos = async (userId, query) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    category,
    sort = "created_at",
    order = "desc",
  } = query;

  const filter = {
    user: userId,
    archived: false,
  };

  // Search berdasarkan title atau description
  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Filter berdasarkan status
  if (status === "completed") {
    filter.completed = true;
  }

  if (status === "pending") {
    filter.completed = false;
  }

  // Filter berdasarkan category
  if (category) {
    filter.category = category;
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const sortOrder = order === "asc" ? 1 : -1;

  const todos = await Todo.find(filter)
    .sort({ [sort]: sortOrder })
    .skip(skip)
    .limit(limitNumber);

  const total = await Todo.countDocuments(filter);

  return {
    data: todos,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

const getTodoById = async (id, userId) => {
  const todo = await Todo.findOne({
    _id: id,
    user: userId,
    archived: false,
  });

  if (!todo) {
    throw new Error("Todo tidak ditemukan");
  }

  return todo;
};

const updateTodo = async (
  id,
  { title, description, category, completed },
  userId
) => {
  const todo = await Todo.findOne({
    _id: id,
    user: userId,
    archived: false,
  });

  if (!todo) {
    throw new Error("Todo tidak ditemukan");
  }

  if (title !== undefined) {
    todo.title = title;
  }

  if (description !== undefined) {
    todo.description = description;
  }

  if (category !== undefined) {
    todo.category = category;
  }

  if (completed !== undefined) {
    todo.completed = completed;
  }

  todo.updated_by = userId;

  await todo.save();

  return todo;
};

const deleteTodo = async (id, userId) => {
  const todo = await Todo.findOne({
    _id: id,
    user: userId,
    archived: false,
  });

  if (!todo) {
    throw new Error("Todo tidak ditemukan");
  }

  todo.archived = true;
  todo.updated_by = userId;

  await todo.save();

  return todo;
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};