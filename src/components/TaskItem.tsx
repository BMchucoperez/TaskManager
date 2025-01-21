import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pendiente':
      return '#ff4444';
    case 'En Proceso':
      return '#ffbb33';
    case 'Completada':
      return '#00C851';
    default:
      return '#888';
  }
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text style={{ color: getStatusColor(task.status) }}>{task.status}</Text>
      <Text>Creado el: {task.createdAt}</Text>
      <Button title="Eliminar" onPress={() => onDelete(task.id)} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskItem;