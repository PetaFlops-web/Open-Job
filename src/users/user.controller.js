import { addUser, getUserById } from "./user.service.js";
import response from "../utils/response.js";
import CacheService from "../cache/redis.service.js";

const addUserHandler = async (req, res) => {
  try {
    const { name, email, password, role } = req.validate;

    const user = await addUser({ name, email, password, role });

    console.log(user);

    const cache = new CacheService();
    await cache.delete(`user-${user}`);

    return response(res, 201, "User berhasil ditambahkan", { id: user });
  } catch (error) {
    console.error(error);
    if (error.name === "InvariantError")
      return response(res, 400, error.message, null);

    return response(res, 500, error.message, null);
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const cache = new CacheService();
    const cachedUser = await cache.get(`user-${id}`);

    if (cachedUser) {
      res.header("X-Data-Source", "cache");
      return response(res, 200, "User berhasil ditemukan", JSON.parse(cachedUser));
    }

    const user = await getUserById(id);
    await cache.set(`user-${id}`, JSON.stringify(user));
    res.header("X-Data-Source", "database");
    return response(res, 200, "User berhasil ditemukan", user);
  } catch (error) {
    console.error(error);

    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);

    return response(res, 500, error.message, null);
  }
};

export { addUserHandler, getUserByIdHandler };
