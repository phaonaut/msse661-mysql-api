const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dbConnection = require('../db-config.js');
const jwtConfig = require('../jwt-config.js');
const authQueries = require('../queries/authqueries.js');
const userQueries = require('../queries/userqueries.js');

exports.registerUser = (req, res) => {
  const passwordHash = bcrypt.hashSync(req.body.password);

  dbConnection.query(
    authQueries.INSERT_NEW_USER,
    [req.body.username, req.body.email, passwordHash],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error creating new SketchBoxx account. Please try again later.');
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

exports.login = (req, res) => {
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