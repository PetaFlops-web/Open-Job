import multer from "multer";
import path from "path";
import process from "process";
import fs from "fs";
import { InvariantError } from "../../exceptions/index.js";

const dirTOdocs = `${process.cwd()}/src/documents/pdf`;

if (!fs.existsSync(dirTOdocs)) {
  fs.mkdirSync(dirTOdocs);
}

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirTOdocs);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".pdf");
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".pdf" || file.mimetype !== "application/pdf") {
    return cb(new InvariantError("File is required!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // maksimal 5MB
});

export default upload;
