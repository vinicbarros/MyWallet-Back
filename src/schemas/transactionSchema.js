import Joi from "joi";

const transactionSchema = Joi.object({
  type: Joi.string().valid("payment", "receipt").required(),
  description: Joi.string().required(),
  amount: Joi.number().precision(2).required(),
});

export default transactionSchema;
