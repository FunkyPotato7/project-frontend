import Joi from "joi";

import { regexp } from "../configs";

const authValidator = Joi.object({
    email: Joi.string().regex(regexp.EMAIL).required(),
    password: Joi.string().required()
})

export {
    authValidator
};