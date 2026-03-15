import { Router } from "express";
import {
  addUserHandler,
  getUserByIdHandler,
} from "../users/user.controller.js";
import { addUserSchema } from "../users/schema-user.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.post("/", validate(addUserSchema), addUserHandler);
router.get("/:id", getUserByIdHandler);

export default router;
