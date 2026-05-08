import {
  addCompeny,
  putCompanyById,
  deleteCompanyById,
  getAllCompanies,
  getCompanyById,
} from "./companies.service.js";
import response from "../utils/response.js";
import CacheService from "../cache/redis.service.js";

const addCompanyHandler = async (req, res) => {
  try {
    const { name, location, description } = req.validate;
    const user = req.user;

    const cache = new CacheService();

    const idCompany = await addCompeny({ name, location, description }, user);
    await cache.delete(`company-${idCompany}`);
    response(res, 201, "Company berhasil ditambahkan", { id: idCompany });
  } catch (error) {
    console.error(error);
    if (error.name === "InvariantError")
      return response(res, 400, error.message, null);

    if (error.name === "AuthError")
      return response(res, 401, error.message, null);

    return response(res, 500, error.message, null);
  }
};

const putCompanyHandler = async (req, res) => {
  try {
    const { companyId: id } = req.params;
    const { name, location, description } = req.validate;
    const user = req.user;

    const cache = new CacheService();

    const idCompany = await putCompanyById(
      id,
      { name, location, description },
      user,
    );

    await cache.delete(`company-${id}`);

    response(res, 200, "Company berhasil diperbarui", { id: idCompany });
  } catch (error) {
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);

    return response(res, 500, error.message, null);
  }
};

const deleteCompanyHandler = async (req, res) => {
  try {
    const { companyId: id } = req.params;
    const user = req.user;
    const idCompany = await deleteCompanyById(id, user);

    const cache = new CacheService();
    await cache.delete(`company-${id}`);

    response(res, 200, "Company berhasil dihapus", { id: idCompany });
  } catch (error) {
    console.error(error);
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);

    if (error.name === "AuthError")
      return response(res, 401, error.message, null);

    return response(res, 500, error.message, null);
  }
};

const getAllCompanyHandler = async (req, res) => {
  try {
    const companies = await getAllCompanies();
    return response(res, 200, "Company berhasil ditemukan", { companies });
  } catch (error) {
    return response(res, 500, error.message, null);
  }
};

const getCompanyByIdHandler = async (req, res) => {
  try {
    const { companyId: id } = req.params;

    const cache = new CacheService();

    const cachedCompany = await cache.get(`company-${id}`);

    if (cachedCompany) {
      res.header("X-Data-Source", "cache");
      return response(
        res,
        200,
        "Company berhasil ditemukan",
        JSON.parse(cachedCompany),
      );
    } else {
      res.header("X-Data-Source", "database");
    }

    const company = await getCompanyById(id);
    await cache.set(`company-${id}`, JSON.stringify(company));
    return response(res, 200, "Company berhasil ditemukan", company);
  } catch (error) {
    console.error(error);
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);
    return response(res, 500, error.message, null);
  }
};

export {
  addCompanyHandler,
  putCompanyHandler,
  deleteCompanyHandler,
  getAllCompanyHandler,
  getCompanyByIdHandler,
};
