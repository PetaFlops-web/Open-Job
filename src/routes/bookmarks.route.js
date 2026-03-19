import {
  getCountBookmarkHandler,
} from "../bookmarks/bookmarks.controller.js";
import { Router } from "express";
import authenticateToken from "../middlewares/authentication.js";

const routerBookmark = Router();

routerBookmark.get("/", authenticateToken, getCountBookmarkHandler);

export default routerBookmark;
