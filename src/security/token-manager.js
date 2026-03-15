import jwt from "jsonwebtoken";
import InvariantError from "../exceptions/Invariant-Error.js";

const TokenManager = {
  generateAccessToken: (payload) =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) =>
    jwt.sign(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
      return payload;
    } catch {
      throw new InvariantError("Refresh token tidak valid");
    }
  },

  verify: (token, key) => {
    try {
      const payload = jwt.verify(token, key);
      return payload;
    } catch {
      throw new InvariantError("Token tidak valid");
    }
  },
};

export default TokenManager;
