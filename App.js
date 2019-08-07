import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Main from './Screens/Main';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default function App() {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  );
}
