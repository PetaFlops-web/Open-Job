import applicationRepositry from "./application.repositry.js";
import {
  InvariantError,
  NotFoundError,
  AuthError,
} from "../exceptions/index.js";

const addNewApplication = async (payload, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const result = await applicationRepositry.addNewApplication(payload, user);
  if (!result) throw new InvariantError("Gagal menambahkan application.");
  return result;
};

const getAllApplications = async (user) => {
  if (!user) throw new AuthError("invalid credentials");
  const result = await applicationRepositry.getAllApplications();
  if (!result) throw new NotFoundError("Application tidak ditemukan.");
  return result;
};

const getApplicationById = async (id, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const result = await applicationRepositry.getApplicationById(id);
  if (!result) throw new NotFoundError("Application tidak ditemukan.");
  return result;
};

const getApplicationByUserId = async (id, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const result = await applicationRepositry.getApplicationByUserId(id);
  return result;
};

const getApplicationByJobId = async (id, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const result = await applicationRepositry.getApplicationByJobId(id);
  return result;
};

const updateApplicationById = async (id, payload, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const idApplication = await applicationRepositry.updateApplicationById(
    id,
    payload,
  );
  return idApplication;
};

const deleteApplicationById = async (id, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const idApplication = await applicationRepositry.deleteApplicationById(id);
  return idApplication;
};

export {
  addNewApplication,
  getAllApplications,
  getApplicationById,
  getApplicationByUserId,
  getApplicationByJobId,
  updateApplicationById,
  deleteApplicationById,
};
