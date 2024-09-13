import Joi from "joi";

const userSchema = Joi.object({
  user_name: Joi.string().alphanum().min(5).max(20).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    // tlds: { allow: [".com", ".se"] },
  }),
  password: Joi.string().min(8).max(32).$.$.required(),
  role: Joi.string()
});

export { userSchema };
