import Joi from "joi"; 

// Joi schema validation
const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.object({
    slNo: Joi.number().required(),
    code: Joi.string().min(1).max(5).required(),
    value: Joi.string().min(5).max(15).required(),
  }).required(),
});
export default userSchema;