var mysql = require('mysql2');

const options = {
    host: 'localhost',
    user: process.env.DB_user,
    database: 'logintest',
    password: process.env.DB_password
}

const connection = mysql.createConnection(options);

module.exports = connection;