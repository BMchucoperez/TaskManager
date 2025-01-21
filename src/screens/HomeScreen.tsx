import React, { useContext, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import TaskList from '../components/TaskList';
import { TaskContext } from '../context/TaskContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Task } from '../types/Task';

const HomeScreen: React.FC = () => {
  const { addTask, tasks, editTask, removeTask } = useContext(TaskContext);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Pendiente' | 'En Proceso' | 'Completada'>('Pendiente');

  const addModalRef = useRef<Animatable.View & View>(null);
  const editModalRef = useRef<Animatable.View & View>(null);

  const handleAddTask = () => {
    setAddModalVisible(true);
  };

  const handleSaveTask = () => {
    if (selectedTask) {
      editTask(selectedTask.id, { title, description, status });
    } else {
      addTask({
        title,
        description,
        status,
      });
    }
    setAddModalVisible(false);
    setEditModalVisible(false);
    setTitle('');
    setDescription('');
    setStatus('Pendiente');
    setSelectedTask(null);
  };

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setEditModalVisible(true);
  };

  const closeModal = (ref: React.RefObject<Animatable.View & View>, setModalVisible: (visible: boolean) => void) => {
    if (ref.current) {
      ref.current.slideOutDown?.(300).then(() => setModalVisible(false));
    } else {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Tareas</Text>
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.taskListContainer}>
        <TaskList
          tasks={tasks}
          onTaskPress={handleTaskPress}
          onDeleteTask={(id) => removeTask(id)}
        />
      </View>

      <Modal visible={isAddModalVisible} animationType="none" transparent={true}>
        <View style={styles.modalOverlay}>
          <Animatable.View
            ref={addModalRef}
            animation="slideInUp"
            duration={300}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Añadir Tarea</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={description}
              onChangeText={setDescription}
            />
            <Picker
              selectedValue={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Pendiente" value="Pendiente" />
              <Picker.Item label="En Proceso" value="En Proceso" />
              <Picker.Item label="Completada" value="Completada" />
            </Picker>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => closeModal(addModalRef, setAddModalVisible)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </Modal>

      <Modal visible={isEditModalVisible} animationType="none" transparent={true}>
        <View style={styles.modalOverlay}>
          <Animatable.View
            ref={editModalRef}
            animation="slideInUp"
            duration={300}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Editar Tarea</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={description}
              onChangeText={setDescription}
            />
            <Picker
              selectedValue={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Pendiente" value="Pendiente" />
              <Picker.Item label="En Proceso" value="En Proceso" />
              <Picker.Item label="Completada" value="Completada" />
            </Picker>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => closeModal(editModalRef, setEditModalVisible)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#6200ee',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#03dac6',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  taskListContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#00C851',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;