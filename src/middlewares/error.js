import response from "../utils/response.js";
import { ClientError } from "../exceptions/index.js";
import multer from "multer";

function errorHandler(err, req, res, next) {
  if (err instanceof ClientError)
    return response(res, err.statusCode, err.message, null);

  if (err.isJoi) return response(res, 400, err.details[0].message, null);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE")
      return response(res, 400, "File terlalu besar. Maksimal 5MB.", null);
    return response(res, 400, err.message, null);
  }

  if (err.message === "File is required")
    return response(res, 400, err.message, null);

  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error("Unhandled error:", err);
  return response(res, status, message, null);
}

export default errorHandler;
