import {
  addJobHandler,
  updateJobByidHandler,
  deleteJobHandler,
  getAllJobHandler,
  getJobByCompanyHandler,
  getJobByCategoryHandler,
  getJobByIdHandler,
} from "../jobs/jobs.controller.js";
import {
  addNewBookmarkHandler,
  getBookmarkByIdHandler,
  deleteBookmarkHandler,
} from "../bookmarks/bookmarks.controller.js";
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
routerJobs.post("/:jobId/bookmark", authenticateToken, addNewBookmarkHandler);
routerJobs.get(
  "/:jobId/bookmark/:bookmarkId",
  authenticateToken,
  getBookmarkByIdHandler,
);
routerJobs.get("/company/:jobCompanyId", getJobByCompanyHandler);
routerJobs.get("/category/:jobCategoryId", getJobByCategoryHandler);
routerJobs.delete("/:jobId", authenticateToken, deleteJobHandler);
routerJobs.delete("/:jobId/bookmark", authenticateToken, deleteBookmarkHandler);
export default routerJobs;
