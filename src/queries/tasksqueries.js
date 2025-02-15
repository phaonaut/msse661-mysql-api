const CREATE_TASKS_TABLE = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

const CREATE_TASK = `
  INSERT INTO tasks (description, completed) VALUES (?, ?)
`;

const GET_ALL_TASKS = `
  SELECT * FROM tasks
`;

const GET_TASK_BY_ID = `
  SELECT * FROM tasks WHERE id = ?
`;

const UPDATE_TASK = `
  UPDATE tasks SET description = ?, completed = ? WHERE id = ?
`;

const DELETE_TASK = `
  DELETE FROM tasks WHERE id = ?
`;

export default {CREATE_TASKS_TABLE, CREATE_TASK, GET_ALL_TASKS, GET_TASK_BY_ID, UPDATE_TASK, DELETE_TASK};