import mysql from 'mysql';
import queries from './queries/authqueries.js';
import tasksQueries from './queries/tasksqueries.js';

// Env variable or default to localhost
const host = process.env.DB_HOST || 'localhost';

// Env variable or default to root
const user = process.env.DB_USER || 'root'; // Default user is root for local development

// Env variable or default to root
const password = process.env.DB_PASSWORD || ''; // Remove before pushing to production

// Env variable or default to test-api-db
const database = process.env.DB_DATABASE || 'test-api-db'; // Default database for local development

import query from './utils/query.js';

export default async (params) => {
    return new Promise(async (resolve, reject) => {
        const dbConnection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });
        const userTableCreated = await query(dbConnection, queries.CREATE_USERS_TABLE).catch((err) => {reject(err)});
        const tasksTableCreated = await query(dbConnection, tasksQueries.CREATE_TASKS_TABLE).catch((err) => {reject(err)});

        if(!!userTableCreated && !!tasksTableCreated){
            console.log("Users table created or already exists.");
            resolve(dbConnection);
        };
    });
};

// export default dbConnection;