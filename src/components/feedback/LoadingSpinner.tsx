import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'large', 
  color = '#0ea5e9', 
  text = 'Loading...' 
}: LoadingSpinnerProps) {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <ActivityIndicator size={size} color={color} />
      <Text className="mt-4 text-gray-600 text-base">{text}</Text>
    </View>
  );
}
