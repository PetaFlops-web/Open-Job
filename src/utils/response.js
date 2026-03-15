const response = (res, statusCode, message, data = null) => {
  let status = "success";

  if (statusCode >= 400 && statusCode < 500) {
    status = "failed";
  } else if (statusCode >= 500) {
    status = "error";
  }

  const responseBody = {
    status,
    message,
  };

  if (data) {
    responseBody.data = data;
  }

  return res.status(statusCode).json(responseBody);
};

export default response;
