import {
  addNewApplication,
  deleteApplicationById,
  getAllApplications,
  getApplicationById,
  getApplicationByJobId,
  getApplicationByUserId,
  updateApplicationById,
} from "./application.service.js";
import response from "../utils/response.js";
const addNewApplicationHandler = async (req, res) => {
  try {
    const user = req.user;
    const { job_id, status } = req.validate;
    const user_id = user.id;
    const result = await addNewApplication({ job_id, user_id, status }, user);
    console.log(result);
    return response(res, 201, "Application berhasil ditambahkan", {
      id: result,
    });
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    if (err.name === "AuthError") return response(res, 401, err.message, null);
    return response(res, 500, err.message, null);
  }
};

const getAllApplicationHandler = async (req, res) => {
  try {
    const user = req.user;
    const applications = await getAllApplications(user.id);
    return response(res, 200, "Application berhasil ditemukan", {
      applications,
    });
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    if (err.name === "AuthError") return response(res, 401, err.message, null);
    return response(res, 500, err.message, null);
  }
};

const getApplicationByIdHandler = async (req, res) => {
  try {
    const user = req.user;
    const { applicationId: id } = req.params;
    const applications = await getApplicationById(id, user);
    return response(res, 200, "Application berhasil ditemukan", {
      id: applications,
    });
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    if (err.name === "AuthError") return response(res, 401, err.message, null);
    return response(res, 500, err.message, null);
  }
};

const getAllApplicationByUserIdHandler = async (req, res) => {
  try {
    const { userId: id } = req.params;
    const user = req.user;
    const applications = await getApplicationByUserId(id, user);
    return response(res, 200, "Application berhasil ditemukan", {
      applications,
    });
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    if (err.name === "AuthError") return response(res, 401, err.message, null);
    return response(res, 500, err.message, null);
  }
};

const getAllApplicationByJobIdHandler = async (req, res) => {
  try {
    const { jobId: id } = req.params;
    const user = req.user;
    const applications = await getApplicationByJobId(id, user);
    return response(res, 200, "Application berhasil ditemukan", {
      applications,
    });
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    if (err.name === "AuthError") return response(res, 401, err.message, null);
    return response(res, 500, err.message, null);
  }
};

const putApplicationByIdHandler = async (req, res) => {
  try {
    const { applicationId: id } = req.params;
    const { status } = req.validate;
    const user = req.user;
    await updateApplicationById(id, { status }, user);
    return response(res, 200, "success updated");
  } catch (error) {
    if (error.name === "AuthError")
      return response(res, 403, error.message, null);
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);
    return response(res, 500, error.message, null);
  }
};

const deleteApplicationHandler = async (req, res) => {
  try {
    const { applicationId: id } = req.params;
    const user = req.user;
    await deleteApplicationById(id, user);
    return response(res, 200, "success deleted");
  } catch (error) {
    if (error.name === "AuthError")
      return response(res, 403, error.message, null);
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);
    return response(res, 500, error.message, null);
  }
};

export {
  addNewApplicationHandler,
  getAllApplicationHandler,
  getApplicationByIdHandler,
  getAllApplicationByUserIdHandler,
  getAllApplicationByJobIdHandler,
  putApplicationByIdHandler,
  deleteApplicationHandler,
};
