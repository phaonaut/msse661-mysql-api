import mysql from 'mysql';
import queries from './queries/authqueries.js';
import tasksQueries from './queries/tasksqueries.js';

// Env variable or default to localhost
const host = process.env.DB_HOST || 'localhost';

// Env variable or default to root
const user = process.env.DB_USER || 'root'; // Default user is root for local development

// Env variable or default to root
const password = process.env.DB_PASSWORD || 'root'; // Remove before pushing to production

// Env variable or default to test-api-db
const database = process.env.DB_DATABASE || 'test-api-db'; // Default database for local development

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
    dbConnection.query(tasksQueries.CREATE_TASKS_TABLE, function(err, result) {
        if (err) {
            throw err;
        }
        console.log("Tasks table created or already exists.");
    });
});

export default dbConnection;