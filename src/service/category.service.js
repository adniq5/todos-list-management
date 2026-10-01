const Category = require("../model/category.model");

const createCategory = async ({ name, description }, userId) => {
  const category = await Category.create({
    name,
    description,
    created_by: userId,
    updated_by: userId,
  });

  return category;
};

const getCategories = async () => {
  return await Category.find({
    archived: false,
  }).sort({ created_at: -1 });
};

const getCategoryById = async (id) => {
  const category = await Category.findOne({
    _id: id,
    archived: false,
  });

  if (!category) {
    throw new Error("Kategori tidak ditemukan");
  }

  return category;
};

const updateCategory = async (id, { name, description }, userId) => {
  const category = await Category.findOne({
    _id: id,
    archived: false,
  });

  if (!category) {
    throw new Error("Kategori tidak ditemukan");
  }

  category.name = name ?? category.name;
  category.description = description ?? category.description;
  category.updated_by = userId;

  await category.save();

  return category;
};

const deleteCategory = async (id, userId) => {
  const category = await Category.findOne({
    _id: id,
    archived: false,
  });

  if (!category) {
    throw new Error("Kategori tidak ditemukan");
  }

  // Soft delete
  category.archived = true;
  category.updated_by = userId;

  await category.save();

  return category;
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};