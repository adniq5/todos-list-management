const Todo = require("../model/todo.model");
const Category = require("../model/category.model");

const getSummary = async () => {
  const totalTodos = await Todo.countDocuments({
    archived: false,
  });

  const completedTodos = await Todo.countDocuments({
    completed: true,
    archived: false,
  });

  const pendingTodos = await Todo.countDocuments({
    completed: false,
    archived: false,
  });

  const totalCategories = await Category.countDocuments({
    archived: false,
  });

  return {
    total_todos: totalTodos,
    completed_todos: completedTodos,
    pending_todos: pendingTodos,
    total_categories: totalCategories,
  };
};

module.exports = {
  getSummary,
};