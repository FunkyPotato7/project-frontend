import Joi from "joi";

const paidValidator = Joi.object({
    name: Joi.string().min(2).max(20).optional(),
    surname: Joi.string().min(2).max(20).optional(),
    email: Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/).optional(),
    phone: Joi.string().allow('').optional(),
    age: Joi.number().allow('').optional(),
    course: Joi.string().allow('').optional(),
    course_format: Joi.string().allow('').optional(),
    course_type: Joi.string().allow('').optional(),
    status: Joi.string().allow('', null).optional(),
    group: Joi.string().allow('').optional(),
    sum: Joi.number().allow('').optional(),
    already_paid: Joi.number().allow('').optional(),
    comment: Joi.string().allow('').optional()
});

export {
    paidValidator
};