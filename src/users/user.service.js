import userRepository from "./user.repository.js";
import { InvariantError, NotFoundError } from "../exceptions/index.js";

const addUser = async (payload) => {
  const { name, email, password, role } = payload;

  if (!name || !email || !password || !role)
    throw new InvariantError("Gagal menambahkan user. Mohon isi semua field.");

  const checkEmail = await userRepository.checkUserEmail(email);
  const user = await userRepository.addNewUser(payload);

  if (checkEmail) throw new InvariantError("Email sudah terdaftar.");

  return user;
};

const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);

  if (!user) throw new NotFoundError("User tidak ditemukan.");

  return user;
};

export { addUser, getUserById };
