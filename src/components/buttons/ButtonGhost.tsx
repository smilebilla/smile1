/**
 * Corp Astro UI Library - Ghost Button Component
 * 
 * Ghost button with transparent background and subtle hover effects.
 * Provides a minimal, text-focused button option for secondary actions.
 * 
 * @module ButtonGhost
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Height: 44px, padding: '0 20px'
 * - Background: 'transparent'
 * - Typography: Inter, 14px, 500 weight, color: '#B8B8C0'
 * - Hover: color: '#FFFFFF', background: 'rgba(255,255,255,0.05)'
 * 
 * Features:
 * - Transparent background
 * - Subtle hover effects
 * - Minimal visual footprint
 * - Accessibility support
 * - Responsive touch targets
 * - Animation states
 * - Theme integration
 */

import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  AccessibilityProps,
  Platform,
} from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../foundations/tokens/colors/DeepSpaceColors';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';

/**
 * Ghost button size variants
 */
export type ButtonGhostSize = 'small' | 'medium' | 'large';

/**
 * Ghost button variant types
 */
export type ButtonGhostVariant = 'default' | 'minimal' | 'subtle';

/**
 * Ghost button loading state
 */
export interface ButtonGhostLoadingState {
  /** Show loading state */
  isLoading: boolean;
  /** Loading text override */
  loadingText?: string;
  /** Show spinner */
  showSpinner: boolean;
  /** Show pulse effect */
  showPulse: boolean;
}

/**
 * Ghost button configuration
 */
export interface ButtonGhostConfig {
  /** Button variant */
  variant: ButtonGhostVariant;
  /** Button size */
  size: ButtonGhostSize;
  /** Enable haptic feedback */
  enableHaptics: boolean;
  /** Enable hover effects */
  enableHoverEffects: boolean;
  /** Enable press effects */
  enablePressEffects: boolean;
  /** Enable loading states */
  enableLoadingStates: boolean;
  /** Custom text color */
  textColor?: string;
  /** Custom hover text color */
  hoverTextColor?: string;
  /** Custom hover background color */
  hoverBackgroundColor?: string;
}

/**
 * Ghost button component props
 */
export interface ButtonGhostProps extends AccessibilityProps {
  /** Button text */
  children: string;
  /** Press handler */
  onPress: (event: GestureResponderEvent) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state configuration */
  loading?: ButtonGhostLoadingState;
  /** Button configuration */
  config?: Partial<ButtonGhostConfig>;
  /** Custom styles */
  style?: ViewStyle;
  /** Custom text styles */
  textStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Default ghost button configuration
 */
const defaultConfig: ButtonGhostConfig = {
  variant: 'default',
  size: 'medium',
  enableHaptics: true,
  enableHoverEffects: true,
  enablePressEffects: true,
  enableLoadingStates: true,
  textColor: ProfessionalGrays.text as string,
  hoverTextColor: '#FFFFFF',
  hoverBackgroundColor: 'rgba(255,255,255,0.05)',
};

/**
 * Ghost button component
 */
export const ButtonGhost: React.FC<ButtonGhostProps> = ({
  children,
  onPress,
  disabled = false,
  loading = { isLoading: false, showSpinner: true, showPulse: false },
  config = {},
  style,
  textStyle,
  testID,
  ...accessibilityProps
}) => {
  const theme = useTheme();
  const finalConfig = { ...defaultConfig, ...config };
  
  // Animation values
  const scaleValue = useRef(new Animated.Value(1)).current;
  const backgroundOpacityValue = useRef(new Animated.Value(0)).current;
  const textColorValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const spinnerValue = useRef(new Animated.Value(0)).current;
  
  // Component state
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Size configurations
  const sizeConfig = {
    small: { height: 36, paddingHorizontal: 16, fontSize: 12 },
    medium: { height: 44, paddingHorizontal: 20, fontSize: 14 },
    large: { height: 52, paddingHorizontal: 24, fontSize: 16 },
  };

  const currentSize = sizeConfig[finalConfig.size];

  // Start loading animations
  React.useEffect(() => {
    if (loading.isLoading && finalConfig.enableLoadingStates) {
      // Pulse animation
      if (loading.showPulse) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseValue, {
              toValue: 1.05,
              duration: 1500,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(pulseValue, {
              toValue: 1,
              duration: 1500,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }

      // Spinner animation
      if (loading.showSpinner) {
        Animated.loop(
          Animated.timing(spinnerValue, {
            toValue: 1,
            duration: 1200,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      }
    } else {
      pulseValue.setValue(1);
      spinnerValue.setValue(0);
    }
  }, [loading.isLoading, loading.showPulse, loading.showSpinner, finalConfig.enableLoadingStates]);

  // Handle press in
  const handlePressIn = () => {
    setIsPressed(true);
    
    // Haptic feedback
    if (finalConfig.enableHaptics && !disabled && Platform.OS !== 'web') {
      console.log('Haptic feedback triggered');
    }

    // Press animation - separate native and JS animations
    if (finalConfig.enablePressEffects) {
      Animated.timing(scaleValue, {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true,
      }).start();
      
      Animated.parallel([
        Animated.timing(backgroundOpacityValue, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(textColorValue, {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  // Handle press out
  const handlePressOut = () => {
    setIsPressed(false);
    
    // Release animation - separate native and JS animations
    if (finalConfig.enablePressEffects) {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
      
      Animated.parallel([
        Animated.timing(backgroundOpacityValue, {
          toValue: isHovered ? 1 : 0,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(textColorValue, {
          toValue: isHovered ? 1 : 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  // Handle hover (for web/desktop)
  const handleHoverIn = () => {
    if (Platform.OS === 'web' && finalConfig.enableHoverEffects && !disabled) {
      setIsHovered(true);
      
      Animated.parallel([
        Animated.timing(backgroundOpacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(textColorValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handleHoverOut = () => {
    if (Platform.OS === 'web' && finalConfig.enableHoverEffects && !disabled) {
      setIsHovered(false);
      
      Animated.parallel([
        Animated.timing(backgroundOpacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(textColorValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  // Handle press
  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled && !loading.isLoading) {
      if (finalConfig.enableHaptics && Platform.OS !== 'web') {
        console.log('Haptic feedback triggered');
      }
      onPress(event);
    }
  };

  // Animated background color
  const animatedBackgroundColor = backgroundOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', finalConfig.hoverBackgroundColor!],
    extrapolate: 'clamp',
  });

  // Animated text color
  const animatedTextColor = textColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [finalConfig.textColor!, finalConfig.hoverTextColor!],
    extrapolate: 'clamp',
  });

  // Spinner rotation
  const spinnerRotation = spinnerValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Button styles
  const buttonStyles = [
    styles.button,
    {
      height: currentSize.height,
      paddingHorizontal: currentSize.paddingHorizontal,
      opacity: disabled ? 0.4 : 1,
      transform: [
        { scale: loading.isLoading && loading.showPulse ? pulseValue : scaleValue }
      ],
      backgroundColor: animatedBackgroundColor,
    },
    style,
  ];

  // Text styles
  const textStyles = [
    styles.text,
    {
      fontSize: currentSize.fontSize,
      color: disabled ? ProfessionalGrays.muted : animatedTextColor,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading.isLoading}
      activeOpacity={0.9}
      testID={testID}
      {...(Platform.OS === 'web' ? {
        onMouseEnter: handleHoverIn,
        onMouseLeave: handleHoverOut,
      } : {})}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading.isLoading }}
      {...accessibilityProps}
    >
      <Animated.View style={buttonStyles}>
        <View style={styles.content}>
          {/* Loading spinner */}
          {loading.isLoading && loading.showSpinner && (
            <Animated.View
              style={[
                styles.spinner,
                {
                  transform: [{ rotate: spinnerRotation }],
                },
              ]}
            >
              <View style={styles.spinnerRing} />
            </Animated.View>
          )}
          
          {/* Button text */}
          <Animated.Text style={textStyles}>
            {loading.isLoading && loading.loadingText ? loading.loadingText : children}
          </Animated.Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  text: {
    fontFamily: 'Inter',
    fontWeight: '500',
    textAlign: 'center',
  },
  spinner: {
    width: 12,
    height: 12,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerRing: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(184,184,192,0.3)',
    borderTopColor: ProfessionalGrays.text,
  },
});

/**
 * Default export
 */
export default ButtonGhost;
