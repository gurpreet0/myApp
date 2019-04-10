/*
        This file contains routes related to following login actions :-
         -login
         -change password
         -forgot password
*/

const express               =       require('express');
const loginController       =       require('./controllers/loginController');
const login                 =       express.Router();
const forgot                =       express.Router();
const loginValidator        =       require('./validators/loginValidator');
const forgotValidator       =       require('./validators/forgotValidator');


login.post('/', loginValidator, loginController.login);                                 // route for /login/ API.
forgot.post('/1',forgotValidator.validateForgot, loginController.forgotStep_1);                 // route for /forgot/ password API.
forgot.post('/2', loginController.forgotStep_2);
forgot.post('/3', forgotValidator.validateForgot1, loginController.forgotStep_3);

// Exporting all routes.
module.exports.login            =       login;
module.exports.forgot           =       forgot;