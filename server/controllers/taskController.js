const Task = require('../models/Task');

// Para obtener todas las tareas
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Para crear una nueva tarea
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const taskId = await Task.create(title, description, status);
    const newTask = { id: taskId, title, description, status };
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Para actualizar una tarea
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    await Task.update(id, title, description, status);
    res.json({ id, title, description, status });
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Para eliminar una tarea
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.delete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };