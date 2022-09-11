import transactionSchema from "../schemas/transactionSchema.js";

const postTransactionMiddleware = async (req, res, next) => {
  const { type, description, amount } = req.body;

  const validate = transactionSchema.validate(
    { type, description, amount },
    { abortEarly: false, convert: false }
  );

  if (validate.error) {
    const error = validate.error.details.map((detail) => detail.message);
    return res.status(422).send(error);
  }
  res.locals.transaction = { type, description, amount };
  next();
};

export default postTransactionMiddleware;
