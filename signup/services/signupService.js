const connection    =   require('../../database/sql.js');     // Requires connection to database.

// To signup new user
const signupUser    = (name, email, password) => {
    return new Promise(async(resolve, reject) => {
        connection.query(`insert into user values(${null}, '${name}', '${email}','${password}');`, (err, rows, fields) => {
            if(err)
            reject (err.message);
            else
            resolve (rows);
        });
    });
}

module.exports.signupUser = signupUser;