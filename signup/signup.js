/*
        This file contains route to the signup page.
*/

const express                   =       require('express');
const signupController          =       require('./controllers/signupController');
const signup                    =       express.Router();
const signupValidator           =       require('./validators/signupValidator');

//  This route extracts user's name, email and password.
//  It also hashes the password and store it in the Mysql database along with name and email.
signup.post('/', signupValidator, signupController.signup);

module.exports = signup;