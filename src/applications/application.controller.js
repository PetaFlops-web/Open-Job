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
import CacheService from "../cache/redis.service.js";

const addNewApplicationHandler = async (req, res) => {
  try {
    const user = req.user;
    const { job_id, status } = req.validate;
    const user_id = user.id;
    const application = await addNewApplication(
      { job_id, user_id, status },
      user,
    );

    const cache = new CacheService();
    await cache.delete(`profile-applications-${user_id}`);

    return response(res, 201, "Application berhasil ditambahkan", {
      id: application.id,
      user_id: application.user_id,
      job_id: application.job_id,
      status: application.status,
    });
  } catch (err) {
    if (err.name === "NotFoundError")
      return response(res, 404, err.message, null);
    if (err.name === "AuthError") return response(res, 401, err.message, null);
    if (err.name === "InvariantError")
      return response(res, 400, err.message, null);
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

    const cache = new CacheService();
    const cachedApplication = await cache.get(`application-${id}`);

    if (cachedApplication) {
      res.header("X-Data-Source", "cache");
      return response(res, 200, "Application berhasil ditemukan", JSON.parse(cachedApplication));
    }

    const applications = await getApplicationById(id, user);
    await cache.set(`application-${id}`, JSON.stringify(applications));
    res.header("X-Data-Source", "database");
    return response(res, 200, "Application berhasil ditemukan", applications);
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

    const cache = new CacheService();
    const cachedApplications = await cache.get(`applications-user-${id}`);

    if (cachedApplications) {
      res.header("X-Data-Source", "cache");
      return response(res, 200, "Application berhasil ditemukan", {
        applications: JSON.parse(cachedApplications),
      });
    }

    const applications = await getApplicationByUserId(id, user);
    await cache.set(`applications-user-${id}`, JSON.stringify(applications));
    res.header("X-Data-Source", "database");
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

    const cache = new CacheService();
    const cachedApplications = await cache.get(`applications-job-${id}`);

    if (cachedApplications) {
      res.header("X-Data-Source", "cache");
      return response(res, 200, "Application berhasil ditemukan", {
        applications: JSON.parse(cachedApplications),
      });
    }

    const applications = await getApplicationByJobId(id, user);
    await cache.set(`applications-job-${id}`, JSON.stringify(applications));
    res.header("X-Data-Source", "database");
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

    const cache = new CacheService();
    await cache.delete(`application-${id}`);
    await cache.delete(`profile-applications-${user.id}`);
    await cache.delete(`applications-user-${user.id}`);

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

    const cache = new CacheService();
    await cache.delete(`application-${id}`);
    await cache.delete(`profile-applications-${user.id}`);
    await cache.delete(`applications-user-${user.id}`);

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
