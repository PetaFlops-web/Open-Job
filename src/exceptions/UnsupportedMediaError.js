import ClientError from "./Client-Error.js";

class UnsupportedMediaError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "UnsupportedMediaError";
  }
}

export default UnsupportedMediaError;
