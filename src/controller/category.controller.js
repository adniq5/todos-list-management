const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../service/category.service");

const create = async (req, res) => {
  try {
    const category = await createCategory(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Kategori berhasil dibuat",
      data: category,
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
    const categories = await getCategories();

    res.status(200).json({
      success: true,
      message: "Data kategori berhasil diambil",
      data: categories,
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
    const category = await getCategoryById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Data kategori berhasil diambil",
      data: category,
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
    const category = await updateCategory(
      req.params.id,
      req.body,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Kategori berhasil diperbarui",
      data: category,
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
    await deleteCategory(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Kategori berhasil dihapus",
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