const Joi      = require('joi');

// api for validate  password , email
const validateLogin = (req, res, next) => { 
    const loginSchema = {  
    password : Joi.string().min(4).required(), 
    email    : Joi.string().email({minDomainAtoms:2}).required() 
    }; 
    const validated = Joi.validate(req.body, loginSchema); 
    
    if(validated.error){
    res.send(validated.error.details[0].message)}
    else
    next();
}

module.exports = validateLogin;