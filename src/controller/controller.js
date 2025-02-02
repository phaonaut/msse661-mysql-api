const dbConnection = require('../db-config.js');
const queries = require('../queries/queries.js');

/**
 * Controller for getting all users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */ 

// ex. localhost:3000/api/users
// TODO remove later, only for testing purposes
exports.getUsers = (req, res) => {
    dbConnection.query(queries.GET_ALL_USERS, (err, results) => {
        if(err) {
            res.status(500).send('Error retrieving users from database');
        } else {
            res.status(200).send(results);
        }
    });
};

// ex. localhost:3000/api/user/1
exports.getUserById = (req, res) => {
    dbConnection.query(queries.GET_USER_BY_ID, [req.params.id], (err, results) => {
        if(err) {
            res.status(500).send('Error retrieving users from database.');
        } else {
            res.status(200).send(results);
        }
    });
};

// ex. localhost:3000/api/user
exports.addUser = (req, res) => {
    dbConnection.query(queries.ADD_USER, [req.body.name, req.body.email, req.body.password], (err, results) => {
        if(err) {
            res.status(500).send('Error creating new SketchBoxx account.');
        } else {
            res.status(200).send(results);
        }
    });
};

// TODO Add support later

// exports.updateUser = (req, res) => {
//     dbConnection.query(queries.UPDATE_USER, (err, results) => {
//         if(err) {
//             res.status(500).send('Error retrieving users from database');
//         } else {
//             res.status(200).send(results);
//         }
//     });
// };

// ex. localhost:3000/api/user/1
exports.deleteUser = (req, res) => {
    dbConnection.query(queries.DELETE_USER, [req.params.id], (err, results) => {
        if(err) {
            res.status(500).send('Error retrieving users from database');
        } else {
            res.status(200).send(results);
        }
    });
};