import userSchema from "../schemas/userSchema.js";

const userSchemaMiddleware = (req, res, next) => {
  const { name, email, password } = req.body;
  const validate = userSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );
  if (validate.error) {
    const error = validate.error.details.map((detail) => detail.message);
    return res.status(422).send(error);
  }
  res.locals.user = { name, email, password };
  next();
};

export default userSchemaMiddleware;
