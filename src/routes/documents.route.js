import {
  uploadDocumentHandler,
  getDocumentsHandler,
  getDocumentByIdHandler,
  deleteDocumentHandler,
} from "../documents/documents.controller.js";
import { uploadDocumentSchema } from "../documents/documents.schema.js";
import upload from "../documents/storage/config-storage.js";
import express from "express";
import authenticateToken from "../middlewares/authentication.js";
import validate from "../middlewares/validate.js";

const routerDocument = express.Router();

routerDocument.post(
  "/",
  authenticateToken,
  upload.single("document"),
  validate(uploadDocumentSchema, "file"),
  uploadDocumentHandler,
);

routerDocument.get("/", getDocumentsHandler);

routerDocument.get("/:documentId", getDocumentByIdHandler);
routerDocument.delete("/:documentId", authenticateToken, deleteDocumentHandler);

export default routerDocument;
