import {
  addNewApplicationHandler,
  getAllApplicationHandler,
  getApplicationByIdHandler,
  getAllApplicationByUserIdHandler,
  getAllApplicationByJobIdHandler,
  putApplicationByIdHandler,
  deleteApplicationHandler,
} from "../applications/application.controller.js";
import validate from "../middlewares/validate.js";
import authenticateToken from "../middlewares/authentication.js";
import {
  applicationSchema,
  updateApplicationSchema,
} from "../applications/application.schema.js";
import { Router } from "express";

const routerApplication = Router();

routerApplication.post(
  "/",
  authenticateToken,
  validate(applicationSchema),
  addNewApplicationHandler,
);

routerApplication.get("/", authenticateToken, getAllApplicationHandler);

routerApplication.get(
  "/:applicationId",
  authenticateToken,
  getApplicationByIdHandler,
);

routerApplication.get(
  "/user/:userId",
  authenticateToken,
  getAllApplicationByUserIdHandler,
);

routerApplication.get(
  "/job/:jobId",
  authenticateToken,
  getAllApplicationByJobIdHandler,
);

routerApplication.put(
  "/:applicationId",
  authenticateToken,
  validate(updateApplicationSchema),
  putApplicationByIdHandler,
);

routerApplication.delete(
  "/:applicationId",
  authenticateToken,
  deleteApplicationHandler,
);

export default routerApplication;
