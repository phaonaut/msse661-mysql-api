import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import dbConnection from '../db-config.js';
import jwtConfig from '../jwt-config.js';
import userQueries from '../queries/userqueries.js';

// ex. localhost:3000/api/user/me
const getMe = (req, res) => {
    const token = req.header('auth-token');

    if(!token) {
        return res.status(401).send('Access Denied');
    };

    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if(err) {
            return res.status(400).send('Invalid Token');
        };

        dbConnection.query(userQueries.GET_USER_BY_ID, [decoded.id], (err, results) => {
            if(err) {
                res.status(500).send('Error retrieving user from database');
            } else {
                res.status(200).send(results);
            }
        });
    });
};

const updateUser = (req, res) => {
    console.log(req.user)
    dbConnection.query(
      userQueries.GET_USER_BY_ID_WITH_PASSWORD,
      [req.user.id],
      (err, user) => {
        if (err) {
          res.status(500).send('Error retrieving user from database.');
        }
  
        console.log(user);
  
        const passwordHash = bcrypt.hashSync(req.body.password);
        dbConnection.query(
          userQueries.UPDATE_USER,
          [req.body.username, req.body.email, passwordHash, user[0].id],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send('Could not update user settings.');
            }
            res.status(200).send('User updated successfully.');
          }
        );
      });
};

export default {
  getMe,
  updateUser
};