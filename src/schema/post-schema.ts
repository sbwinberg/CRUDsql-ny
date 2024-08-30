import Joi from "joi";

const postSchema = Joi.object({
  post_user_id: Joi.number().integer(),

  post_content: Joi.string().alphanum().min(5).max(140).required(),

  post_date: Joi.string()
    .pattern(new RegExp(/^\d{4}-\d{2}-\d{2}$/))
    .required(),

  post_tag: Joi.string().pattern(new RegExp("(#+[a-zA-Z0-9(_)]{1,})")),
});

export { postSchema };
