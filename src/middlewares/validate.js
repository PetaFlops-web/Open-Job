const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    if (source === "file") {
      if (!req.file) {
        return next({
          isJoi: true,
          details: [{ message: "File is required" }],
        });
      }

      const { error } = schema.validate(
        {
          mimetype: req.file.mimetype,
          size: req.file.size,
        },
        { abortEarly: true },
      );

      if (error) return next(error);
      return next();
    }

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) return next(error);
    req.validate = value;
    next();
  };

export default validate;
