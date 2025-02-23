import dbConnection from '../db-config.js';
import taskQueries from '../queries/tasksqueries.js';
import query from '../utils/query.js';
import serverError from '../utils/handlers.js';
import mysql from 'mysql'


const getAllTasks = async (req, res) => {
  const getDbConnection = await dbConnection().catch(err => { throw err});
  const tasks = await query(getDbConnection, taskQueries.GET_ALL_TASKS, [req.user.id]).catch(serverError(res));
  
  if (!tasks.length) { //not sure about this, no tasks should not throw an error
    res.status(404).json({ message: "No tasks found." });
  }

  res.status(200).json(tasks);
};

const getTaskById = async (req, res) => {
  const id = req.params.id;
  const getDbConnection = await dbConnection().catch(err => { throw err});

  const task = await query(getDbConnection, taskQueries.GET_TASK_BY_ID, [req.user.id, id]).catch(err => { 
    return res.status(500).json({ error: err.message });
  });

  if (task.length === 0) {
    return res.status(404).json({ message: "Task not found." });
  }
  res.status(200).json(task[0]);
};

const createTask = async (req, res) => {
  const { description, completed } = req.body;
  const getDbConnection = await dbConnection().catch(err => { throw err});

  if (!req.user.id) {
    return res.status(401).json({ message: "Unauthorized to create a task." });
  }
  
  const createTaskRequest = await query(getDbConnection, taskQueries.CREATE_TASK, [req.user.id, description, completed]).catch(err => { 
    res.status(500).json({ error: err.message });
  });

  res.status(200).json({
    message: "Task created successfully.",
    description: description,
    id: createTaskRequest.insertId,
  });
};

const updateTask = async (req, res) => {
  const { description, completed } = req.body;

  const id = req.params.id;

  const getDbConnection = await dbConnection().catch(err => { throw err});

  const values = _buildValuesString(req);

  const updateTask = await query(getDbConnection, taskQueries.UPDATE_TASK(req.user.id, id, values)).catch(err => { 
    return res.status(500).json({ error: err.message });
  });

  res.status(200).json({ message: "Task updated successfully." });
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  const getDbConnection = await dbConnection().catch(err => { throw err});

  const deleteTaskRequest = await query(getDbConnection, taskQueries.DELETE_TASK, [req.user.id, id]).catch(err => { 
    return res.status(500).json({ error: err.message });
  });

  res.status(200).json({ message: "Task deleted successfully." });
};

const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(key => `${key} = ${mysql.escape(body[key])}`);
  values.join(', ');
  return values;
};

export default { getAllTasks, getTaskById, createTask, updateTask, deleteTask };