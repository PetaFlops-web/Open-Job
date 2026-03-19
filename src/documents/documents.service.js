import documentsRepository from "./documents.repository.js";
import {
  AuthError,
  InvariantError,
  NotFoundError,
  UnsupportedMediaError,
} from "../exceptions/index.js";

const addNewDocument = async (file, user) => {
  if (!user) throw new AuthError("invalid credentials");
  if (!file) throw new NotFoundError("File tidak ditemukan.");
  if (file.size > 5 * 1024 * 1024)
    throw new UnsupportedMediaError("File terlalu besar. Maksimal 5MB.");
  if (file.mimetype !== "application/pdf")
    throw new UnsupportedMediaError("Hanya file PDF yang diperbolehkan.");

  const id = await documentsRepository.addNewDocument({
    file_url: file.path,
  });

  return {
    documentId: id,
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
  };
};

const getAlldocuments = async () => {
  const result = await documentsRepository.getAllDocuments();
  return result;
};

const getDocumentById = async (id) => {
  const result = await documentsRepository.getDocumentById(id);
  if (!result) throw new NotFoundError("Document tidak ditemukan.");
  return result;
};

const deleteDocumentById = async (id, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const result = await documentsRepository.deleteDocumentById(id);
  return result;
};

export { addNewDocument, getAlldocuments, getDocumentById, deleteDocumentById };
