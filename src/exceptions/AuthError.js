import ClientError from "./Client-Error.js";

class AuthError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = "AuthError";
  }
}

export default AuthError;
