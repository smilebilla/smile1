/**
 * PhoneInput Demo Screen
 * 
 * This screen demonstrates all functionalities of the PhoneInput component,
 * including different sizes, variants, validation states, disabled/readOnly/required states,
 * country code selection, label configurations, validation configurations, formatting,
 * animations, event handlers, custom styles, and accessibility props.
 * It is designed to work on both iOS and Android.
 * 
 * @module PhoneInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { PhoneInput, PhoneInputConfig, PhoneInputProps, CountryCode, PhoneInputLabelConfig, PhoneInputValidationConfig, PhoneInputFormatConfig, PhoneInputAnimationConfig } from '../../components/inputs/PhoneInput'; // Adjust path if necessary
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const PhoneInputScreen: React.FC = () => {
  const [valueExample, setValueExample] = useState('');
  const [countryCodeExample, setCountryCodeExample] = useState('+1');

  const handleValueChange = (value: string, countryCode: string, formattedValue: string) => {
    setValueExample(value);
    Alert.alert('Value Changed', `Value: ${value}, Country: ${countryCode}, Formatted: ${formattedValue}`);
  };

  const handleCountryChange = (country: CountryCode) => {
    setCountryCodeExample(country.code);
    Alert.alert('Country Changed', `Selected: ${country.name} (${country.code})`);
  };

  const handleValidation = (isValid: boolean, message: string) => {
    Alert.alert('Validation', `Valid: ${isValid}, Message: ${message}`);
  };

  const handleSubmit = (value: string, countryCode: string) => {
    Alert.alert('Submitted', `Value: ${value}, Country: ${countryCode}`);
  };

  // Custom country codes for demo
  const customCountryCodes: CountryCode[] = [
    { code: '+1', name: 'USA', flag: '🇺🇸', iso: 'US', length: 10, format: '(XXX) XXX-XXXX' },
    { code: '+44', name: 'UK', flag: '🇬🇧', iso: 'GB', length: 10, format: 'XXXX XXX XXXX' },
  ];

  // Label config example
  const labelConfig: PhoneInputLabelConfig = { text: 'Custom Label', position: 'top', required: true, requiredColor: 'red' };

  // Validation config example
  const validationConfig: PhoneInputValidationConfig = {
    validate: (val, code) => val.length === 10 || 'Must be 10 digits',
    realTime: true,
    debounceMs: 300,
    message: 'Custom message',
  };

  // Formatting config example
  const formattingConfig: PhoneInputFormatConfig = { enabled: true, pattern: '(XXX) XXX-XXXX', mask: 'X', stripFormatting: false };

  // Animation config example
  const animationConfig: PhoneInputAnimationConfig = { focusAnimation: true, duration: 300, borderGlow: true, labelFloat: true };

  return (
    <ScrollView contentContainerClassName="p-5 items-center">
      <ScreenHeading title="PhoneInput Demo" />
      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Sizes</Text>
      
      <PhoneInput size="small" value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput size="medium" value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput size="large" value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Variants</Text>
      
      <PhoneInput variant="default" value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput variant="outlined" value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput variant="filled" value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput variant="ghost" value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Validation States</Text>
      
      <PhoneInput validationState="default" value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput validationState="error" value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput validationState="success" value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput validationState="warning" value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">States</Text>
      
      <PhoneInput disabled value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput readOnly value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput required value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Custom Country Codes</Text>
      
      <PhoneInput countryCodes={customCountryCodes} value={valueExample} onValueChange={handleValueChange} onCountryChange={handleCountryChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Configurations</Text>
      
      <PhoneInput config={{ label: labelConfig }} value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput config={{ validation: validationConfig }} value={valueExample} onValueChange={handleValueChange} onValidation={handleValidation} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput config={{ formatting: formattingConfig }} value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />
      
      <PhoneInput config={{ animation: animationConfig }} value={valueExample} onValueChange={handleValueChange} style={{ marginBottom: 10, width: '100%' }} />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Event Handlers</Text>
      
      <PhoneInput
        onFocus={() => Alert.alert('Focused')}
        onBlur={() => Alert.alert('Blurred')}
        onSubmit={handleSubmit}
        value={valueExample}
        onValueChange={handleValueChange}
        onCountryChange={handleCountryChange}
        onValidation={handleValidation}
        style={{ marginBottom: 10, width: '100%' }}
      />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Custom Styles</Text>
      
      <PhoneInput
        style={{ borderWidth: 2, borderColor: 'red', marginBottom: 10, width: '100%' }}
        inputStyle={{ color: 'blue' }}
        containerStyle={{ backgroundColor: 'lightgray' }}
        value={valueExample}
        onValueChange={handleValueChange}
      />

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Accessibility Props</Text>
      
      <PhoneInput
        config={{ accessibility: { accessibilityLabel: 'Accessible Phone Input', accessibilityHint: 'Enter your phone number' } }}
        value={valueExample}
        onValueChange={handleValueChange}
        style={{ marginBottom: 10, width: '100%' }}
      />
      <NextButton nextScreen="CodeInputScreen" label="Next" />
    </ScrollView>
  );
};

export default PhoneInputScreen;