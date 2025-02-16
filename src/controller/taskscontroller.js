import dbConnection from '../db-config.js';
import taskQueries from '../queries/tasksqueries.js';
import query from '../utils/query.js';


const getAllTasks = async (req, res) => {
  const getDbConnection = await dbConnection().catch(err => { throw err});
  const tasks = await query(getDbConnection, taskQueries.GET_ALL_TASKS).catch(err => { 
    return res.status(500).json({ error: err.message });
  });
  res.status(200).json(tasks);
};

const getTaskById = async (req, res) => {
  const id = req.params.id;
  const getDbConnection = await dbConnection().catch(err => { throw err});

  const task = await query(getDbConnection, taskQueries.GET_TASK_BY_ID, [id]).catch(err => { 
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

  const createTaskRequest = await query(getDbConnection, taskQueries.CREATE_TASK, [description, completed]).catch(err => { 
    return res.status(500).json({ error: err.message });
  });

  return res.status(200).json({
    message: "Task created successfully.",
    description: description,
    id: createTaskRequest.insertId,
  });
};

const updateTask = async (req, res) => {
  const { description, completed } = req.body;

  const id = req.params.id;

  const getDbConnection = await dbConnection().catch(err => { throw err});

  const updateTask = await query(getDbConnection, taskQueries.UPDATE_TASK, [description, completed, id]).catch(err => { 
    return res.status(500).json({ error: err.message });
  });

  res.status(200).json({ message: "Task updated successfully." });
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  const getDbConnection = await dbConnection().catch(err => { throw err});

  const deleteTaskRequest = await query(getDbConnection, taskQueries.DELETE_TASK, [id]).catch(err => { 
    return res.status(500).json({ error: err.message });
  });

  res.status(200).json({ message: "Task deleted successfully." });
};

export default { getAllTasks, getTaskById, createTask, updateTask, deleteTask };