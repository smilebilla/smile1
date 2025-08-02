import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ButtonPrimary } from '../../components/buttons/ButtonPrimary';
import { TextInput } from '../../components/inputs/TextInput';
import { DateInput } from '../../components/inputs/DateInput';
import { useTheme } from '../../components/foundations/themes/useTheme';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen: React.FC = () => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.cosmos.deep }} contentContainerStyle={{ padding: 32 }}>
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>Welcome to CorpAstro</Text>
        <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>
          Discover your cosmic journey. Let’s get started!
        </Text>
      </View>
      <View style={{ marginBottom: 24 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 8 }}>Your Name</Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          config={{ size: 'medium' }}
        />
      </View>
      <View style={{ marginBottom: 24 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 8 }}>Birthdate</Text>
        <DateInput
          value={birthdate || undefined}
          onDateChange={setBirthdate}
          placeholder="Select your birthdate"
          label="Birthdate"
          format="MM/DD/YYYY"
          size="medium"
          clearable
          showToday
          labelStyle={{ color: '#fff' }}
        />
      </View>
      <ButtonPrimary
        onPress={() => navigation.navigate('HomeScreen')}
        config={{ size: 'large', variant: 'wide' }}
      >
        Get Started
      </ButtonPrimary>
    </ScrollView>
  );
};

export default OnboardingScreen; 