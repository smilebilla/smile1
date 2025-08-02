import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput as RNTextInput,
  Alert,
  TouchableOpacity
} from 'react-native';
import { InputBase, InputBaseProps, InputBaseValidationState } from '../InputBase';

// Simple icon replacement
const SimpleIcon: React.FC<{ name: string; size: number; color: string }> = ({ name, size, color }) => (
  <View style={{
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <Text style={{ color: '#000', fontSize: size * 0.6, fontWeight: 'bold' }}>
      {name.charAt(0).toUpperCase()}
    </Text>
  </View>
);

/**
 * Comprehensive test component for InputBase
 * Tests: base functionality, validation, icons, animations, configurations
 */
export const InputBaseTest: React.FC = () => {
  const [basicValue, setBasicValue] = useState('');
  const [validationValue, setValidationValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [configValue, setConfigValue] = useState('');
  const [validationState, setValidationState] = useState<InputBaseValidationState>('default');
  const [showPassword, setShowPassword] = useState(false);
  
  const basicInputRef = useRef<RNTextInput>(null);
  const validationInputRef = useRef<RNTextInput>(null);

  const handleValidation = (result: any) => {
    console.log('Validation result:', result);
    Alert.alert('Validation', `State: ${result.state}, Message: ${result.message}`);
  };

  const handleSubmit = (value: string) => {
    Alert.alert('Submit', `Value: ${value}`);
  };

  const handleCustomClear = () => {
    setCustomValue('');
    Alert.alert('Clear', 'Custom clear action triggered');
  };

  const validateEmail = (value: string): boolean | string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Invalid email format';
    return true;
  };

  const validatePassword = (value: string): boolean | string => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return 'Password should contain uppercase, lowercase, and number';
    }
    return true;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>InputBase Component Tests</Text>
      
      {/* Basic Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Input</Text>
        <InputBase
          ref={basicInputRef}
          value={basicValue}
          onValueChange={setBasicValue}
          placeholder="Enter text..."
          config={{
            label: {
              text: 'Basic Input',
              required: true,
            },
            helper: {
              text: 'This is a basic input example',
              position: 'bottom',
            },
          }}
          testID="basic-input"
        />
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        <InputBase
          size="small"
          placeholder="Small input"
          config={{
            label: { text: 'Small' },
          }}
          containerStyle={styles.sizeVariant}
        />
        <InputBase
          size="medium"
          placeholder="Medium input"
          config={{
            label: { text: 'Medium' },
          }}
          containerStyle={styles.sizeVariant}
        />
        <InputBase
          size="large"
          placeholder="Large input"
          config={{
            label: { text: 'Large' },
          }}
          containerStyle={styles.sizeVariant}
        />
      </View>

      {/* Validation Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validation Input</Text>
        <InputBase
          ref={validationInputRef}
          value={validationValue}
          onValueChange={setValidationValue}
          placeholder="Enter at least 5 characters..."
          validationState={validationState}
          required
          config={{
            label: {
              text: 'Validation Input',
              required: true,
            },
            validation: {
              required: true,
              minLength: 5,
              maxLength: 20,
              triggers: ['onChange', 'onBlur'],
              realTime: true,
              debounceMs: 300,
              showCharacterCount: true,
              messages: {
                required: 'This field is required',
                minLength: 'Minimum 5 characters required',
                maxLength: 'Maximum 20 characters allowed',
              },
            },
            helper: {
              text: 'Enter 5-20 characters',
              showOnError: true,
            },
          }}
          onValidation={handleValidation}
          testID="validation-input"
        />
      </View>

      {/* Email Input with Custom Validation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email Input</Text>
        <InputBase
          value={emailValue}
          onValueChange={setEmailValue}
          placeholder="Enter email address..."
          keyboardType="email-address"
          autoCapitalize="none"
          config={{
            label: {
              text: 'Email Address',
              required: true,
            },
            validation: {
              required: true,
              validate: validateEmail,
              triggers: ['onChange', 'onBlur'],
              realTime: true,
            },
            icon: {
              left: <SimpleIcon name="email" size={20} color="rgba(255, 255, 255, 0.6)" />,
            },
            helper: {
              text: 'Enter a valid email address',
              showOnError: true,
            },
          }}
          onValidation={handleValidation}
          testID="email-input"
        />
      </View>

      {/* Password Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Password Input</Text>
        <InputBase
          value={passwordValue}
          onValueChange={setPasswordValue}
          placeholder="Enter password..."
          secureTextEntry={!showPassword}
          config={{
            label: {
              text: 'Password',
              required: true,
            },
            validation: {
              required: true,
              validate: validatePassword,
              triggers: ['onChange', 'onBlur'],
              realTime: true,
            },
            icon: {
              left: <SimpleIcon name="lock" size={20} color="rgba(255, 255, 255, 0.6)" />,
              right: (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <SimpleIcon 
                    name={showPassword ? 'hide' : 'show'} 
                    size={20} 
                    color="rgba(255, 255, 255, 0.6)" 
                  />
                </TouchableOpacity>
              ),
              onPress: () => setShowPassword(!showPassword),
              accessibilityLabel: showPassword ? 'Hide password' : 'Show password',
            },
            helper: {
              text: 'Password must contain uppercase, lowercase, and number',
              showOnError: true,
            },
          }}
          onValidation={handleValidation}
          testID="password-input"
        />
      </View>

      {/* Custom Styled Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styled Input</Text>
        <InputBase
          value={customValue}
          onValueChange={setCustomValue}
          placeholder="Custom styled input..."
          config={{
            label: {
              text: 'Custom Style',
              style: { color: '#FFD700', fontWeight: 'bold' },
            },
            styling: {
              glassMorphism: true,
              glowEffect: true,
              borderRadius: 24,
              backgroundOpacity: 0.3,
              borderOpacity: 0.2,
            },
            animation: {
              focusAnimation: true,
              scaleAnimation: true,
              glowAnimation: true,
              duration: 300,
            },
            icon: {
              right: (
                <TouchableOpacity onPress={handleCustomClear}>
                  <SimpleIcon 
                    name="clear" 
                    size={20} 
                    color="rgba(255, 255, 255, 0.6)" 
                  />
                </TouchableOpacity>
              ),
              onPress: handleCustomClear,
              accessibilityLabel: 'Clear input',
            },
          }}
          containerStyle={styles.customContainer}
          inputStyle={styles.customInput}
          onClear={handleCustomClear}
          testID="custom-input"
        />
      </View>

      {/* Configuration Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Full Configuration</Text>
        <InputBase
          value={configValue}
          onValueChange={setConfigValue}
          placeholder="Full configuration test..."
          multiline
          numberOfLines={3}
          config={{
            label: {
              text: 'Full Configuration',
              position: 'top',
              animate: true,
              required: true,
            },
            validation: {
              required: true,
              minLength: 10,
              maxLength: 100,
              triggers: ['onChange', 'onBlur', 'onSubmit'],
              realTime: true,
              debounceMs: 500,
              showCharacterCount: true,
            },
            icon: {
              left: <SimpleIcon name="description" size={20} color="rgba(255, 255, 255, 0.6)" />,
            },
            animation: {
              focusAnimation: true,
              scaleAnimation: true,
              glowAnimation: true,
              duration: 250,
            },
            helper: {
              text: 'Enter 10-100 characters with full configuration',
              position: 'bottom',
              showOnFocus: true,
            },
            styling: {
              glassMorphism: true,
              glowEffect: true,
              hoverEffect: true,
              animated: true,
              borderRadius: 20,
              backgroundOpacity: 0.25,
              borderOpacity: 0.15,
            },
          }}
          onValidation={handleValidation}
          onSubmit={handleSubmit}
          testID="config-input"
        />
      </View>

      {/* Disabled and ReadOnly States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>State Variants</Text>
        <InputBase
          value="Disabled input"
          disabled
          config={{
            label: { text: 'Disabled' },
          }}
          containerStyle={styles.stateVariant}
        />
        <InputBase
          value="Read-only input"
          readOnly
          config={{
            label: { text: 'Read-only' },
          }}
          containerStyle={styles.stateVariant}
        />
        <InputBase
          value="Loading input"
          loading
          config={{
            label: { text: 'Loading' },
          }}
          containerStyle={styles.stateVariant}
        />
      </View>

      {/* Custom Render Function */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Render</Text>
        <InputBase
          value="Custom render"
          placeholder="Custom render..."
          config={{
            label: { text: 'Custom Render' },
          }}
          renderInput={(props) => (
            <RNTextInput
              {...props}
              style={[props.style, { borderWidth: 2, borderColor: '#FFD700' }]}
              placeholderTextColor="rgba(255, 215, 0, 0.5)"
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08080F',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Futura PT',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E86DE',
    marginBottom: 16,
    fontFamily: 'Futura PT',
  },
  sizeVariant: {
    marginBottom: 12,
  },
  stateVariant: {
    marginBottom: 12,
  },
  customContainer: {
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  customInput: {
    color: '#FFD700',
  },
});

export default InputBaseTest;
