import Joi from "joi";

export const cardSchema = Joi.object({
  type: Joi.string().required(),
  cardNumber: Joi.number().required(),
  propertyUser: Joi.string().required(),
});
