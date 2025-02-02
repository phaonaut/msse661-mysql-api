const mysql = require('mysql');
const queries = require('./queries/queries.js');

// Env variable or default to localhost
const host = process.env.DB_HOST || 'localhost';

// Env variable or default to root
const user = process.env.DB_USER || 'root'; // Default user is root for local development

// Env variable or default to root
const password = process.env.DB_PASSWORD || ''; // Remove before pushing to production

// Env variable or default to sketchboxx
const database = process.env.DB_DATABASE || 'sketchboxxdb1'; // Default database is sketchboxx for local development

console.log('host:', host, user, password, database);
const dbConnection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

dbConnection.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected to db!");

    dbConnection.query(queries.CREATE_USERS_TABLE, function(err, result) {
        if (err) {
            throw err;
        }
        console.log("Users table created or already exists.");
    });
});

module.exports = dbConnection;