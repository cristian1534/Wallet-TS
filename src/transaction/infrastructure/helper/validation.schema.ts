import Joi from "joi";

export const transactionSchema = Joi.object({
  type: Joi.string().required(),
  amount: Joi.number().required(),
});
