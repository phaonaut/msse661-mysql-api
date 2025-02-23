import bcrypt from 'bcryptjs';
import dbConnection from '../db-config.js';
import { jwtConfig, generateToken, refreshTokens, verifyToken, generateRefreshToken } from '../utils/jwt-helpers.js';
import authQueries from '../queries/authqueries.js';
import userQueries from '../queries/userqueries.js';
import query from '../utils/query.js';

export const registerUser = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Please provide all required fields.' });
  };

  const passwordHash = bcrypt.hashSync(req.body.password);
  const params = [req.body.username, req.body.email, passwordHash];
  const getDbConnection = await dbConnection().catch(err => { throw err});

  const user = await query(getDbConnection, userQueries.GET_USER_BY_USERNAME, [req.body.username]).catch(err => {
     return res.status(500).send({ message: 'Error retrieving user from database.'});
    }
  );

  if (user.length > 0) {
    return res.status(400).send({ message: 'Username already exists.' });
  }

  const newUser = await query(getDbConnection, authQueries.INSERT_NEW_USER, params).catch(err => {
    return res.status(500).send({ message: 'Error creating new account. Please try again later.'});
  });

  return res.status(200).send({ message: 'User created successfully.' });
};

export const login = async (req, res) => {
  const getDbConnection = await dbConnection().catch(err => { throw err});

  const loginUser = await query(getDbConnection, userQueries.GET_USER_BY_USERNAME_WITH_PASSWORD, [req.body.username]).catch(err => {
        if (err) {
          res.status(500).send('Error retrieving user from database.');
          return;
      }
  });
  if (loginUser.length === 1) {
    const validPassword = await bcrypt.compare(req.body.password, loginUser[0].password).catch(err => {
      return res.status(400).send({ message: 'Invalid password.' });
    });

    if(!validPassword) {
      return res.status(400).send({ message: 'Invalid password.' });
    } else {
      const accessToken = generateToken(loginUser[0].user_id, { expiresIn: 90000 });
      const refreshToken = generateRefreshToken(loginUser[0].user_id, { expiresIn: 90000 });

      refreshTokens.push(refreshToken);
      
      return res
        .header("access_token", accessToken)
        .status(200)
        .send(
          {
            auth: true,
            access_token: accessToken,
            refresh_token: refreshToken,
            message: "User logged in successfully.",
            token_type: "Bearer",
            expires_in: 90000
          }
        );
    }
  }
  return res.status(404).send('User not found.');
};

export const token = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).send({ auth: false, message: 'No token provided.' });

  if (!refreshTokens.includes(refreshToken)) return res.status(403).send({ auth: false, message: 'Invalid refresh token.' });

  const verified = verifyToken(refreshToken, jwtConfig.refresh, req, res);
  if (verified) {
    const accessToken = generateToken(verified.id, { expiresIn: 90000 });
    return res
    .header("access_token", accessToken)
    .status(200)
    .send(
      {
        auth: true,
        access_token: accessToken,
        refresh_token: refreshToken,
        message: "User logged in successfully.",
        token_type: "Bearer",
        expires_in: 90000
      }
    );
  }
  return res.status(403).send({ auth: false, message: 'Invalid refresh token.' });
};

export const logOut = async (req, res) => {
  if (!req.body.token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  const refreshToken = req.body.token;
  const tokenIndex = refreshTokens.indexOf(refreshToken);
  
  if (tokenIndex > -1) {
    refreshTokens.splice(tokenIndex, 1);
  }
  
  return res.send({ auth: false, message: 'User logged out successfully.' });
};