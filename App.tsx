import React from 'react';
import './global.css'; // Add this line
import AppNavigator from './src/app/index';
import { ToastContainer } from './src/components/feedback';
import ThemeProvider from './src/components/foundations/themes/ThemeProvider';


export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
      <ToastContainer />
    </ThemeProvider>
  );
}
