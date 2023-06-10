import React from 'react';
import {useColorScheme} from 'react-native';
import {Router} from './src/Router';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return <Router />;
}

export default App;
