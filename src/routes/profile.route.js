import { getProfileUserByIdHandler, getProfileUserApplicationsHandler, getProfileUserBookmarkedJobsHandler } from "../profile/profile.controller.js";
import { Router } from "express";
import authenticateToken from "../middlewares/authentication.js";

const routerProfile = Router();

routerProfile.get("/", authenticateToken, getProfileUserByIdHandler);
routerProfile.get("/applications", authenticateToken, getProfileUserApplicationsHandler);
routerProfile.get("/bookmarks", authenticateToken, getProfileUserBookmarkedJobsHandler);

export default routerProfile;