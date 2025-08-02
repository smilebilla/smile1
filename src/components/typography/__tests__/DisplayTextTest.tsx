import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Switch, TouchableOpacity } from 'react-native';
import DisplayText, { DisplayTextRef, DisplayTextSize, DisplayTextWeight, DisplayTextAlign, DisplayTextColor, DisplayTextAnimation } from '../DisplayText';

/**
 * DisplayText Test Component
 * 
 * Tests all DisplayText features:
 * - Size variants (small, medium, large, xlarge, xxlarge)
 * - Weight variants (light, regular, medium, semibold, bold)
 * - Color variants (primary, secondary, accent, muted, inverse, error, warning, success)
 * - Animation types (none, fade, slide, scale, glow, shimmer)
 * - Text transformations and effects
 * - Accessibility features
 * - Ref methods
 */
const DisplayTextTest: React.FC = () => {
  const displayTextRef = useRef<DisplayTextRef>(null);
  const [currentSize, setCurrentSize] = useState<DisplayTextSize>('medium');
  const [currentWeight, setCurrentWeight] = useState<DisplayTextWeight>('regular');
  const [currentAlign, setCurrentAlign] = useState<DisplayTextAlign>('center');
  const [currentColor, setCurrentColor] = useState<DisplayTextColor>('primary');
  const [currentAnimation, setCurrentAnimation] = useState<DisplayTextAnimation>('none');
  const [isAnimated, setIsAnimated] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  const [isCapitalize, setIsCapitalize] = useState(false);
  const [isTruncate, setIsTruncate] = useState(false);
  const [isSelectable, setIsSelectable] = useState(false);
  const [enableGlow, setEnableGlow] = useState(false);
  const [animationLoop, setAnimationLoop] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>(undefined);

  const testText = "Welcome to Corp Astro Universe";

  const handleRefFocus = () => {
    displayTextRef.current?.focus();
  };

  const handleRefBlur = () => {
    displayTextRef.current?.blur();
  };

  const handleRefAnimate = () => {
    displayTextRef.current?.animate(1.2, 500);
    setTimeout(() => {
      displayTextRef.current?.animate(1, 500);
    }, 1000);
  };

  const handleRefMeasure = async () => {
    const dimensions = await displayTextRef.current?.measure();
    Alert.alert('Text Dimensions', JSON.stringify(dimensions, null, 2));
  };

  const handleAnimationToggle = () => {
    setIsAnimated(!isAnimated);
  };

  const renderTestSection = (title: string, children: React.ReactNode) => (
    <View style={styles.testSection}>
      <DisplayText size="small" weight="semibold" color="secondary" style={styles.sectionTitle}>
        {title}
      </DisplayText>
      {children}
    </View>
  );

  const renderToggleButton = (
    label: string,
    value: boolean,
    onToggle: () => void
  ) => (
    <View style={styles.toggleContainer}>
      <DisplayText size="small" weight="regular" color="primary" style={styles.toggleLabel}>
        {label}
      </DisplayText>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: '#2E86DE' }}
        thumbColor={value ? '#FFFFFF' : '#f4f3f4'}
      />
    </View>
  );

  const renderOptionButton = (
    label: string,
    isActive: boolean,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        isActive && styles.activeOptionButton,
      ]}
      onPress={onPress}
    >
      <DisplayText
        size="small"
        weight="medium"
        color={isActive ? 'inverse' : 'primary'}
        style={styles.optionButtonText}
      >
        {label}
      </DisplayText>
    </TouchableOpacity>
  );

  const renderRefButton = (label: string, onPress: () => void) => (
    <TouchableOpacity style={styles.refButton} onPress={onPress}>
      <DisplayText size="small" weight="medium" color="primary" style={styles.refButtonText}>
        {label}
      </DisplayText>
    </TouchableOpacity>
  );

  const renderNumberOfLinesButton = (lines: number | undefined, label: string) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        numberOfLines === lines && styles.activeOptionButton,
      ]}
      onPress={() => setNumberOfLines(lines)}
    >
      <DisplayText
        size="small"
        weight="medium"
        color={numberOfLines === lines ? 'inverse' : 'primary'}
        style={styles.optionButtonText}
      >
        {label}
      </DisplayText>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <DisplayText
        size="large"
        weight="bold"
        color="primary"
        align="center"
        animation="glow"
        animated={true}
        enableGlow
        style={styles.title}
      >
        DisplayText Component Test
      </DisplayText>
      
      {renderTestSection('Size Variants', (
        <View style={styles.optionsContainer}>
          {(['small', 'medium', 'large', 'xlarge', 'xxlarge'] as DisplayTextSize[]).map(size => 
            renderOptionButton(
              size.charAt(0).toUpperCase() + size.slice(1),
              currentSize === size,
              () => setCurrentSize(size)
            )
          )}
        </View>
      ))}

      {renderTestSection('Weight Variants', (
        <View style={styles.optionsContainer}>
          {(['light', 'regular', 'medium', 'semibold', 'bold'] as DisplayTextWeight[]).map(weight => 
            renderOptionButton(
              weight.charAt(0).toUpperCase() + weight.slice(1),
              currentWeight === weight,
              () => setCurrentWeight(weight)
            )
          )}
        </View>
      ))}

      {renderTestSection('Text Alignment', (
        <View style={styles.optionsContainer}>
          {(['left', 'center', 'right'] as DisplayTextAlign[]).map(align => 
            renderOptionButton(
              align.charAt(0).toUpperCase() + align.slice(1),
              currentAlign === align,
              () => setCurrentAlign(align)
            )
          )}
        </View>
      ))}

      {renderTestSection('Color Variants', (
        <View style={styles.optionsContainer}>
          {(['primary', 'secondary', 'accent', 'muted', 'error', 'warning', 'success'] as DisplayTextColor[]).map(color => 
            renderOptionButton(
              color.charAt(0).toUpperCase() + color.slice(1),
              currentColor === color,
              () => setCurrentColor(color)
            )
          )}
        </View>
      ))}

      {renderTestSection('Animation Types', (
        <View style={styles.optionsContainer}>
          {(['none', 'fade', 'slide', 'scale', 'glow', 'shimmer'] as DisplayTextAnimation[]).map(animation => 
            renderOptionButton(
              animation.charAt(0).toUpperCase() + animation.slice(1),
              currentAnimation === animation,
              () => setCurrentAnimation(animation)
            )
          )}
        </View>
      ))}

      {renderTestSection('Text Options', (
        <View style={styles.textOptionsContainer}>
          {renderToggleButton('Animated', isAnimated, handleAnimationToggle)}
          {renderToggleButton('Uppercase', isUppercase, () => setIsUppercase(!isUppercase))}
          {renderToggleButton('Lowercase', isLowercase, () => setIsLowercase(!isLowercase))}
          {renderToggleButton('Capitalize', isCapitalize, () => setIsCapitalize(!isCapitalize))}
          {renderToggleButton('Truncate', isTruncate, () => setIsTruncate(!isTruncate))}
          {renderToggleButton('Selectable', isSelectable, () => setIsSelectable(!isSelectable))}
          {renderToggleButton('Enable Glow', enableGlow, () => setEnableGlow(!enableGlow))}
          {renderToggleButton('Animation Loop', animationLoop, () => setAnimationLoop(!animationLoop))}
        </View>
      ))}

      {renderTestSection('Number of Lines', (
        <View style={styles.optionsContainer}>
          {renderNumberOfLinesButton(undefined, 'Unlimited')}
          {renderNumberOfLinesButton(1, '1 Line')}
          {renderNumberOfLinesButton(2, '2 Lines')}
          {renderNumberOfLinesButton(3, '3 Lines')}
        </View>
      ))}

      {renderTestSection('Ref Methods', (
        <View style={styles.refMethodsContainer}>
          {renderRefButton('Focus', handleRefFocus)}
          {renderRefButton('Blur', handleRefBlur)}
          {renderRefButton('Animate', handleRefAnimate)}
          {renderRefButton('Measure', handleRefMeasure)}
        </View>
      ))}

      {renderTestSection('DisplayText Component', (
        <View style={styles.displayTextContainer}>
          <DisplayText
            ref={displayTextRef}
            size={currentSize}
            weight={currentWeight}
            align={currentAlign}
            color={currentColor}
            animation={currentAnimation}
            animated={isAnimated}
            uppercase={isUppercase}
            lowercase={isLowercase}
            capitalize={isCapitalize}
            truncate={isTruncate}
            numberOfLines={numberOfLines}
            selectable={isSelectable}
            enableGlow={enableGlow}
            glowColor="#2E86DE"
            glowIntensity={0.8}
            animationDuration={1500}
            animationLoop={animationLoop}
            textShadow={{
              color: 'rgba(0, 0, 0, 0.5)',
              offset: { width: 0, height: 2 },
              radius: 4,
            }}
            testID="display-text-test"
          >
            {testText}
          </DisplayText>
        </View>
      ))}

      {renderTestSection('Size Showcase', (
        <View style={styles.showcaseContainer}>
          <DisplayText size="small" weight="regular" color="primary" align="center">
            Small Display Text
          </DisplayText>
          <DisplayText size="medium" weight="medium" color="accent" align="center">
            Medium Display Text
          </DisplayText>
          <DisplayText size="large" weight="semibold" color="secondary" align="center">
            Large Display Text
          </DisplayText>
          <DisplayText size="xlarge" weight="bold" color="warning" align="center">
            XLarge Display Text
          </DisplayText>
          <DisplayText size="xxlarge" weight="bold" color="success" align="center">
            XXLarge Display Text
          </DisplayText>
        </View>
      ))}

      {renderTestSection('Animation Showcase', (
        <View style={styles.showcaseContainer}>
          <DisplayText
            size="medium"
            weight="medium"
            color="primary"
            animation="fade"
            animated={true}
            animationDuration={2000}
            animationLoop={true}
            align="center"
          >
            Fade Animation
          </DisplayText>
          <DisplayText
            size="medium"
            weight="medium"
            color="accent"
            animation="slide"
            animated={true}
            animationDuration={1500}
            animationLoop={true}
            align="center"
          >
            Slide Animation
          </DisplayText>
          <DisplayText
            size="medium"
            weight="medium"
            color="warning"
            animation="scale"
            animated={true}
            animationDuration={1000}
            animationLoop={true}
            align="center"
          >
            Scale Animation
          </DisplayText>
          <DisplayText
            size="medium"
            weight="medium"
            color="success"
            animation="glow"
            animated={true}
            enableGlow={true}
            animationDuration={2000}
            animationLoop={true}
            align="center"
          >
            Glow Animation
          </DisplayText>
        </View>
      ))}

      {renderTestSection('Accessibility Features', (
        <View style={styles.accessibilityContainer}>
          <DisplayText size="small" weight="regular" color="muted" style={styles.accessibilityText}>
            ✓ Screen reader compatibility{'\n'}
            ✓ Selectable text support{'\n'}
            ✓ Adjustable font size{'\n'}
            ✓ High contrast support{'\n'}
            ✓ Focus management{'\n'}
            ✓ Text scaling support{'\n'}
            ✓ Proper text semantics{'\n'}
            ✓ Voice control support
          </DisplayText>
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
    marginBottom: 12,
  },
  
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  activeOptionButton: {
    backgroundColor: '#2E86DE',
    borderColor: '#2E86DE',
  },
  
  optionButtonText: {
    textAlign: 'center',
  },
  
  textOptionsContainer: {
    gap: 12,
  },
  
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  
  toggleLabel: {
    flex: 1,
  },
  
  refMethodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  refButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(46, 134, 222, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.5)',
  },
  
  refButtonText: {
    textAlign: 'center',
  },
  
  displayTextContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    minHeight: 120,
    justifyContent: 'center',
  },
  
  showcaseContainer: {
    alignItems: 'center',
    gap: 16,
  },
  
  accessibilityContainer: {
    padding: 12,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.3)',
  },
  
  accessibilityText: {
    lineHeight: 20,
  },
});

export default DisplayTextTest;
