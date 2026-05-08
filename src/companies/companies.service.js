import CompaniesRepository from "./compenies.repositry.js";
import {
  AuthError,
  InvariantError,
  NotFoundError,
} from "../exceptions/index.js";

const addCompeny = async (payload, user) => {
  if (!user) throw new AuthError("invalid credentials");

  const idCompany = await CompaniesRepository.addNewCompany({
    ...payload,
    user_id: user.id,
  });

  if (!idCompany) throw new InvariantError("Gagal menambahkan company.");

  return idCompany;
};

const putCompanyById = async (id, payload, user) => {
  if (!id) throw new NotFoundError("Gagal memperbarui company.");

  const idCompany = await CompaniesRepository.updateCompanyById(
    id,
    payload,
    user,
  );

  if (!idCompany) throw new NotFoundError("Gagal memperbarui company.");

  return idCompany;
};

const deleteCompanyById = async (id, user) => {
  if (!user) throw new AuthError("invalid credentials");

  const idCompany = await CompaniesRepository.deleteCompanyById(id);

  if (!idCompany) throw new NotFoundError("Gagal menghapus company.");

  return idCompany;
};

const getAllCompanies = async () => {
  const companies = await CompaniesRepository.getAllCompanies();
  return companies;
};

const getCompanyById = async (id) => {
  if (!id) throw new NotFoundError("id tidak ditemukan.");
  const company = await CompaniesRepository.getCompanyById(id);
  if (!company) throw new NotFoundError("Company tidak ditemukan.");
  return company;
};

export {
  addCompeny,
  putCompanyById,
  deleteCompanyById,
  getAllCompanies,
  getCompanyById,
};
