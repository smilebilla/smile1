import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface NextButtonProps {
  nextScreen: string;
  label?: string;
}

const NextButton: React.FC<NextButtonProps> = ({ nextScreen, label = 'Next' }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="bg-sky-500 py-3 px-8 rounded-lg items-center mt-6 mb-4 self-center"
      onPress={() => navigation.navigate(nextScreen as never)}
    >
      <Text className="text-white font-bold text-lg">{label}</Text>
    </TouchableOpacity>
  );
};

export default NextButton; 