import Joi from "joi";

export const eventSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  eventDate: Joi.date().iso().required(),
  location: Joi.string().min(3).max(200).required(),
  type: Joi.string().valid("public", "private").required(),
});

export const updateEventSchema = eventSchema.fork(
  ["title", "description", "eventDate", "location", "type"], 
  (schema) => schema.optional()
).min(1);
