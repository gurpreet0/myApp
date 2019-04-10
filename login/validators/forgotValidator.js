const Joi      = require('joi');

// api for validate  email
const validateForgot = (req, res, next) => { 
    const forgotSchema = { 
        email : Joi.string().email({minDomainAtoms:2}).required() 
    }; 
    const validated = Joi.validate(req.body, forgotSchema); 
    if(validated.error)
    res.send(validated.error.details[0].message)
    else
    next();
}
const validateForgot1 = (req, res, next) => { 
    const forgotSchema = { 
        passwordNew : Joi.string().min(4).required(), 
        resetCode   : Joi.number().required()
    }; 
    const validated = Joi.validate(req.body, forgotSchema); 
    if(validated.error)
    res.send(validated.error.details[0].message)
    else
    next();
}

module.exports.validateForgot = validateForgot;
module.exports.validateForgot1 = validateForgot1;
