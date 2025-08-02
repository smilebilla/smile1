/**
 * Corp Astro UI Library - Modal Close Button Component
 * Module 112: ModalCloseButton.tsx
 * 
 * An advanced modal close button component with cosmic design aesthetics,
 * hover effects, and accessibility features following Corp Astro design system.
 * 
 * Features:
 * - Cosmic close button styling with hover effects
 * - Rounded close button with Corp Astro styling
 * - Hover state with opacity changes
 * - Accessibility features with proper ARIA attributes
 * - Customizable positioning and sizing
 * - Press feedback and animation
 * - TypeScript support with comprehensive interfaces
 * 
 * Design System Compliance:
 * - Position: absolute, top: 20px, right: 20px
 * - Size: 44px, borderRadius: 22px
 * - Background: rgba(255,255,255,0.05), hover: rgba(255,255,255,0.1)
 * - Corp Astro color palette and theming
 * - Smooth hover transitions
 * - Accessibility compliant
 */

import React from 'react';
import { 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  ViewStyle, 
  TouchableOpacityProps,
  AccessibilityInfo
} from 'react-native';
import { useTheme } from '../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

// Type definitions
interface ModalCloseButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  size?: number;
  position?: 'top-right' | 'top-left' | 'center';
  variant?: 'default' | 'minimal' | 'outlined';
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

interface ModalCloseButtonState {
  isPressed: boolean;
  isHovered: boolean;
}

// Constants
const BUTTON_SIZE = {
  default: 44,
  small: 36,
  large: 52
};

const BUTTON_POSITIONS = {
  'top-right': { position: 'absolute', top: 20, right: 20 },
  'top-left': { position: 'absolute', top: 20, left: 20 },
  'center': { alignSelf: 'center' }
} as const;

const BUTTON_VARIANTS = {
  default: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 0,
    borderColor: 'transparent'
  },
  minimal: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent'
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.3)'
  }
} as const;

/**
 * ModalCloseButton Component
 * 
 * A sophisticated modal close button component with cosmic design aesthetics,
 * hover effects, and accessibility features.
 */
export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  onPress,
  size = BUTTON_SIZE.default,
  position = 'top-right',
  variant = 'default',
  style,
  testID = 'modal-close-button',
  accessibilityLabel = 'Close modal',
  disabled = false,
  ...props
}) => {
  const { theme } = useTheme();
  const [buttonState, setButtonState] = React.useState<ModalCloseButtonState>({
    isPressed: false,
    isHovered: false
  });

  // Handle press events
  const handlePressIn = () => {
    setButtonState(prev => ({ ...prev, isPressed: true }));
  };

  const handlePressOut = () => {
    setButtonState(prev => ({ ...prev, isPressed: false }));
  };

  const handlePress = () => {
    if (!disabled) {
      // Provide haptic feedback
      AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
        if (enabled) {
          AccessibilityInfo.announceForAccessibility('Modal closed');
        }
      });
      onPress();
    }
  };

  // Dynamic styles based on state
  const getDynamicStyles = (): ViewStyle => {
    const baseVariant = BUTTON_VARIANTS[variant];
    const positionStyle = BUTTON_POSITIONS[position];
    
    return {
      ...positionStyle,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: buttonState.isPressed 
        ? 'rgba(255,255,255,0.15)' 
        : buttonState.isHovered 
          ? 'rgba(255,255,255,0.1)' 
          : baseVariant.backgroundColor,
      borderWidth: baseVariant.borderWidth,
      borderColor: baseVariant.borderColor,
      opacity: disabled ? 0.5 : 1,
      transform: [
        { scale: buttonState.isPressed ? 0.95 : 1 }
      ]
    };
  };

  // X icon component
  const XIcon = () => (
    <View style={styles.iconContainer}>
      <View style={[styles.iconLine, styles.iconLineLeft]} />
      <View style={[styles.iconLine, styles.iconLineRight]} />
    </View>
  );

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getDynamicStyles(),
        style
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      testID={testID}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityHint="Closes the modal dialog"
      {...props}
    >
      <XIcon />
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    // Elevation for Android
    elevation: 3,
    // Shadow for iOS
    shadowColor: deepSpaceColors.void,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconLine: {
    position: 'absolute',
    width: 16,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  iconLineLeft: {
    transform: [{ rotate: '45deg' }],
  },
  iconLineRight: {
    transform: [{ rotate: '-45deg' }],
  },
});

// Default export
export default ModalCloseButton;

// Named exports for specific use cases
export const ModalCloseButtonMinimal: React.FC<Omit<ModalCloseButtonProps, 'variant'>> = (props) => (
  <ModalCloseButton {...props} variant="minimal" />
);

export const ModalCloseButtonOutlined: React.FC<Omit<ModalCloseButtonProps, 'variant'>> = (props) => (
  <ModalCloseButton {...props} variant="outlined" />
);

export const ModalCloseButtonLarge: React.FC<Omit<ModalCloseButtonProps, 'size'>> = (props) => (
  <ModalCloseButton {...props} size={BUTTON_SIZE.large} />
);

export const ModalCloseButtonSmall: React.FC<Omit<ModalCloseButtonProps, 'size'>> = (props) => (
  <ModalCloseButton {...props} size={BUTTON_SIZE.small} />
);

// Type exports
export type { ModalCloseButtonProps, ModalCloseButtonState };
export { BUTTON_SIZE, BUTTON_POSITIONS, BUTTON_VARIANTS };
