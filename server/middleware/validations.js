export function validateAddFinePolicy(data) {
  const schema = Joi.object({
    fineAfter10th: Joi.number().required(),
    fineAfter15th: Joi.number().required(),
    fineAfter25th: Joi.number().required(),
    active: Joi.boolean().required(),
    bazar: Joi.string().required(),
    incomeCategory: Joi.string().required(),
  });
  return schema.validate(data);
}
