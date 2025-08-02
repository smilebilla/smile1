/**
 * CodeInput Demo Screen
 * 
 * This screen demonstrates all functionalities of the CodeInput component,
 * including different sizes, variants, types, validation states, disabled/readOnly/required states,
 * autoFocus, selectTextOnFocus, haptics, configurations (label, validation, security, animation),
 * event handlers, custom styles, and accessibility props.
 * It is designed to work on both iOS and Android.
 * 
 * @module CodeInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { CodeInput, CodeInputConfig, CodeInputProps, CodeInputLabelConfig, CodeInputValidationConfig, CodeInputSecurityConfig, CodeInputAnimationConfig } from '../../components/inputs/CodeInput'; // Adjust path if necessary
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const CodeInputScreen: React.FC = () => {
  const [codeExample, setCodeExample] = useState('');

  const handleCodeChange = (code: string, isComplete: boolean) => {
    setCodeExample(code);
    Alert.alert('Code Changed', `Code: ${code}, Complete: ${isComplete}`);
  };

  const handleCodeComplete = (code: string) => {
    Alert.alert('Code Complete', `Completed Code: ${code}`);
  };

  const handleValidation = (isValid: boolean, message: string) => {
    Alert.alert('Validation', `Valid: ${isValid}, Message: ${message}`);
  };

  const handleSubmit = (code: string) => {
    Alert.alert('Submitted', `Code: ${code}`);
  };

  // Label config example
  const labelConfig: CodeInputLabelConfig = { text: 'Custom Label', position: 'top', required: true, requiredColor: 'red' };

  // Validation config example
  const validationConfig: CodeInputValidationConfig = {
    validate: (code) => code === '1234' || 'Invalid code',
    realTime: true,
    debounceMs: 300,
    minLength: 4,
    maxLength: 4,
    pattern: /^\d{4}$/,
  };

  // Security config example
  const securityConfig: CodeInputSecurityConfig = { maskInput: true, maskDelay: 500, maskCharacter: '•', clearOnBackground: true, preventScreenshots: true };

  // Animation config example
  const animationConfig: CodeInputAnimationConfig = { focusAnimation: true, duration: 300, digitAnimation: true, errorShake: true, successPulse: true };

  return (
    <ScrollView contentContainerClassName="p-5 items-center">
      <ScreenHeading title="CodeInput Demo" />
      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Sizes</Text>
      
      <CodeInput length={4} size="small" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} size="medium" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} size="large" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Variants</Text>
      
      <CodeInput length={4} variant="default" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} variant="outlined" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} variant="filled" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} variant="underlined" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Types</Text>
      
      <CodeInput length={4} type="numeric" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} type="alphanumeric" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} type="alphabetic" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Validation States</Text>
      
      <CodeInput length={4} validationState="default" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} validationState="error" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} validationState="success" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} validationState="warning" onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">States</Text>
      
      <CodeInput length={4} disabled onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} readOnly onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} required onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">AutoFocus & SelectTextOnFocus</Text>
      
      <CodeInput length={4} autoFocus selectTextOnFocus onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Enable Haptics</Text>
      
      <CodeInput length={4} enableHaptics={true} onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Configurations</Text>
      
      <CodeInput length={4} config={{ label: labelConfig }} onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} config={{ validation: validationConfig }} onCodeChange={handleCodeChange} onValidation={handleValidation} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} config={{ security: securityConfig }} onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <CodeInput length={4} config={{ animation: animationConfig }} onCodeChange={handleCodeChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Event Handlers</Text>
      
      <CodeInput
        length={4}
        onCodeChange={handleCodeChange}
        onCodeComplete={handleCodeComplete}
        onValidation={handleValidation}
        onFocus={(index) => Alert.alert('Focused', `Index: ${index}`)}
        onBlur={(index) => Alert.alert('Blurred', `Index: ${index}`)}
        onSubmit={handleSubmit}
        style={{ marginBottom: 10, width: '100%' }}
      />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Custom Styles</Text>
      
      <CodeInput
        length={4}
        style={{ borderWidth: 2, borderColor: 'red', marginBottom: 10, width: '100%' }}
        inputStyle={{ color: 'blue' }}
        containerStyle={{ backgroundColor: 'lightgray' }}
        onCodeChange={handleCodeChange}
      />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Accessibility Props</Text>
      
      <CodeInput
        length={4}
        config={{ accessibility: { accessibilityLabel: 'Accessible Code Input', accessibilityHint: 'Enter your code' } }}
        onCodeChange={handleCodeChange}
        style={{ marginBottom: 10, width: '100%' }}
      />
      <NextButton nextScreen="HomeScreen" label="Next" />
    </ScrollView>
  );
};

export default CodeInputScreen;