const Joi = require('joi');

////firstname, lastname, email, password
const registrationSchema = Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(8).required()
    .messages({
        "string.empty": "password cannot be empty",
        "any.required": "Password is required"
    }),
    confirmPassword: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
    //.messages({"string-empty": "{{#label}} password is required"})
});

module.exports = {registrationSchema, loginSchema};