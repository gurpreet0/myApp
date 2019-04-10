/*
        This file creates connection with database and exports that connection.
*/

const mysql = require('mysql');

// Provide credentials to connect to database.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dreambook',
    database: 'gurpreet'
});

// Connect to database.
connection.connect(function(err) {
    if(err)
    throw err;
    console.log('Connected!');
});

module.exports = connection;