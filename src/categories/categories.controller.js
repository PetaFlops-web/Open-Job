import {
  addCategory,
  updateCategoryById,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
} from "./categories.service.js";

import response from "../utils/response.js";

const addCategoryhandler = async (req, res) => {
  try {
    const { name } = req.validate;
    const user = req.user;

    const category = await addCategory(user, { name });

    return response(res, 201, "Category berhasil ditambahkan", {
      id: category,
    });
  } catch (error) {
    if (error.name === "InvariantError")
      return response(res, 400, error.message, null);

    return response(res, 500, error.message, null);
  }
};

const updateCategoryHandler = async (req, res) => {
  try {
    const { categoryId: id } = req.params;
    const { name } = req.validate;
    const user = req.user;

    const category = await updateCategoryById(id, { name }, user);

    return response(res, 200, "Category berhasil diperbarui", { id: category });
  } catch (error) {
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);

    return response(res, 500, error.message, null);
  }
};

const deleteCategoryHandler = async (req, res) => {
  try {
    const { categoryId: id } = req.params;
    const user = req.user;

    const category = await deleteCategoryById(id, user);

    return response(res, 200, "Category berhasil dihapus", { id: category });
  } catch (error) {
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);

    return response(res, 500, error.message, null);
  }
};

const getAllCategoryHandler = async (req, res) => {
  try {
    const categories = await getAllCategories();
    return response(res, 200, "Category berhasil ditemukan", { categories });
  } catch (error) {
    return response(res, 500, error.message, null);
  }
};

const getCategoryByIdHandler = async (req, res) => {
  try {
    const { categoryId: id } = req.params;
    const category = await getCategoryById(id);
    return response(res, 200, "Category berhasil ditemukan", category);
  } catch (error) {
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);

    return response(res, 500, error.message, null);
  }
};

export {
  addCategoryhandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getAllCategoryHandler,
  getCategoryByIdHandler,
};
