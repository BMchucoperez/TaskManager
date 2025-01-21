import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/Api';
import { Task } from '../types/Task';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  editTask: (id: number, task: Partial<Task>) => void;
  removeTask: (id: number) => void;
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  editTask: () => {},
  removeTask: () => {},
});

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const editTask = async (id: number, task: Partial<Task>) => {
    const updatedTask = await updateTask(id, task);
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
  };

  const removeTask = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};