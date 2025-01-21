import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskPress, onDeleteTask }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 4;

  const startIndex = currentPage * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const paginatedTasks = tasks.slice(startIndex, endIndex);

  // Función para ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para ir a la página siguiente
  const goToNextPage = () => {
    if (endIndex < tasks.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={paginatedTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <TouchableOpacity
                style={styles.taskContent}
                onPress={() => onTaskPress(item)}
              >
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <Text style={styles.taskStatus}>{item.status}</Text>
                <Text style={styles.taskCreatedAt}>Creado el: {item.createdAt}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDeleteTask(item.id)}
              >
                <Icon name="delete" size={24} color="#ff4444" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={goToPreviousPage} disabled={currentPage === 0}>
          <Text style={[styles.paginationButton, currentPage === 0 && styles.disabledButton]}>
            Anterior
          </Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>
          Página {currentPage + 1} de {Math.ceil(tasks.length / tasksPerPage)}
        </Text>
        <TouchableOpacity onPress={goToNextPage} disabled={endIndex >= tasks.length}>
          <Text
            style={[
              styles.paginationButton,
              endIndex >= tasks.length && styles.disabledButton,
            ]}
          >
            Siguiente
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  taskStatus: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontStyle: 'italic',
  },
  taskCreatedAt: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  deleteButton: {
    marginLeft: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  paginationButton: {
    fontSize: 16,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  disabledButton: {
    color: '#ccc',
  },
  pageNumber: {
    fontSize: 16,
    color: '#333',
  },
});

export default TaskList;