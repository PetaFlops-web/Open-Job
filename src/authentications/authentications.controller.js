import {
  addAuthentication,
  refreshTokenAuth,
  deleteRefreshToken,
} from "./authentications.service.js";
import response from "../utils/response.js";
const addAuthenticationHandler = async (req, res) => {
  const { email, password } = req.validate;

  try {
    const token = await addAuthentication({ email, password });
    return response(res, 200, "Login berhasil", {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "NotFoundError")
      return response(res, 401, error.message, null);

    return response(res, 500, error.message, null);
  }
};

const refreshTokenHandler = async (req, res) => {
  const { refreshToken } = req.validate;

  try {
    const token = await refreshTokenAuth(refreshToken);
    return response(res, 200, "Refresh token berhasil", token);
  } catch (error) {
    console.error(error);
    if (error.name === "NotFoundError")
      return response(res, 400, error.message, null);

    return response(res, 500, error.message, null);
  }
};

const deleteRefreshTokenHandler = async (req, res) => {
  try {
    const { refreshToken } = req.validate;
    const result = await deleteRefreshToken(refreshToken);
    return response(res, 200, "Refresh token berhasil dihapus", result);
  } catch (error) {
    console.error(error);
    if (error.name === "NotFoundError")
      return response(res, 400, error.message, null);
    return response(res, 500, error.message, null);
  }
};

export {
  addAuthenticationHandler,
  refreshTokenHandler,
  deleteRefreshTokenHandler,
};
