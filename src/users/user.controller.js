import { addUser, getUserById } from "./user.service.js";
import response from "../utils/response.js";

const addUserHandler = async (req, res, err) => {
  try {
    const { name, email, password, role } = req.validate;

    const user = await addUser({ name, email, password, role });

    console.log(user);

    return response(res, 201, "User berhasil ditambahkan", { id: user });
  } catch (error) {
    console.error(error);
    if (err.name === "InvariantError")
      return response(res, 400, error.message, null);

    return response(res, 500, error.message, null);
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    return response(res, 200, "User berhasil ditemukan", user);
  } catch (error) {
    console.error(error);

    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);

    return response(res, 500, error.message, null);
  }
};

export { addUserHandler, getUserByIdHandler };
