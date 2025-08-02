import React from 'react';
import { StatusBar, StatusBarStyle, View } from 'react-native';
import { useTheme } from '../foundations/themes/useTheme'; // Adjust the import path based on your project structure

interface StatusbarProps {
  backgroundColor?: string; // Optional override for background color
  barStyle?: StatusBarStyle; // 'light-content' or 'dark-content'
}

const Statusbar: React.FC<StatusbarProps> = ({
  backgroundColor,
  barStyle = 'light-content', // Default to light-content for dark backgrounds
}) => {
  const { colors } = useTheme();

  // Use provided backgroundColor or fall back to theme's cosmos.deep
  const statusBarBackground = backgroundColor || colors.cosmos.deep;

  return (
    <View style={{ backgroundColor: statusBarBackground }}>
      <StatusBar
        backgroundColor={statusBarBackground}
        barStyle={barStyle}
        translucent={false} // Set to false to avoid overlapping content
      />
    </View>
  );
};

export default Statusbar;