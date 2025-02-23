const CREATE_TASKS_TABLE = `
  CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
  );
`;

const CREATE_TASK = `INSERT INTO tasks (user_id, description, completed) VALUES (?, ?, ?)`;

const GET_ALL_TASKS = `SELECT * FROM tasks WHERE user_id = ?`;

const GET_TASK_BY_ID = `SELECT * FROM tasks WHERE user_id = ? AND task_id = ?`;

const UPDATE_TASK = (userId, taskId, values) =>
  `UPDATE tasks SET ${values} WHERE task_id = ${taskId} AND user_id = ${userId}`;

const DELETE_TASK = `DELETE FROM tasks WHERE user_id =? AND task_id = ?`;

export default {CREATE_TASKS_TABLE, CREATE_TASK, GET_ALL_TASKS, GET_TASK_BY_ID, UPDATE_TASK, DELETE_TASK};