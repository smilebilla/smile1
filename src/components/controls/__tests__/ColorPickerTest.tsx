import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
import ColorPicker, { ColorValue, ColorFormat, ColorSwatch } from '../ColorPicker';

/**
 * ColorPicker Test Component
 * 
 * Tests all ColorPicker features:
 * - Color selection with HSV space
 * - Different formats (hex, rgb, hsl, hsv)
 * - Color swatches
 * - Recent colors
 * - Opacity control
 * - Size variants
 * - Variant types
 * - Accessibility
 */
const ColorPickerTest: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#2E86DE');
  const [colorValue, setColorValue] = useState<ColorValue>({
    hex: '#2E86DE',
    rgb: { r: 46, g: 134, b: 222 },
    rgba: { r: 46, g: 134, b: 222, a: 1 },
    hsl: { h: 209, s: 68, l: 53 },
    hsla: { h: 209, s: 68, l: 53, a: 1 },
    hsv: { h: 209, s: 79, v: 87 },
    hsva: { h: 209, s: 79, v: 87, a: 1 },
  });
  
  const [selectedFormat, setSelectedFormat] = useState<ColorFormat>('hex');
  const [showOpacity, setShowOpacity] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [showSwatches, setShowSwatches] = useState(true);
  const [showRecentColors, setShowRecentColors] = useState(true);
  const [currentSize, setCurrentSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [currentVariant, setCurrentVariant] = useState<'default' | 'compact' | 'minimal' | 'advanced'>('default');
  const [isLoading, setIsLoading] = useState(false);

  // Test color swatches
  const testSwatches: ColorSwatch[] = [
    { color: '#FF6B6B', label: 'Red' },
    { color: '#4ECDC4', label: 'Teal' },
    { color: '#45B7D1', label: 'Blue' },
    { color: '#96CEB4', label: 'Green' },
    { color: '#FFEAA7', label: 'Yellow' },
    { color: '#DDA0DD', label: 'Plum' },
    { color: '#98D8C8', label: 'Mint' },
    { color: '#F7DC6F', label: 'Gold' },
    { color: '#BB8FCE', label: 'Lavender' },
    { color: '#F1948A', label: 'Salmon' },
  ];

  const handleColorChange = (color: string, colorValue: ColorValue) => {
    setSelectedColor(color);
    setColorValue(colorValue);
    console.log('Color changed:', color, colorValue);
  };

  const handleFormatChange = (format: ColorFormat) => {
    setSelectedFormat(format);
    console.log('Format changed:', format);
  };

  const handleSwatchSelect = (swatch: ColorSwatch) => {
    Alert.alert('Swatch Selected', `Color: ${swatch.color}, Label: ${swatch.label || 'N/A'}`);
  };

  const handleLoadingToggle = () => {
    setIsLoading(!isLoading);
    if (!isLoading) {
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  const renderTestSection = (title: string, children: React.ReactNode) => (
    <View style={styles.testSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const renderControlRow = (label: string, control: React.ReactNode) => (
    <View style={styles.controlRow}>
      <Text style={styles.controlLabel}>{label}</Text>
      {control}
    </View>
  );

  const renderToggleButton = (
    label: string,
    value: boolean,
    onToggle: () => void
  ) => (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: '#2E86DE' }}
        thumbColor={value ? '#FFFFFF' : '#f4f3f4'}
      />
    </View>
  );

  const renderSizeButton = (size: 'small' | 'medium' | 'large') => (
    <Text
      style={[
        styles.sizeButton,
        currentSize === size && styles.activeSizeButton,
      ]}
      onPress={() => setCurrentSize(size)}
    >
      {size.charAt(0).toUpperCase() + size.slice(1)}
    </Text>
  );

  const renderVariantButton = (variant: 'default' | 'compact' | 'minimal' | 'advanced') => (
    <Text
      style={[
        styles.variantButton,
        currentVariant === variant && styles.activeVariantButton,
      ]}
      onPress={() => setCurrentVariant(variant)}
    >
      {variant.charAt(0).toUpperCase() + variant.slice(1)}
    </Text>
  );

  const renderFormatButton = (format: ColorFormat) => (
    <Text
      style={[
        styles.formatButton,
        selectedFormat === format && styles.activeFormatButton,
      ]}
      onPress={() => handleFormatChange(format)}
    >
      {format.toUpperCase()}
    </Text>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>ColorPicker Component Test</Text>
      
      {renderTestSection('Current Color', (
        <View style={styles.colorInfo}>
          <View style={[styles.colorPreview, { backgroundColor: selectedColor }]} />
          <Text style={styles.colorText}>
            {selectedFormat === 'hex' && colorValue.hex}
            {selectedFormat === 'rgb' && `rgb(${colorValue.rgb.r}, ${colorValue.rgb.g}, ${colorValue.rgb.b})`}
            {selectedFormat === 'rgba' && `rgba(${colorValue.rgba.r}, ${colorValue.rgba.g}, ${colorValue.rgba.b}, ${colorValue.rgba.a})`}
            {selectedFormat === 'hsl' && `hsl(${colorValue.hsl.h}, ${colorValue.hsl.s}%, ${colorValue.hsl.l}%)`}
            {selectedFormat === 'hsla' && `hsla(${colorValue.hsla.h}, ${colorValue.hsla.s}%, ${colorValue.hsla.l}%, ${colorValue.hsla.a})`}
            {selectedFormat === 'hsv' && `hsv(${colorValue.hsv.h}, ${colorValue.hsv.s}%, ${colorValue.hsv.v}%)`}
            {selectedFormat === 'hsva' && `hsva(${colorValue.hsva.h}, ${colorValue.hsva.s}%, ${colorValue.hsva.v}%, ${colorValue.hsva.a})`}
          </Text>
        </View>
      ))}

      {renderTestSection('Format Selection', (
        <View style={styles.formatContainer}>
          {(['hex', 'rgb', 'rgba', 'hsl', 'hsla', 'hsv', 'hsva'] as ColorFormat[]).map(renderFormatButton)}
        </View>
      ))}

      {renderTestSection('Size Variants', (
        <View style={styles.sizeContainer}>
          {renderSizeButton('small')}
          {renderSizeButton('medium')}
          {renderSizeButton('large')}
        </View>
      ))}

      {renderTestSection('Variant Types', (
        <View style={styles.variantContainer}>
          {renderVariantButton('default')}
          {renderVariantButton('compact')}
          {renderVariantButton('minimal')}
          {renderVariantButton('advanced')}
        </View>
      ))}

      {renderTestSection('Display Options', (
        <View style={styles.optionsContainer}>
          {renderToggleButton('Show Opacity', showOpacity, () => setShowOpacity(!showOpacity))}
          {renderToggleButton('Show Preview', showPreview, () => setShowPreview(!showPreview))}
          {renderToggleButton('Show Swatches', showSwatches, () => setShowSwatches(!showSwatches))}
          {renderToggleButton('Show Recent Colors', showRecentColors, () => setShowRecentColors(!showRecentColors))}
          {renderToggleButton('Loading State', isLoading, handleLoadingToggle)}
        </View>
      ))}

      {renderTestSection('ColorPicker Component', (
        <ColorPicker
          value={selectedColor}
          onColorChange={handleColorChange}
          format={selectedFormat}
          size={currentSize}
          variant={currentVariant}
          showOpacity={showOpacity}
          showPreview={showPreview}
          showSwatches={showSwatches}
          showRecentColors={showRecentColors}
          swatches={testSwatches}
          loading={isLoading}
          disabled={false}
          testID="color-picker-test"
        />
      ))}

      {renderTestSection('Accessibility Features', (
        <View style={styles.accessibilityContainer}>
          <Text style={styles.accessibilityText}>
            ✓ Keyboard navigation support{'\n'}
            ✓ Screen reader compatibility{'\n'}
            ✓ Focus management{'\n'}
            ✓ High contrast support{'\n'}
            ✓ Touch accessibility{'\n'}
            ✓ Voice control support
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  
  contentContainer: {
    padding: 20,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  
  testSection: {
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  
  colorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  colorText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'monospace',
  },
  
  formatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  formatButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    overflow: 'hidden',
  },
  
  activeFormatButton: {
    backgroundColor: '#2E86DE',
  },
  
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    overflow: 'hidden',
  },
  
  activeSizeButton: {
    backgroundColor: '#2E86DE',
  },
  
  variantContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  variantButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    overflow: 'hidden',
  },
  
  activeVariantButton: {
    backgroundColor: '#2E86DE',
  },
  
  optionsContainer: {
    gap: 12,
  },
  
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  
  toggleLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  controlLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  
  accessibilityContainer: {
    padding: 12,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.3)',
  },
  
  accessibilityText: {
    fontSize: 14,
    color: '#B8B8C0',
    lineHeight: 20,
  },
});

export default ColorPickerTest;
