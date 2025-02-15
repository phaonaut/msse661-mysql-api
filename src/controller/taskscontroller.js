import dbConnection from '../db-config.js';
import taskQueries from '../queries/tasksqueries.js';

// Get all tasks
const getAllTasks = (req, res) => {
  dbConnection.query(taskQueries.GET_ALL_TASKS, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
};

// Get task by ID
const getTaskById = (req, res) => {
  const id = req.params.id;
  dbConnection.query(taskQueries.GET_TASK_BY_ID, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json(result[0]);
  });
};

// Create a new task
const createTask = (req, res) => {
  const { description, completed } = req.body;
  dbConnection.query(taskQueries.CREATE_TASK, [description, completed], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "Task created successfully.",
      id: result.insertId,
    });
  });
};

const updateTask = (req, res) => {
  const { description, completed } = req.body;
  const id = req.params.i;
  dbConnection.query(
    taskQueries.UPDATE_TASK,
    [description, completed, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "Task updated successfully." });
    }
  );
};

// Delete a task
const deleteTask = (req, res) => {
  const id = req.params.id;
  dbConnection.query(taskQueries.DELETE_TASK, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Task deleted successfully." });
  });
};

export default { getAllTasks, getTaskById, createTask, updateTask, deleteTask };