const Joi      = require('joi');

// api for validate name , password , email
const validateSignup = (req, res, next) => { 
    const signupSchema = { 
    name     : Joi.string().min(3).required(), 
    password : Joi.string().min(4).required(), 
    email    : Joi.string().email({minDomainAtoms:2}).required() 
    }; 
    const validated = Joi.validate(req.body, signupSchema); 
    if(validated.error)
    res.send(validated.error.details[0].message)
    else
    next();
}

module.exports = validateSignup;