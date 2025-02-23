const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(16) NOT NULL DEFAULT 'Active',
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

// Add user
const INSERT_NEW_USER = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

export default {CREATE_USERS_TABLE, INSERT_NEW_USER};