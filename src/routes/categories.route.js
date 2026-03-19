import {
  addCategoryhandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getAllCategoryHandler,
  getCategoryByIdHandler,
} from "../categories/categories.controller.js";
import { Router } from "express";
import { categorySchema } from "../categories/categories.schema.js";
import validate from "../middlewares/validate.js";
import authenticateToken from "../middlewares/authentication.js";

const routerCategories = Router();

routerCategories.post(
  "/",
  authenticateToken,
  validate(categorySchema),
  addCategoryhandler,
);

routerCategories.put(
  "/:categoryId",
  authenticateToken,
  validate(categorySchema),
  updateCategoryHandler,
);

routerCategories.get("/", getAllCategoryHandler);
routerCategories.get("/:categoryId", getCategoryByIdHandler);
routerCategories.delete(
  "/:categoryId",
  authenticateToken,
  deleteCategoryHandler,
);

export default routerCategories;
