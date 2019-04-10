/*
        This file contains controller functions related to signup for following operations :-
         - extract information from request required to signup
         - hash passwords
         - insert signup details into database
*/

const bcrypt        =   require('bcrypt');
const signupService =   require('../services/signupService');
const Promise       =    require('bluebird');

// To signup a user with email and password.
const signup        = (req, res) => {
    Promise.coroutine(function*(){
        const salt   = yield bcrypt.genSalt(10);
        const hashed = yield bcrypt.hash(req.body.password, salt);
        const result = yield signupService.signupUser(req.body.name, req.body.email, hashed);
        return result
    })().then((data)=>{ res.send(data)})
        .catch((err)=>{ res.send(err)});
}

module.exports.signup  =   signup;