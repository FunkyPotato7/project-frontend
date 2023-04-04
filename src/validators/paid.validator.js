import Joi from "joi";

const paidValidator = Joi.object({
    name: Joi.string().max(20).allow('', null).optional(),
    surname: Joi.string().max(20).allow('', null).optional(),
    email: Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/).allow('', null).optional(),
    phone: Joi.string().allow('', null).optional(),
    age: Joi.number().allow('', null).optional(),
    course: Joi.string().allow('', null).optional(),
    course_format: Joi.string().allow(null).optional(),
    course_type: Joi.string().allow(null).optional(),
    status: Joi.string().allow(null).optional(),
    group: Joi.string().allow('', null).optional(),
    sum: Joi.number().allow('', null).optional(),
    already_paid: Joi.number().allow('', null).optional(),
    comment: Joi.string().allow('', null).optional()
});

export {
    paidValidator
};