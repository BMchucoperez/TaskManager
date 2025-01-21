import React from 'react';
import { TaskProvider } from './context/TaskContext';
import HomeScreen from './screens/HomeScreen';

const App = (): JSX.Element => {
  return (
    <TaskProvider>
      <HomeScreen />
    </TaskProvider>
  );
};

export default App;