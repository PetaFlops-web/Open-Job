import {
  addAuthenticationHandler,
  refreshTokenHandler,
  deleteRefreshTokenHandler,
} from "../authentications/authentications.controller.js";
import {
  authenticationSchema,
  refreshTokenSchema,
} from "../authentications/authentication.schema.js";
import validate from "../middlewares/validate.js";
import { Router } from "express";

const routerAuthentication = Router();

routerAuthentication.post(
  "/",
  validate(authenticationSchema),
  addAuthenticationHandler,
);

routerAuthentication.put(
  "/",
  validate(refreshTokenSchema),
  refreshTokenHandler,
);

routerAuthentication.delete(
  "/",
  validate(refreshTokenSchema),
  deleteRefreshTokenHandler,
);

export default routerAuthentication;
