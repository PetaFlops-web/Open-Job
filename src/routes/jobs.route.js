import {
  addJobHandler,
  updateJobByidHandler,
  deleteJobHandler,
  getAllJobHandler,
  getJobByCompanyHandler,
  getJobByCategoryHandler,
  getJobByIdHandler,
} from "../jobs/jobs.controller.js";
import { jobSchema, updateJobSchema } from "../jobs/jobs.schema.js";
import { Router } from "express";
import authenticateToken from "../middlewares/authentication.js";
import validate from "../middlewares/validate.js";

const routerJobs = Router();

routerJobs.post("/", authenticateToken, validate(jobSchema), addJobHandler);
routerJobs.put(
  "/:jobId",
  authenticateToken,
  validate(updateJobSchema),
  updateJobByidHandler,
);

routerJobs.get("/", getAllJobHandler);
routerJobs.get("/:jobId", getJobByIdHandler);
routerJobs.get("/company/:jobCompanyId", getJobByCompanyHandler);
routerJobs.get("/category/:jobCategoryId", getJobByCategoryHandler);
routerJobs.delete("/:jobId", authenticateToken, deleteJobHandler);
export default routerJobs;
