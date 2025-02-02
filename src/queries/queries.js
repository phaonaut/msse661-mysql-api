
exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(32) NOT NULL,
    status VARCHAR(16) NOT NULL DEFAULT 'Active',
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

// Get all users
// Remove later, only for testing purposes
exports.GET_ALL_USERS = 'SELECT * FROM users';

// Get user by id
exports.GET_USER_BY_ID = 'SELECT * FROM users WHERE id = ?';

// Add user
exports.ADD_USER = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

// Update user by id
// TODO add support later and seperate out the password update
// exports.UPDATE_USER = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';

// Delete user by id
exports.DELETE_USER = 'DELETE FROM users WHERE id = ?';