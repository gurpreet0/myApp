const bcrypt                    =   require('bcrypt');
const connection                =   require('../../database/sql.js');                        // Requires connection with database.
let userObj                     =   {loggedIn: false};                          // This object stores user's information as soon as it is provided.

// To check if user exists or not
const ifUserExists = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`select email from user where email = '${email}';`, (err, rows, fields) => {
            if(err)
            reject(err.message);
            else if(rows.length < 1)
            reject(new Error(`User does not exist!`));
            else
            resolve(rows[0].email);
        })
    });
}

// To extract password from database
const extractPassword = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`select password from user where email = '${email}';`, (err, rows, fields) => {
            if(err)
            reject(err);
            else if(rows.length < 1)
            reject(new Error("User does not exist!"));
            else
            resolve(rows[0].password);
        });
    });
}

// To update password by providing new password and email.
const updatePassword = (newPassword, email) => {
    return new Promise(async(resolve, reject) => {
        const salt = await bcrypt.genSalt(10);
        const newHash = await bcrypt.hash(newPassword, salt);
        connection.query(`UPDATE user SET password = '${newHash}' WHERE email = '${email}';`, (err, rows, fields) => {
            if(err)
            reject(err);
            else if(rows.length < 1)
            reject("INTERNAL_ERROR");
            else
            resolve("PASSWORD_CHANGED_SUCCESSFULLY");
        });
    });
}

// To verify password
const verifyPassword = (inputPassword, hashedPassword, email) => {
    return new Promise(async(resolve, reject) => {
        const verified = await bcrypt.compare(inputPassword, hashedPassword);
        if(verified) {
            const user = {};
            user.email = email;
            user.loggedIn = true;
            resolve(user);
        }
        else
        reject("Wrong password!");
    });
}

// Generator function to generate information required to reset the password.
function* generateInfoForForgot(email) {
    yield email;
    yield "resetCode";
}

module.exports.ifUserExists            =   ifUserExists;
module.exports.extractPassword         =   extractPassword;
module.exports.verifyPassword          =   verifyPassword;
module.exports.updatePassword          =   updatePassword;
module.exports.userObj                 =   userObj;
