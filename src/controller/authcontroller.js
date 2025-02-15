import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import dbConnection from '../db-config.js';
import jwtConfig from '../jwt-config.js';
import authQueries from '../queries/authqueries.js';
import userQueries from '../queries/userqueries.js';

export const registerUser = (req, res) => {
  const passwordHash = bcrypt.hashSync(req.body.password);

  dbConnection.query(
    authQueries.INSERT_NEW_USER,
    [req.body.username, req.body.email, passwordHash],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error creating new account. Please try again later.');
      }

      dbConnection.query(userQueries.GET_USER_BY_USERNAME, [req.body.username], (err, user) => {
        if (err) {
          res.status(500).send('Error retrieving user from database.');
        } else {
          console.log(user);
          res.status(200).send(user);
        }
      });

    }
  );
};

export const login = (req, res) => {
  dbConnection.query(
    userQueries.GET_USER_BY_USERNAME_WITH_PASSWORD,
    [req.body.username],
     (err, user) => {
      if (err) {
        res.status(500).send('Error retrieving user from database.');
        return;
      }
      if (user.length === 0) {
        res.status(404).send('User not found.');
        return;
      }
      
      // validate password
      bcrypt
      .compare(req.body.password, user[0].password)
      .then((isMatch) => {
        if (isMatch) {
          // create token and send it back to client
          const token = jwt.sign({ id: user[0].id }, jwtConfig.secret); 
          res.header("auth-token", token).status(200).send('Login successful!');
        }
        else {
          res.status(401).send('Invalid password');
        }
      }).catch((err) => {
        console.log(err);
        res.status(500).send('Error validating password.');
      });
    }
  )
};