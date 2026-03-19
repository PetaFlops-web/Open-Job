import validate from "../middlewares/validate.js";
import authenticateToken from "../middlewares/authentication.js";
import {
  addCompanyHandler,
  putCompanyHandler,
  deleteCompanyHandler,
  getAllCompanyHandler,
  getCompanyByIdHandler,
} from "../companies/companies.controller.js";
import { addCompanySchema } from "../companies/companies.schema.js";
import { Router } from "express";

const routerCompany = Router();

routerCompany.post(
  "/",
  authenticateToken,
  validate(addCompanySchema),
  addCompanyHandler,
);

routerCompany.put(
  "/:companyId",
  authenticateToken,
  validate(addCompanySchema),
  putCompanyHandler,
);

routerCompany.get("/", getAllCompanyHandler);

routerCompany.get("/:companyId", getCompanyByIdHandler);

routerCompany.delete("/:companyId", authenticateToken, deleteCompanyHandler);

export default routerCompany;
