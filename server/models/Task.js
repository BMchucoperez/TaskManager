const pool = require('../db');

class Task {
  // Para obtener todas las tareas
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
  }

  // Para crear una nueva tarea
  static async create(title, description, status) {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [title, description, status]
    );
    return result.insertId;
  }

  // Para actualizar una tarea
  static async update(id, title, description, status) {
    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, id]
    );
  }

  // Para eliminar una tarea
  static async delete(id) {
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
  }
}

module.exports = Task;