import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
import ControlBase, { ControlBaseRef, ControlBaseSize, ControlBaseState, ControlBaseInteractionMode, ControlBaseAnimation } from '../ControlBase';

/**
 * ControlBase Test Component
 * 
 * Tests all ControlBase features:
 * - Size variants (small, medium, large)
 * - State management (default, active, focused, disabled, loading)
 * - Interaction modes (press, toggle, drag, select, adjust)
 * - Animation presets (none, subtle, bouncy, smooth, orbital)
 * - Accessibility features
 * - Custom styling
 * - Ref methods
 */
const ControlBaseTest: React.FC = () => {
  const controlRef = useRef<ControlBaseRef>(null);
  const [currentSize, setCurrentSize] = useState<ControlBaseSize>('medium');
  const [currentState, setCurrentState] = useState<ControlBaseState>('default');
  const [currentInteractionMode, setCurrentInteractionMode] = useState<ControlBaseInteractionMode>('press');
  const [currentAnimation, setCurrentAnimation] = useState<ControlBaseAnimation>('smooth');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [enableGlow, setEnableGlow] = useState(false);
  const [enableOrbital, setEnableOrbital] = useState(false);
  const [enableRipple, setEnableRipple] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const handlePress = () => {
    Alert.alert('Control Pressed', 'ControlBase press event triggered');
  };

  const handlePressIn = () => {
    console.log('Control press in');
  };

  const handlePressOut = () => {
    console.log('Control press out');
  };

  const handleFocus = () => {
    setIsFocused(true);
    console.log('Control focused');
  };

  const handleBlur = () => {
    setIsFocused(false);
    console.log('Control blurred');
  };

  const handleLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    console.log('Control layout:', { width, height });
  };

  const handleRefFocus = () => {
    controlRef.current?.focus();
  };

  const handleRefBlur = () => {
    controlRef.current?.blur();
  };

  const handleRefAnimate = () => {
    controlRef.current?.animate(1.2, 300);
    setTimeout(() => {
      controlRef.current?.animate(1, 300);
    }, 500);
  };

  const handleRefMeasure = async () => {
    const dimensions = await controlRef.current?.measure();
    Alert.alert('Control Dimensions', JSON.stringify(dimensions, null, 2));
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

  const renderSizeButton = (size: ControlBaseSize) => (
    <Text
      key={size}
      style={[
        styles.optionButton,
        currentSize === size && styles.activeOptionButton,
      ]}
      onPress={() => setCurrentSize(size)}
    >
      {size.charAt(0).toUpperCase() + size.slice(1)}
    </Text>
  );

  const renderStateButton = (state: ControlBaseState) => (
    <Text
      key={state}
      style={[
        styles.optionButton,
        currentState === state && styles.activeOptionButton,
      ]}
      onPress={() => setCurrentState(state)}
    >
      {state.charAt(0).toUpperCase() + state.slice(1)}
    </Text>
  );

  const renderInteractionModeButton = (mode: ControlBaseInteractionMode) => (
    <Text
      key={mode}
      style={[
        styles.optionButton,
        currentInteractionMode === mode && styles.activeOptionButton,
      ]}
      onPress={() => setCurrentInteractionMode(mode)}
    >
      {mode.charAt(0).toUpperCase() + mode.slice(1)}
    </Text>
  );

  const renderAnimationButton = (animation: ControlBaseAnimation) => (
    <Text
      key={animation}
      style={[
        styles.optionButton,
        currentAnimation === animation && styles.activeOptionButton,
      ]}
      onPress={() => setCurrentAnimation(animation)}
    >
      {animation.charAt(0).toUpperCase() + animation.slice(1)}
    </Text>
  );

  const renderRefButton = (label: string, onPress: () => void) => (
    <Text
      style={styles.refButton}
      onPress={onPress}
    >
      {label}
    </Text>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>ControlBase Component Test</Text>
      
      {renderTestSection('Size Variants', (
        <View style={styles.optionsContainer}>
          {(['small', 'medium', 'large'] as ControlBaseSize[]).map(renderSizeButton)}
        </View>
      ))}

      {renderTestSection('State Management', (
        <View style={styles.optionsContainer}>
          {(['default', 'active', 'focused', 'disabled', 'loading'] as ControlBaseState[]).map(renderStateButton)}
        </View>
      ))}

      {renderTestSection('Interaction Modes', (
        <View style={styles.optionsContainer}>
          {(['press', 'toggle', 'drag', 'select', 'adjust'] as ControlBaseInteractionMode[]).map(renderInteractionModeButton)}
        </View>
      ))}

      {renderTestSection('Animation Presets', (
        <View style={styles.optionsContainer}>
          {(['none', 'subtle', 'bouncy', 'smooth', 'orbital'] as ControlBaseAnimation[]).map(renderAnimationButton)}
        </View>
      ))}

      {renderTestSection('State Controls', (
        <View style={styles.stateControlsContainer}>
          {renderToggleButton('Disabled', isDisabled, () => setIsDisabled(!isDisabled))}
          {renderToggleButton('Loading', isLoading, handleLoadingToggle)}
          {renderToggleButton('Focused', isFocused, () => setIsFocused(!isFocused))}
          {renderToggleButton('Active', isActive, () => setIsActive(!isActive))}
          {renderToggleButton('Read Only', isReadOnly, () => setIsReadOnly(!isReadOnly))}
        </View>
      ))}

      {renderTestSection('Effects', (
        <View style={styles.effectsContainer}>
          {renderToggleButton('Glow Effect', enableGlow, () => setEnableGlow(!enableGlow))}
          {renderToggleButton('Orbital Animation', enableOrbital, () => setEnableOrbital(!enableOrbital))}
          {renderToggleButton('Ripple Effect', enableRipple, () => setEnableRipple(!enableRipple))}
          {renderToggleButton('Haptic Feedback', hapticFeedback, () => setHapticFeedback(!hapticFeedback))}
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

      {renderTestSection('ControlBase Component', (
        <View style={styles.controlContainer}>
          <ControlBase
            ref={controlRef}
            size={currentSize}
            state={currentState}
            interactionMode={currentInteractionMode}
            animation={currentAnimation}
            disabled={isDisabled}
            loading={isLoading}
            focused={isFocused}
            active={isActive}
            readOnly={isReadOnly}
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onLayout={handleLayout}
            hapticFeedback={hapticFeedback}
            enableGlow={enableGlow}
            enableOrbital={enableOrbital}
            enableRipple={enableRipple}
            glowColor="#2E86DE"
            borderRadius={16}
            borderWidth={1}
            borderColor="rgba(255, 255, 255, 0.2)"
            backgroundColor="rgba(22, 33, 62, 0.5)"
            testID="control-base-test"
            accessibilityLabel="Test control base component"
            accessibilityHint="Interactive control for testing all features"
          >
            <Text style={styles.controlText}>Test Control</Text>
          </ControlBase>
        </View>
      ))}

      {renderTestSection('Multiple Controls Demo', (
        <View style={styles.multipleControlsContainer}>
          <ControlBase
            size="small"
            state="default"
            interactionMode="press"
            animation="bouncy"
            enableGlow
            onPress={() => Alert.alert('Small Control', 'Small control pressed')}
          >
            <Text style={styles.smallControlText}>Small</Text>
          </ControlBase>
          
          <ControlBase
            size="medium"
            state="active"
            interactionMode="toggle"
            animation="smooth"
            enableRipple
            onPress={() => Alert.alert('Medium Control', 'Medium control pressed')}
          >
            <Text style={styles.mediumControlText}>Medium</Text>
          </ControlBase>
          
          <ControlBase
            size="large"
            state="focused"
            interactionMode="select"
            animation="orbital"
            enableOrbital
            onPress={() => Alert.alert('Large Control', 'Large control pressed')}
          >
            <Text style={styles.largeControlText}>Large</Text>
          </ControlBase>
        </View>
      ))}

      {renderTestSection('Accessibility Features', (
        <View style={styles.accessibilityContainer}>
          <Text style={styles.accessibilityText}>
            ✓ Keyboard navigation support{'\n'}
            ✓ Screen reader compatibility{'\n'}
            ✓ Focus management{'\n'}
            ✓ Accessibility state management{'\n'}
            ✓ Haptic feedback integration{'\n'}
            ✓ Voice control support{'\n'}
            ✓ Custom accessibility labels{'\n'}
            ✓ Proper accessibility roles{'\n'}
            ✓ State announcements{'\n'}
            ✓ Touch accessibility
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
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    overflow: 'hidden',
  },
  
  activeOptionButton: {
    backgroundColor: '#2E86DE',
  },
  
  stateControlsContainer: {
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
  
  effectsContainer: {
    gap: 12,
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
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.5)',
    overflow: 'hidden',
  },
  
  controlContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  
  controlText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  
  multipleControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  
  smallControlText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  
  mediumControlText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  
  largeControlText: {
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

export default ControlBaseTest;
