import Joi from "joi";
import DateExtension from "@joi/date"

const schema = Joi.object({
  post_user_id: Joi.number()
      .integer(),
  post_content: Joi.string()
      .alphanum()
      // .error(() => "Post can only contain letters and numbers")
      .min(5)
      .max(140)
      // .error(() => "Post must be 5-140characters long")
      .required()
      // .error(() => "This field is required")
      ,

  post_date: Joi.string()
      .pattern(new RegExp(/^\d{4}-\d{2}-\d{2}$/))
      // .error(() => "Post date must be of format DD-MM-YYYY")
      .required()
      // .error(() => "Post must have date")
      ,

  post_tag: Joi.string()
      .pattern(new RegExp('(#+[a-zA-Z0-9(_)]{1,})'))
      // .error((error) => 'Tags must start with a # and can only contain letters and numbers')
})

export default schema;