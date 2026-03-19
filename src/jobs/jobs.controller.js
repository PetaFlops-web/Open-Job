import {
  addNewJob,
  updateJobById,
  deleteJobById,
  getAllJobs,
  getJobsByCompany,
  getJobByCategory,
  getJobById,
} from "./jobs.service.js";
import response from "../utils/response.js";
const addJobHandler = async (req, res) => {
  try {
    const {
      company_id,
      category_id,
      title,
      description,
      job_type,
      experience_level,
      location_type,
      location_city,
      salary_min,
      salary_max,
      is_salary_visible,
      status,
    } = req.validate;

    const user = req.user;
    const id = await addNewJob(
      {
        company_id,
        category_id,
        title,
        description,
        job_type,
        experience_level,
        location_type,
        location_city,
        salary_min,
        salary_max,
        is_salary_visible,
        status,
      },
      user,
    );
    return response(res, 201, "Job berhasil ditambahkan", { id });
  } catch (err) {
    if (err.name === "InvariantError")
      return response(h, 400, err.message, null);
    if (err.name === "AuthError") return response(res, 401, err.message, null);
    return response(res, 500, err.message, null);
  }
};

const updateJobByidHandler = async (req, res) => {
  try {
    const { jobId: id } = req.params;
    const {
      company_id,
      category_id,
      title,
      description,
      job_type,
      experience_level,
      location_type,
      location_city,
      salary_min,
      salary_max,
      is_salary_visible,
      status,
    } = req.validate;
    const user = req.user;
    const job = await updateJobById(
      id,
      {
        company_id,
        category_id,
        title,
        description,
        job_type,
        experience_level,
        location_type,
        location_city,
        salary_min,
        salary_max,
        is_salary_visible,
        status,
      },
      user,
    );
    return response(res, 200, "Job berhasil diperbarui", job);
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    if (err.name === "AuthError") return response(res, 401, err.message, null);
    return response(res, 500, err.message, null);
  }
};

const deleteJobHandler = async (req, res) => {
  try {
    const { jobId: id } = req.params;
    const user = req.user;
    const job = await deleteJobById(id, user);
    return response(res, 200, "Job berhasil dihapus", job);
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    if (err.name === "AuthError") return response(res, 401, err.message, null);
    return response(res, 500, err.message, null);
  }
};

const getAllJobHandler = async (req, res) => {
  try {
    const jobs = await getAllJobs();
    return response(res, 200, "Job berhasil ditemukan", { jobs });
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    return response(res, 500, err.message, null);
  }
};

const getJobByCompanyHandler = async (req, res) => {
  try {
    const { jobCompanyId: id } = req.params;
    const jobs = await getJobsByCompany(id);
    return response(res, 200, "Job berhasil ditemukan", { jobs });
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    return response(res, 500, err.message, null);
  }
};

const getJobByCategoryHandler = async (req, res) => {
  try {
    const { jobCategoryId: id } = req.params;
    const jobs = await getJobByCategory(id);
    return response(res, 200, "Job berhasil ditemukan", { jobs });
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    return response(res, 500, err.message, null);
  }
};

const getJobByIdHandler = async (req, res) => {
  try {
    const { jobId: id } = req.params;
    const job = await getJobById(id);
    return response(res, 200, "Job berhasil ditemukan", job);
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    return response(res, 500, err.message, null);
  }
};

export {
  addJobHandler,
  updateJobByidHandler,
  deleteJobHandler,
  getAllJobHandler,
  getJobByCompanyHandler,
  getJobByCategoryHandler,
  getJobByIdHandler,
};
