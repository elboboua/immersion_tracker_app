// validation
const Joi = require('joi');
const signupSchema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
});

const signinSchema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
});

module.exports.signupSchema = signupSchema; 
module.exports.signinSchema = signinSchema;