import categoriesRepository from "./categories.repository.js";
import {
  InvariantError,
  AuthError,
  NotFoundError,
} from "../exceptions/index.js";
const addCategory = async (user, payload) => {
  if (!user) throw new AuthError("invalid credentials");
  const idCategory = await categoriesRepository.addNewCategory(payload);
  if (!idCategory) throw new InvariantError("Gagal menambahkan category.");
  return idCategory;
};

const updateCategoryById = async (id, payload, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const idCategory = await categoriesRepository.updateCategoryById(id, payload);
  if (!idCategory) throw new NotFoundError("Gagal memperbarui category.");
  return idCategory;
};

const deleteCategoryById = async (id, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const idCategory = await categoriesRepository.deleteCategoryById(id);
  if (!idCategory) throw new NotFoundError("Gagal menghapus category.");
  return idCategory;
};

const getAllCategories = async () => {
  const categories = await categoriesRepository.getAllCategories();
  if (!categories) throw new NotFoundError("Gagal mengambil data.");
  return categories;
};

const getCategoryById = async (id) => {
  const category = await categoriesRepository.getCategoryById(id);
  if (!category) throw new NotFoundError("Gagal mengambil data.");
  return category;
};

export {
  addCategory,
  updateCategoryById,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
};
