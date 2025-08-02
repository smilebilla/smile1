import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  AccessibilityInfo,
  AccessibilityProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';

/**
 * Control base size variants
 */
export type ControlBaseSize = 'small' | 'medium' | 'large';

/**
 * Control base state types
 */
export type ControlBaseState = 'default' | 'active' | 'focused' | 'disabled' | 'loading';

/**
 * Control base interaction modes
 */
export type ControlBaseInteractionMode = 'press' | 'toggle' | 'drag' | 'select' | 'adjust';

/**
 * Control base animation presets
 */
export type ControlBaseAnimation = 'none' | 'subtle' | 'bouncy' | 'smooth' | 'orbital';

/**
 * Control base component props
 */
export interface ControlBaseProps extends AccessibilityProps {
  /** Control size variant */
  size?: ControlBaseSize;
  /** Control current state */
  state?: ControlBaseState;
  /** Control interaction mode */
  interactionMode?: ControlBaseInteractionMode;
  /** Animation preset */
  animation?: ControlBaseAnimation;
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Whether the control is loading */
  loading?: boolean;
  /** Whether the control is focused */
  focused?: boolean;
  /** Whether the control is active */
  active?: boolean;
  /** Whether the control is read-only */
  readOnly?: boolean;
  /** Control press handler */
  onPress?: () => void;
  /** Control press in handler */
  onPressIn?: () => void;
  /** Control press out handler */
  onPressOut?: () => void;
  /** Control focus handler */
  onFocus?: () => void;
  /** Control blur handler */
  onBlur?: () => void;
  /** Control layout handler */
  onLayout?: (event: any) => void;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom content style */
  contentStyle?: ViewStyle;
  /** Custom overlay style */
  overlayStyle?: ViewStyle;
  /** Custom indicator style */
  indicatorStyle?: ViewStyle;
  /** Control children */
  children?: React.ReactNode;
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
  /** Control test ID */
  testID?: string;
  /** Custom touch props */
  touchProps?: Partial<TouchableOpacityProps>;
  /** Custom view props */
  viewProps?: Partial<ViewProps>;
  /** Enable glow effect */
  enableGlow?: boolean;
  /** Enable orbital animation */
  enableOrbital?: boolean;
  /** Enable ripple effect */
  enableRipple?: boolean;
  /** Custom glow color */
  glowColor?: string;
  /** Custom border radius */
  borderRadius?: number;
  /** Custom border width */
  borderWidth?: number;
  /** Custom border color */
  borderColor?: string;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom shadow configuration */
  shadow?: {
    color?: string;
    opacity?: number;
    radius?: number;
    elevation?: number;
  };
}

/**
 * Control base component ref
 */
export interface ControlBaseRef {
  /** Focus the control */
  focus: () => void;
  /** Blur the control */
  blur: () => void;
  /** Animate the control */
  animate: (toValue: number, duration?: number) => void;
  /** Get control dimensions */
  measure: () => Promise<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>;
}

/**
 * Size configuration for different control sizes
 */
const sizeConfigs = {
  small: {
    minHeight: 32,
    minWidth: 32,
    padding: 8,
    borderRadius: 8,
    fontSize: 12,
    iconSize: 16,
  },
  medium: {
    minHeight: 40,
    minWidth: 40,
    padding: 12,
    borderRadius: 12,
    fontSize: 14,
    iconSize: 20,
  },
  large: {
    minHeight: 48,
    minWidth: 48,
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    iconSize: 24,
  },
};

/**
 * Animation configuration for different animation types
 */
const animationConfigs = {
  none: {
    duration: 0,
    useNativeDriver: true,
  },
  subtle: {
    duration: 150,
    useNativeDriver: true,
  },
  bouncy: {
    duration: 300,
    useNativeDriver: true,
    tension: 100,
    friction: 8,
  },
  smooth: {
    duration: 250,
    useNativeDriver: true,
    tension: 80,
    friction: 10,
  },
  orbital: {
    duration: 2000,
    useNativeDriver: true,
    iterations: -1,
  },
};

/**
 * ControlBase Component
 * 
 * A foundational component that provides common functionality for all control components.
 * Features state management, animation, accessibility, and Corp Astro styling.
 * 
 * @component
 * @example
 * ```tsx
 * <ControlBase
 *   size="medium"
 *   state="active"
 *   interactionMode="press"
 *   animation="bouncy"
 *   onPress={() => console.log('Pressed')}
 *   enableGlow
 * >
 *   <Text>Control Content</Text>
 * </ControlBase>
 * ```
 */
const ControlBase = forwardRef<ControlBaseRef, ControlBaseProps>(({
  size = 'medium',
  state = 'default',
  interactionMode = 'press',
  animation = 'smooth',
  disabled = false,
  loading = false,
  focused = false,
  active = false,
  readOnly = false,
  onPress,
  onPressIn,
  onPressOut,
  onFocus,
  onBlur,
  onLayout,
  containerStyle,
  contentStyle,
  overlayStyle,
  indicatorStyle,
  children,
  hapticFeedback = true,
  testID,
  touchProps,
  viewProps,
  enableGlow = false,
  enableOrbital = false,
  enableRipple = false,
  glowColor = '#2E86DE',
  borderRadius,
  borderWidth = 1,
  borderColor = 'rgba(255, 255, 255, 0.1)',
  backgroundColor = 'rgba(22, 33, 62, 0.3)',
  shadow = {
    color: '#000000',
    opacity: 0.3,
    radius: 4,
    elevation: 4,
  },
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  ...accessibilityProps
}, ref) => {
  // Animation values
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const orbitalAnimation = useRef(new Animated.Value(0)).current;
  const rippleAnimation = useRef(new Animated.Value(0)).current;
  
  // Ref for the control element
  const controlRef = useRef<View>(null);
  
  // Get size configuration
  const sizeConfig = sizeConfigs[size];
  const animationConfig = animationConfigs[animation];
  
  // Determine current state
  const currentState = disabled ? 'disabled' : loading ? 'loading' : focused ? 'focused' : active ? 'active' : state;
  
  // Imperative handle for ref methods
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (controlRef.current) {
        controlRef.current.focus?.();
      }
      if (onFocus) onFocus();
    },
    blur: () => {
      if (controlRef.current) {
        controlRef.current.blur?.();
      }
      if (onBlur) onBlur();
    },
    animate: (toValue: number, duration = animationConfig.duration) => {
      Animated.timing(scaleAnimation, {
        toValue,
        duration,
        useNativeDriver: animationConfig.useNativeDriver,
      }).start();
    },
    measure: () => {
      return new Promise((resolve) => {
        if (controlRef.current) {
          controlRef.current.measure((x, y, width, height) => {
            resolve({ x, y, width, height });
          });
        }
      });
    },
  }));
  
  // Handle press animations
  const handlePressIn = () => {
    if (disabled || loading || readOnly) return;
    
    const animations = [];
    
    if (animation !== 'none') {
      animations.push(
        Animated.timing(scaleAnimation, {
          toValue: 0.95,
          duration: animationConfig.duration / 2,
          useNativeDriver: animationConfig.useNativeDriver,
        })
      );
    }
    
    if (enableGlow) {
      animations.push(
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: animationConfig.duration,
          useNativeDriver: false,
        })
      );
    }
    
    if (enableRipple) {
      animations.push(
        Animated.timing(rippleAnimation, {
          toValue: 1,
          duration: animationConfig.duration * 2,
          useNativeDriver: true,
        })
      );
    }
    
    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
    
    // Haptic feedback
    if (hapticFeedback && interactionMode === 'press') {
      // Note: In a real app, you would use Haptics.impactAsync() here
      console.log('Haptic feedback triggered');
    }
    
    if (onPressIn) onPressIn();
  };
  
  const handlePressOut = () => {
    if (disabled || loading || readOnly) return;
    
    const animations = [];
    
    if (animation !== 'none') {
      animations.push(
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: animationConfig.duration / 2,
          useNativeDriver: animationConfig.useNativeDriver,
        })
      );
    }
    
    if (enableGlow) {
      animations.push(
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: animationConfig.duration,
          useNativeDriver: false,
        })
      );
    }
    
    if (enableRipple) {
      animations.push(
        Animated.timing(rippleAnimation, {
          toValue: 0,
          duration: animationConfig.duration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
    
    if (onPressOut) onPressOut();
  };
  
  // Handle press
  const handlePress = () => {
    if (disabled || loading || readOnly) return;
    
    // Haptic feedback for press action
    if (hapticFeedback) {
      console.log('Haptic feedback triggered for press');
    }
    
    if (onPress) onPress();
  };
  
  // Orbital animation effect
  React.useEffect(() => {
    if (enableOrbital) {
      const orbitalLoop = Animated.loop(
        Animated.timing(orbitalAnimation, {
          toValue: 1,
          duration: animationConfig.duration,
          useNativeDriver: true,
        }),
        { iterations: -1 }
      );
      
      orbitalLoop.start();
      
      return () => orbitalLoop.stop();
    }
  }, [enableOrbital, orbitalAnimation, animationConfig.duration]);
  
  // Build container style
  const containerStyles = [
    styles.container,
    {
      minHeight: sizeConfig.minHeight,
      minWidth: sizeConfig.minWidth,
      padding: sizeConfig.padding,
      borderRadius: borderRadius !== undefined ? borderRadius : sizeConfig.borderRadius,
      borderWidth,
      borderColor,
      backgroundColor,
      shadowColor: shadow.color,
      shadowOpacity: shadow.opacity,
      shadowRadius: shadow.radius,
      elevation: shadow.elevation,
    },
    currentState === 'disabled' && styles.disabled,
    currentState === 'loading' && styles.loading,
    currentState === 'focused' && styles.focused,
    currentState === 'active' && styles.active,
    enableGlow && {
      shadowColor: glowColor,
      shadowOpacity: glowAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
      shadowRadius: glowAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 16],
      }),
    },
    containerStyle,
  ];
  
  // Build animated container style
  const animatedContainerStyle = [
    containerStyles,
    {
      transform: [
        {
          scale: scaleAnimation,
        },
        ...(enableOrbital ? [{
          rotate: orbitalAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        }] : []),
      ],
      opacity: opacityAnimation,
    },
  ];
  
  // Build content style
  const contentStyles = [
    styles.content,
    contentStyle,
  ];
  
  // Build overlay style
  const overlayStyles = [
    styles.overlay,
    overlayStyle,
  ];
  
  // Build indicator style
  const indicatorStyles = [
    styles.indicator,
    indicatorStyle,
  ];
  
  // Build accessibility props
  const accessibilityConfiguration = {
    accessible: true,
    accessibilityLabel: accessibilityLabel || 'Control',
    accessibilityHint: accessibilityHint || 'Interactive control element',
    accessibilityRole: accessibilityRole || 'button',
    accessibilityState: {
      disabled: disabled || loading,
      selected: active,
      ...(accessibilityProps.accessibilityState || {}),
    },
    ...accessibilityProps,
  };
  
  // Build touch props
  const touchConfiguration = {
    activeOpacity: 0.8,
    disabled: disabled || loading || readOnly,
    onPress: handlePress,
    onPressIn: handlePressIn,
    onPressOut: handlePressOut,
    onLayout,
    testID,
    ...touchProps,
  };
  
  // Build view props
  const viewConfiguration = {
    ref: controlRef,
    onLayout,
    testID,
    ...viewProps,
  };
  
  // Render control based on interaction mode
  const renderControl = () => {
    if (interactionMode === 'press' || interactionMode === 'toggle' || interactionMode === 'select') {
      return (
        <TouchableOpacity
          {...touchConfiguration}
          {...accessibilityConfiguration}
        >
          <Animated.View style={animatedContainerStyle}>
            <View style={contentStyles}>
              {children}
            </View>
            
            {/* Overlay for state effects */}
            <View style={overlayStyles} />
            
            {/* Indicator for focus/active states */}
            {(focused || active) && (
              <View style={indicatorStyles} />
            )}
            
            {/* Ripple effect */}
            {enableRipple && (
              <Animated.View
                style={[
                  styles.ripple,
                  {
                    transform: [
                      {
                        scale: rippleAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 2],
                        }),
                      },
                    ],
                    opacity: rippleAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.3, 0],
                    }),
                  },
                ]}
              />
            )}
          </Animated.View>
        </TouchableOpacity>
      );
    }
    
    // For drag and adjust modes, use a regular View
    return (
      <View
        {...viewConfiguration}
        {...accessibilityConfiguration}
      >
        <Animated.View style={animatedContainerStyle}>
          <View style={contentStyles}>
            {children}
          </View>
          
          {/* Overlay for state effects */}
          <View style={overlayStyles} />
          
          {/* Indicator for focus/active states */}
          {(focused || active) && (
            <View style={indicatorStyles} />
          )}
        </Animated.View>
      </View>
    );
  };
  
  return renderControl();
});

/**
 * Control base component styles
 */
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  
  indicator: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderWidth: 2,
    borderColor: '#2E86DE',
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  
  ripple: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 40,
    height: 40,
    marginTop: -20,
    marginLeft: -20,
    borderRadius: 20,
    backgroundColor: 'rgba(46, 134, 222, 0.3)',
  },
  
  disabled: {
    opacity: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  
  loading: {
    opacity: 0.7,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
  },
  
  focused: {
    borderColor: '#2E86DE',
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
  },
  
  active: {
    backgroundColor: 'rgba(46, 134, 222, 0.2)',
    borderColor: '#2E86DE',
  },
});

ControlBase.displayName = 'ControlBase';

export default ControlBase;
