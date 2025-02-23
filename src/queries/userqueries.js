const GET_USER_BY_ID = 'SELECT user_id, username, email, status, create_time FROM users WHERE user_id = ?';

const GET_USER_BY_USERNAME = 'SELECT user_id, username, email, status, create_time FROM users WHERE username = ?';

const GET_USER_BY_ID_WITH_PASSWORD = 'SELECT * FROM users WHERE user_id = ?';

const GET_USER_BY_USERNAME_WITH_PASSWORD = 'SELECT * FROM users WHERE username = ?';

const UPDATE_USER = 'UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?';

export default {
  GET_USER_BY_ID,
  GET_USER_BY_USERNAME,
  GET_USER_BY_ID_WITH_PASSWORD,
  GET_USER_BY_USERNAME_WITH_PASSWORD,
  UPDATE_USER,
};