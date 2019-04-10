/*
        This file contains controller functions for following operations :-
         - login
         - reset password      
*/
const Promise          = require('bluebird');
const loginService     = require('../services/loginService')
const utilities        = require('../../utilities/utilites')
let emailTemp          = null;
let iterator;
let resetCode;

// To log in a user with email and password.
const login = (req, res) => {
    Promise.coroutine(function*(){
        yield loginService.ifUserExists(req.body.email);
        const hashedPassword = yield loginService.extractPassword(req.body.email);
        const result         =  yield loginService.verifyPassword(req.body.password, hashedPassword, req.body.email);
        return result
    })().then((data)=>{ 
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    });
}

// Generator function to generate information required to reset the password.
function* generateInfoForForgot(email) {
    yield loginService.ifUserExists(email);
    yield utilities.getResetCode();
}

// To generate reset code to reset password by providing email.
const forgotStep_1 = (req, res) => {
    iterator = generateInfoForForgot(req.body.email);
    iterator.next().value
    .then(email => { emailTemp = email; resetCode = iterator.next().value; res.send("GENERATING_RESET_CODE");})
    .catch(err => res.send(err));
}

// To send reset code to email.
const forgotStep_2 = (req, res) => {
    if(emailTemp != null) {
        utilities.sendResetCode(resetCode, emailTemp);
        res.send("RESET_CODE_SENT");
    }
    else
    res.send("GENERATE_RESET_CODE_FIRST")
}

// To verify reset code and set new password.
const forgotStep_3 = (req, res) => {
    if( emailTemp == null)
    res.send("GENERATE_RESET_CODE_FIRST");
    else if (req.body.resetCode == resetCode) {
        loginService.updatePassword(req.body.passwordNew, emailTemp)
        .then(message => res.send(message))
        .catch(err => res.send(err));
    }
    else
    res.send("ENTER_A_VALID_RESET_CODE");
}

module.exports.login        =   login;
module.exports.forgotStep_1 = forgotStep_1;
module.exports.forgotStep_2 = forgotStep_2;
module.exports.forgotStep_3 = forgotStep_3;