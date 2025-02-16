import { jwtConfig, verifyToken } from '../utils/jwt-helpers.js';

export default (req, res, next) => {
  const token = req.headers['auth-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Access Denied.');
  };

  try {
    const user = verifyToken(token, jwtConfig.access, req, res); // { id: 12344, iat: 123123 }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token.');
  }
};