import React from 'react';
import { Text, View } from 'react-native';

interface ScreenHeadingProps {
  title: string;
}

const ScreenHeading: React.FC<ScreenHeadingProps> = ({ title }) => (
  <View className="pt-8 pb-4 items-center">
    <Text className="text-2xl font-bold text-sky-500">{title}</Text>
  </View>
);

export default ScreenHeading; 