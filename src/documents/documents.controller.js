import {
  addNewDocument,
  deleteDocumentById,
  getAlldocuments,
  getDocumentById,
} from "./documents.service.js";
import path from "path";
import response from "../utils/response.js";

const uploadDocumentHandler = async (req, res) => {
  try {
    const { file } = req;
    const user = req.user;
    const result = await addNewDocument(file, user);
    return response(res, 201, "Document berhasil diupload", result);
  } catch (error) {
    if (error.name === "AuthError")
      return response(res, 401, error.message, null);
    if (error.name === "InvariantError")
      return response(res, 400, error.message, null);

    if (error.name === "UnsupportedMediaError")
      return response(res, 400, error.message, null);

    return response(res, 500, error.message, null);
  }
};

const getDocumentsHandler = async (req, res) => {
  try {
    const documents = await getAlldocuments();
    return response(res, 200, "Document berhasil ditemukan", { documents });
  } catch (error) {
    if (error.name === "AuthError")
      return response(res, 403, error.message, null);
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);
    return response(res, 500, error.message, null);
  }
};

const getDocumentByIdHandler = async (req, res) => {
  try {
    const { documentId: id } = req.params;
    const document = await getDocumentById(id);

    const filePath = path.resolve(document.file_url);
    const fileName = path.basename(document.file_url);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    return res.sendFile(filePath);
  } catch (error) {
    if (error.name === "AuthError")
      return response(res, 401, error.message, null);
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);
    return response(res, 500, error.message, null);
  }
};

const deleteDocumentHandler = async (req, res) => {
  try {
    const { documentId: id } = req.params;
    const user = req.user;
    await deleteDocumentById(id, user);
    return response(res, 200, "Document berhasil dihapus");
  } catch (error) {
    if (error.name === "AuthError")
      return response(res, 401, error.message, null);
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);
    return response(res, 500, error.message, null);
  }
};

export {
  uploadDocumentHandler,
  getDocumentsHandler,
  getDocumentByIdHandler,
  deleteDocumentHandler,
};
