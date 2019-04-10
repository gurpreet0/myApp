/*
        This file provides functions for following operations :-
         - sending reset code on email
         - generating random 6 digit reset code
*/
const nodemailer  = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

// To send reset code on email.
const sendResetCode = (msg, email)=>{

const options = {
    auth: {
        api_key: 'key'
    }
}
const transporter = nodemailer.createTransport(sgTransport(options));
const emailObj = {
    from : 'Nodemailer',
    to: email,
    subject: 'test',
    text: msg
}
transporter.sendMail(emailObj, function(err, res){
    if(err)
    console.log(err);
    else
    console.log(res);
});
}

// To generate reset code.
const getResetCode = () => {
    return Math.floor((Math.random()*1000000));
}

module.exports.getResetCode = getResetCode;
module.exports.sendResetCode = sendResetCode;