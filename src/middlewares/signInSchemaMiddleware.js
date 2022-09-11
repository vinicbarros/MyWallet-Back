import signInSchema from "../schemas/signInSchema.js";

const signInSchemaMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  const validate = signInSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (validate.error) {
    const error = validate.error.details.map((detail) => detail.message);
    return res.status(422).send(error);
  }
  res.locals.user = req.body;
  next();
};

export default signInSchemaMiddleware;
