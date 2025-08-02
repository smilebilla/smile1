/**
 * Corp Astro UI Library - Secondary Button Component
 * 
 * Secondary button with glass morphism background, border animation, and hover effects.
 * Provides a subtle alternative to primary buttons while maintaining brand consistency.
 * 
 * @module ButtonSecondary
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Height: 56px, borderRadius: 28px, padding: '0 32px'
 * - Background: 'rgba(46,134,222,0.1)', border: '1px solid rgba(46,134,222,0.3)'
 * - Backdrop Filter: 'blur(10px)'
 * - Typography: Futura PT, 16px, 500 weight, color: '#54A0FF', letterSpacing: 0.5px
 * - Hover: background: 'rgba(46,134,222,0.2)', borderColor: 'rgba(46,134,222,0.5)'
 * - Glow: 'inset 0 0 20px rgba(46,134,222,0.2)'
 * 
 * Features:
 * - Glass morphism background
 * - Animated border on hover
 * - Backdrop blur effects
 * - Subtle glow effects
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
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';

/**
 * Secondary button size variants
 */
export type ButtonSecondarySize = 'small' | 'medium' | 'large';

/**
 * Secondary button variant types
 */
export type ButtonSecondaryVariant = 'default' | 'outlined' | 'glass';

/**
 * Secondary button loading state
 */
export interface ButtonSecondaryLoadingState {
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
 * Secondary button configuration
 */
export interface ButtonSecondaryConfig {
  /** Button variant */
  variant: ButtonSecondaryVariant;
  /** Button size */
  size: ButtonSecondarySize;
  /** Enable haptic feedback */
  enableHaptics: boolean;
  /** Enable glass morphism */
  enableGlassMorphism: boolean;
  /** Enable border animation */
  enableBorderAnimation: boolean;
  /** Enable glow effects */
  enableGlowEffects: boolean;
  /** Enable backdrop blur */
  enableBackdropBlur: boolean;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom border color */
  borderColor?: string;
  /** Custom text color */
  textColor?: string;
}

/**
 * Secondary button component props
 */
export interface ButtonSecondaryProps extends AccessibilityProps {
  /** Button text */
  children: string;
  /** Press handler */
  onPress: (event: GestureResponderEvent) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state configuration */
  loading?: ButtonSecondaryLoadingState;
  /** Button configuration */
  config?: Partial<ButtonSecondaryConfig>;
  /** Custom styles */
  style?: ViewStyle;
  /** Custom text styles */
  textStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Default secondary button configuration
 */
const defaultConfig: ButtonSecondaryConfig = {
  variant: 'default',
  size: 'medium',
  enableHaptics: true,
  enableGlassMorphism: true,
  enableBorderAnimation: true,
  enableGlowEffects: true,
  enableBackdropBlur: true,
  backgroundColor: 'rgba(46,134,222,0.1)',
  borderColor: 'rgba(46,134,222,0.3)',
  textColor: SignatureBlues.light as string,
};

/**
 * Secondary button component
 */
export const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  children,
  onPress,
  disabled = false,
  loading = { isLoading: false, showSpinner: true, showPulse: true },
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
  const borderOpacityValue = useRef(new Animated.Value(0.3)).current;
  const backgroundOpacityValue = useRef(new Animated.Value(0.1)).current;
  const glowOpacityValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const spinnerValue = useRef(new Animated.Value(0)).current;
  
  // Component state
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Size configurations
  const sizeConfig = {
    small: { height: 44, borderRadius: 22, paddingHorizontal: 24, fontSize: 14 },
    medium: { height: 56, borderRadius: 28, paddingHorizontal: 32, fontSize: 16 },
    large: { height: 64, borderRadius: 32, paddingHorizontal: 40, fontSize: 18 },
  };

  const currentSize = sizeConfig[finalConfig.size];

  // Start loading animations
  React.useEffect(() => {
    if (loading.isLoading) {
      // Pulse animation
      if (loading.showPulse) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseValue, {
              toValue: 1.05,
              duration: 1000,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(pulseValue, {
              toValue: 1,
              duration: 1000,
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
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      }
    } else {
      pulseValue.setValue(1);
      spinnerValue.setValue(0);
    }
  }, [loading.isLoading, loading.showPulse, loading.showSpinner]);

  // Handle press in
  const handlePressIn = () => {
    setIsPressed(true);
    
    // Haptic feedback
    if (finalConfig.enableHaptics && !disabled && Platform.OS !== 'web') {
      console.log('Haptic feedback triggered');
    }

    // Press animation - separate native and JS animations
    Animated.timing(scaleValue, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start();
    
    Animated.parallel([
      Animated.timing(backgroundOpacityValue, {
        toValue: 0.2,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(borderOpacityValue, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Handle press out
  const handlePressOut = () => {
    setIsPressed(false);
    
    // Release animation - separate native and JS animations
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    
    Animated.parallel([
      Animated.timing(backgroundOpacityValue, {
        toValue: isHovered ? 0.2 : 0.1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(borderOpacityValue, {
        toValue: isHovered ? 0.5 : 0.3,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Handle hover (for web/desktop)
  const handleHoverIn = () => {
    if (Platform.OS === 'web' && !disabled) {
      setIsHovered(true);
      
      Animated.parallel([
        Animated.timing(backgroundOpacityValue, {
          toValue: 0.2,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(borderOpacityValue, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(glowOpacityValue, {
          toValue: finalConfig.enableGlowEffects ? 0.2 : 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handleHoverOut = () => {
    if (Platform.OS === 'web' && !disabled) {
      setIsHovered(false);
      
      Animated.parallel([
        Animated.timing(backgroundOpacityValue, {
          toValue: 0.1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(borderOpacityValue, {
          toValue: 0.3,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(glowOpacityValue, {
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
    inputRange: [0.1, 0.2],
    outputRange: [finalConfig.backgroundColor!, `rgba(46,134,222,0.2)`],
    extrapolate: 'clamp',
  });

  // Animated border color
  const animatedBorderColor = borderOpacityValue.interpolate({
    inputRange: [0.3, 0.5],
    outputRange: [finalConfig.borderColor!, `rgba(46,134,222,0.5)`],
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
      borderRadius: currentSize.borderRadius,
      paddingHorizontal: currentSize.paddingHorizontal,
      opacity: disabled ? 0.5 : 1,
      transform: [
        { scale: loading.isLoading ? pulseValue : scaleValue }
      ],
      backgroundColor: animatedBackgroundColor,
      borderColor: animatedBorderColor,
      borderWidth: 1,
    },
    style,
  ];

  // Text styles
  const textStyles = [
    styles.text,
    {
      fontSize: currentSize.fontSize,
      color: disabled ? ProfessionalGrays.muted : finalConfig.textColor,
      letterSpacing: 0.5,
    },
    textStyle,
  ];

  // Glow styles
  const glowStyles = finalConfig.enableGlowEffects ? {
    shadowColor: SignatureBlues.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowOpacityValue,
    shadowRadius: 20,
    elevation: 0,
  } : {};

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading.isLoading}
      activeOpacity={0.95}
      testID={testID}
      {...(Platform.OS === 'web' ? {
        onMouseEnter: handleHoverIn,
        onMouseLeave: handleHoverOut,
      } : {})}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading.isLoading }}
      {...accessibilityProps}
    >
      <Animated.View style={[buttonStyles, glowStyles]}>
        {/* Backdrop blur effect (simulated) */}
        {finalConfig.enableBackdropBlur && (
          <View style={[StyleSheet.absoluteFillObject, styles.backdropBlur]} />
        )}
        
        {/* Inner glow effect */}
        {finalConfig.enableGlowEffects && (
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                borderRadius: currentSize.borderRadius,
                shadowColor: SignatureBlues.primary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: glowOpacityValue,
                shadowRadius: 20,
                backgroundColor: 'transparent',
              },
            ]}
          />
        )}
        
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
          <Text style={textStyles}>
            {loading.isLoading && loading.loadingText ? loading.loadingText : children}
          </Text>
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
    overflow: 'hidden',
  },
  backdropBlur: {
    backgroundColor: 'rgba(46,134,222,0.02)',
    borderRadius: 28,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: 'FuturaPT-Medium',
    fontWeight: '500',
    textAlign: 'center',
  },
  spinner: {
    width: 16,
    height: 16,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerRing: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(84,160,255,0.3)',
    borderTopColor: SignatureBlues.light,
  },
});

/**
 * Default export
 */
export default ButtonSecondary;
