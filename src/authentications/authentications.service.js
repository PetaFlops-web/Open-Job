import TokenManager from "../security/token-manager.js";
import AuthenticationRepository from "./authentication.repository.js";
import userRepository from "../users/user.repository.js";
import { NotFoundError } from "../exceptions/index.js";

const addAuthentication = async (payload) => {
  const { email, password } = payload;

  const checkUser = await userRepository.checkUserEmail(email);
  if (!checkUser) throw new NotFoundError("User not found");

  const verifyCredential = await AuthenticationRepository.verifyUserCredential({
    email,
    password,
  });

  if (!verifyCredential) throw new NotFoundError("Invalid credential");

  const accessToken = TokenManager.generateAccessToken({
    id: verifyCredential,
  });
  const refreshToken = TokenManager.generateRefreshToken({
    id: verifyCredential,
  });

  await AuthenticationRepository.token(refreshToken);

  return { accessToken, refreshToken };
};

const refreshTokenAuth = async (refreshToken) => {
  const result =
    await AuthenticationRepository.verifyRefreshToken(refreshToken);

  if (!result) throw new NotFoundError("Invalid refresh token");

  const { id } = TokenManager.verifyRefreshToken(refreshToken);
  const accessToken = TokenManager.generateAccessToken({ id });

  return { accessToken };
};

const deleteRefreshToken = async (refreshToken) => {
  const verify =
    await AuthenticationRepository.verifyRefreshToken(refreshToken);

  if (!verify) throw new NotFoundError("Invalid refresh token");

  const result =
    await AuthenticationRepository.deleteRefreshToken(refreshToken);

  return result;
};

export { addAuthentication, refreshTokenAuth, deleteRefreshToken };
