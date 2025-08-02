import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Text,
} from 'react-native';
import Label, { LabelRef, LabelSize, LabelWeight, LabelAlign, LabelColor, LabelAnimation, LabelVariant } from '../Label';

/**
 * Corp Astro Label Component Test
 * 
 * This component provides comprehensive testing for the Label component,
 * demonstrating all features, variants, and interactions.
 */
const LabelTest: React.FC = () => {
  const [variant, setVariant] = useState<LabelVariant>('default');
  const [size, setSize] = useState<LabelSize>('medium');
  const [weight, setWeight] = useState<LabelWeight>('medium');
  const [align, setAlign] = useState<LabelAlign>('left');
  const [color, setColor] = useState<LabelColor>('primary');
  const [animation, setAnimation] = useState<LabelAnimation>('none');
  const [animated, setAnimated] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [enableGlow, setEnableGlow] = useState(false);
  const [truncate, setTruncate] = useState(false);
  const [required, setRequired] = useState(false);
  const [optional, setOptional] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [focused, setFocused] = useState(false);
  
  const labelRef = useRef<LabelRef>(null);

  const variants: LabelVariant[] = ['default', 'floating', 'inline', 'required', 'optional'];
  const sizes: LabelSize[] = ['small', 'medium', 'large'];
  const weights: LabelWeight[] = ['light', 'regular', 'medium', 'semibold', 'bold'];
  const alignments: LabelAlign[] = ['left', 'center', 'right', 'justify'];
  const colors: LabelColor[] = ['primary', 'secondary', 'accent', 'muted', 'inverse', 'error', 'warning', 'success'];
  const animations: LabelAnimation[] = ['none', 'fade', 'slide', 'scale', 'glow', 'shimmer'];

  const handleAnimate = () => {
    labelRef.current?.animate(1, 500);
  };

  const handleMeasure = async () => {
    try {
      const measurements = await labelRef.current?.measure();
      console.log('Label measurements:', measurements);
    } catch (error) {
      console.error('Error measuring label:', error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Corp Astro Label Test</Text>
        <Text style={styles.subtitle}>Comprehensive testing for the Label component</Text>
      </View>

      {/* Interactive Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Controls</Text>
        
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Variant:</Text>
          <View style={styles.buttonRow}>
            {variants.map((v) => (
              <TouchableOpacity
                key={v}
                style={[styles.button, variant === v && styles.activeButton]}
                onPress={() => setVariant(v)}
              >
                <Text style={[styles.buttonText, variant === v && styles.activeButtonText]}>
                  {v}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Size:</Text>
          <View style={styles.buttonRow}>
            {sizes.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.button, size === s && styles.activeButton]}
                onPress={() => setSize(s)}
              >
                <Text style={[styles.buttonText, size === s && styles.activeButtonText]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Weight:</Text>
          <View style={styles.buttonRow}>
            {weights.map((w) => (
              <TouchableOpacity
                key={w}
                style={[styles.button, weight === w && styles.activeButton]}
                onPress={() => setWeight(w)}
              >
                <Text style={[styles.buttonText, weight === w && styles.activeButtonText]}>
                  {w}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Alignment:</Text>
          <View style={styles.buttonRow}>
            {alignments.map((a) => (
              <TouchableOpacity
                key={a}
                style={[styles.button, align === a && styles.activeButton]}
                onPress={() => setAlign(a)}
              >
                <Text style={[styles.buttonText, align === a && styles.activeButtonText]}>
                  {a}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Color:</Text>
          <View style={styles.buttonRow}>
            {colors.map((c) => (
              <TouchableOpacity
                key={c}
                style={[styles.button, color === c && styles.activeButton]}
                onPress={() => setColor(c)}
              >
                <Text style={[styles.buttonText, color === c && styles.activeButtonText]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Animation:</Text>
          <View style={styles.buttonRow}>
            {animations.map((a) => (
              <TouchableOpacity
                key={a}
                style={[styles.button, animation === a && styles.activeButton]}
                onPress={() => setAnimation(a)}
              >
                <Text style={[styles.buttonText, animation === a && styles.activeButtonText]}>
                  {a}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.controlGroup}>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Animated:</Text>
            <Switch value={animated} onValueChange={setAnimated} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Uppercase:</Text>
            <Switch value={uppercase} onValueChange={setUppercase} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Glow Effect:</Text>
            <Switch value={enableGlow} onValueChange={setEnableGlow} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Truncate:</Text>
            <Switch value={truncate} onValueChange={setTruncate} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Required:</Text>
            <Switch value={required} onValueChange={setRequired} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Optional:</Text>
            <Switch value={optional} onValueChange={setOptional} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Disabled:</Text>
            <Switch value={disabled} onValueChange={setDisabled} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Error:</Text>
            <Switch value={error} onValueChange={setError} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Warning:</Text>
            <Switch value={warning} onValueChange={setWarning} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Focused:</Text>
            <Switch value={focused} onValueChange={setFocused} />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAnimate}>
            <Text style={styles.actionButtonText}>Animate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleMeasure}>
            <Text style={styles.actionButtonText}>Measure</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Live Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Preview</Text>
        <View style={styles.previewContainer}>
          <Label
            ref={labelRef}
            variant={variant}
            size={size}
            weight={weight}
            align={align}
            color={color}
            animation={animation}
            animated={animated}
            uppercase={uppercase}
            enableGlow={enableGlow}
            truncate={truncate}
            required={required}
            optional={optional}
            disabled={disabled}
            error={error}
            warning={warning}
            focused={focused}
            testID="interactive-label"
          >
            {truncate ? 'This is a very long label that should be truncated when the truncate prop is enabled' : 'Interactive Label'}
          </Label>
        </View>
      </View>

      {/* Variant Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Label Variants</Text>
        <View style={styles.showcase}>
          {variants.map((variant) => (
            <View key={variant} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{variant}</Text>
              <Label variant={variant} testID={`variant-${variant}`}>
                {variant} Label
              </Label>
            </View>
          ))}
        </View>
      </View>

      {/* Size Variants Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        <View style={styles.showcase}>
          {sizes.map((size) => (
            <View key={size} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{size}</Text>
              <Label size={size} testID={`size-${size}`}>
                {size} Size Label
              </Label>
            </View>
          ))}
        </View>
      </View>

      {/* Weight Variants Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weight Variants</Text>
        <View style={styles.showcase}>
          {weights.map((weight) => (
            <View key={weight} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{weight}</Text>
              <Label weight={weight} testID={`weight-${weight}`}>
                {weight} Weight Label
              </Label>
            </View>
          ))}
        </View>
      </View>

      {/* Color Variants Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Variants</Text>
        <View style={styles.showcase}>
          {colors.map((color) => (
            <View key={color} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{color}</Text>
              <Label color={color} testID={`color-${color}`}>
                {color} Color Label
              </Label>
            </View>
          ))}
        </View>
      </View>

      {/* Animation Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation Showcase</Text>
        <View style={styles.showcase}>
          {animations.filter(a => a !== 'none').map((animation) => (
            <View key={animation} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{animation}</Text>
              <Label 
                animation={animation} 
                animated={true} 
                animationLoop={true}
                testID={`animation-${animation}`}
              >
                {animation} Animation Label
              </Label>
            </View>
          ))}
        </View>
      </View>

      {/* State Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>State Showcase</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Required</Text>
            <Label required={true} testID="required-label">
              Required Field
            </Label>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Optional</Text>
            <Label optional={true} testID="optional-label">
              Optional Field
            </Label>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Disabled</Text>
            <Label disabled={true} testID="disabled-label">
              Disabled Field
            </Label>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Error</Text>
            <Label error={true} testID="error-label">
              Error Field
            </Label>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Warning</Text>
            <Label warning={true} testID="warning-label">
              Warning Field
            </Label>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Focused</Text>
            <Label focused={true} testID="focused-label">
              Focused Field
            </Label>
          </View>
        </View>
      </View>

      {/* Alignment Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alignment Showcase</Text>
        <View style={styles.showcase}>
          {alignments.map((align) => (
            <View key={align} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{align}</Text>
              <Label align={align} testID={`align-${align}`}>
                {align} Aligned Label
              </Label>
            </View>
          ))}
        </View>
      </View>

      {/* Special Effects Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Effects</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Glow Effect</Text>
            <Label enableGlow={true} glowColor="#2E86DE" testID="glow-label">
              Glowing Label
            </Label>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Text Shadow</Text>
            <Label 
              textShadow={{
                color: 'rgba(46, 134, 222, 0.3)',
                offset: { width: 1, height: 1 },
                radius: 2
              }}
              testID="shadow-label"
            >
              Shadow Label
            </Label>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Uppercase</Text>
            <Label uppercase={true} testID="uppercase-label">
              Uppercase Label
            </Label>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Capitalize</Text>
            <Label capitalize={true} testID="capitalize-label">
              capitalize label
            </Label>
          </View>
        </View>
      </View>

      {/* Form Field Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Form Field Examples</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Input with Required Label</Text>
            <Label variant="default" required={true} testID="form-required-label">
              Email Address
            </Label>
            <View style={styles.mockInput}>
              <Text style={styles.mockInputText}>john@example.com</Text>
            </View>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Input with Optional Label</Text>
            <Label variant="default" optional={true} testID="form-optional-label">
              Phone Number
            </Label>
            <View style={styles.mockInput}>
              <Text style={styles.mockInputText}>+1 (555) 123-4567</Text>
            </View>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Floating Label</Text>
            <Label variant="floating" focused={true} testID="form-floating-label">
              Password
            </Label>
            <View style={styles.mockInput}>
              <Text style={styles.mockInputText}>••••••••</Text>
            </View>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Inline Label</Text>
            <View style={styles.inlineContainer}>
              <Label variant="inline" testID="form-inline-label">
                Remember me
              </Label>
              <View style={styles.mockCheckbox} />
            </View>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Error State</Text>
            <Label error={true} required={true} testID="form-error-label">
              Username
            </Label>
            <View style={[styles.mockInput, styles.mockInputError]}>
              <Text style={styles.mockInputText}>invalid-username</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Custom Styling Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Color</Text>
            <Label customColor="#FF6B6B" testID="custom-color-label">
              Custom Color Label
            </Label>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Size</Text>
            <Label customSize={18} testID="custom-size-label">
              Custom Size Label
            </Label>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Indicators</Text>
            <Label 
              required={true} 
              requiredIndicator=" •" 
              testID="custom-indicator-label"
            >
              Custom Required Indicator
            </Label>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Style</Text>
            <Label 
              style={{ 
                fontStyle: 'italic',
                textDecorationLine: 'underline',
                textDecorationColor: '#2E86DE'
              }}
              testID="custom-style-label"
            >
              Custom Style Label
            </Label>
          </View>
        </View>
      </View>

      {/* Performance Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Test</Text>
        <View style={styles.performanceTest}>
          {Array.from({ length: 20 }, (_, index) => (
            <Label 
              key={index} 
              variant={variants[index % variants.length]}
              animation="fade"
              animated={true}
              testID={`performance-${index}`}
            >
              Performance Label {index + 1}
            </Label>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Corp Astro Label Component Test Complete
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08080F',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#B8B8C0',
    textAlign: 'center',
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  controlGroup: {
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 14,
    color: '#B8B8C0',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeButton: {
    backgroundColor: '#2E86DE',
    borderColor: '#2E86DE',
  },
  buttonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2E86DE',
    marginTop: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  previewContainer: {
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  showcase: {
    gap: 16,
  },
  showcaseItem: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  showcaseLabel: {
    fontSize: 12,
    color: '#B8B8C0',
    marginBottom: 8,
    fontWeight: '500',
  },
  mockInput: {
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginTop: 4,
  },
  mockInputError: {
    borderColor: '#DC3545',
  },
  mockInputText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mockCheckbox: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  performanceTest: {
    gap: 4,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
  },
});

export default LabelTest;
