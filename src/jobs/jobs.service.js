import jobsRepository from "./jobs.repository.js";
import {
  InvariantError,
  NotFoundError,
  AuthError,
} from "../exceptions/index.js";
const addNewJob = async (payload, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const id = await jobsRepository.addNewJob(payload);
  if (!id) throw new InvariantError("Gagal menambahkan job.");
  return id;
};

const updateJobById = async (id, payload, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const idJob = await jobsRepository.updateJobById(id, payload);
  if (!idJob) throw new NotFoundError("Gagal memperbarui job");
  return idJob;
};

const deleteJobById = async (id, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const idJob = await jobsRepository.deleteJobById(id);
  if (!idJob) throw new NotFoundError("Gagal menghapus job");
  return idJob;
};

const getAllJobs = async () => {
  const jobs = await jobsRepository.getAllJobs();
  if (!jobs) throw new NotFoundError("Gagal mengambil data.");
  return jobs;
};

const getJobsByCompany = async (id) => {
  const jobs = await jobsRepository.getJobsByCompany(id);
  if (!jobs) throw new NotFoundError("Gagal mengambil data.");
  return jobs;
};

const getJobByCategory = async (id) => {
  const jobs = await jobsRepository.getJobByCategory(id);
  if (!jobs) throw new NotFoundError("Gagal mengambil data.");
  return jobs;
};

const getJobById = async (id) => {
  const jobs = await jobsRepository.getJobById(id);
  if (!jobs) throw new NotFoundError("Gagal mengambil data.");
  return jobs;
};

export {
  addNewJob,
  updateJobById,
  deleteJobById,
  getAllJobs,
  getJobsByCompany,
  getJobByCategory,
  getJobById,
};
