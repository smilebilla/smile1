import React from 'react';
import { ThemeProvider } from './components/foundations/themes';
import BeautifulHomeScreen from './screens/BeautifulHomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <BeautifulHomeScreen />
    </ThemeProvider>
  );
} 