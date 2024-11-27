const { v4: uuidv4 } = require('uuid');

let tasks = [];

// [GET] Retorna todas as tarefas
const getAllTasks = (req, res) => {
  res.json(tasks);
};

// [GET] Retorna uma tarefa pelo ID
const getTaskById = (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
};

// [POST] Cria uma nova tarefa
const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// [PUT] Atualiza uma tarefa pelo ID
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed,
  };

  res.json(tasks[taskIndex]);
};

// [DELETE] Remove uma tarefa pelo ID
const deleteTask = (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
