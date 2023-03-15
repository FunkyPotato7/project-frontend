import Joi from "joi";

import { regexp } from "../configs";

const userValidator = {
    createValidator: Joi.object({
        name: Joi.string().min(2).max(20).required(),
        surname: Joi.string().min(2).max(20).required(),
        email: Joi.string().regex(regexp.EMAIL).required()
    }),
    passwordValidator: Joi.object({
        password: Joi.string().regex(regexp.PASSWORD).required(),
        confirmPassword: Joi.string().allow('').optional()
    })
};

export {
    userValidator
};