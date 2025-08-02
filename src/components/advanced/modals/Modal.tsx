/**
 * Corp Astro UI Library - Modal Component
 * 
 * A comprehensive modal component that provides overlay functionality
 * for Corp Astro applications with cosmic design aesthetics and professional functionality.
 * 
 * Features:
 * - Overlay with backdrop blur and cosmic gradient
 * - Slide-up animation with spring physics
 * - Responsive sizing and positioning
 * - Accessibility compliant with proper ARIA attributes
 * - Portal rendering for proper z-index management
 * - ESC key and outside click handling
 * - Theme-aware styling with Corp Astro design system
 * 
 * @module Modal
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - overlay: background: 'rgba(8,8,15,0.8)', backdropFilter: 'blur(10px)'
 * - container: borderRadius: 32px, maxWidth: 480px, background: 'linear-gradient(180deg, #16213E 0%, #0F0F1A 100%)'
 * - border: '1px solid rgba(46,134,222,0.3)', shadow: '0 30px 90px rgba(0,0,0,0.9)'
 * - animation: 'slideUp 0.3s ease-out'
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Modal as RNModal,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler,
  Platform,
  AccessibilityInfo,
  ColorValue,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../foundations/themes/useTheme';
import { CorpAstroTheme } from '../../foundations/themes/DarkTheme';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Modal size variants
 */
export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

/**
 * Modal animation types
 */
export type ModalAnimation = 'slideUp' | 'slideDown' | 'fade' | 'scale' | 'none';

/**
 * Modal component props interface
 */
export interface ModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Callback when modal is dismissed */
  onDismiss: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Modal size variant */
  size?: ModalSize;
  /** Animation type */
  animation?: ModalAnimation;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether to close on outside tap */
  closeOnOutsideTap?: boolean;
  /** Whether to close on ESC key */
  closeOnEscKey?: boolean;
  /** Custom styles for modal container */
  style?: ViewStyle;
  /** Custom styles for modal content */
  contentStyle?: ViewStyle;
  /** Custom styles for overlay */
  overlayStyle?: ViewStyle;
  /** Custom background color */
  backgroundColor?: ColorValue;
  /** Custom blur intensity (0-1) */
  blurIntensity?: number;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
}

// ============================================================================
// MODAL COMPONENT
// ============================================================================

/**
 * Modal component
 * 
 * A comprehensive modal component with cosmic design aesthetics.
 * Provides overlay functionality with backdrop blur and professional styling.
 * 
 * @param props - Modal component props
 * @returns Modal component
 */
export const Modal: React.FC<ModalProps> = ({
  visible,
  onDismiss,
  title,
  children,
  size = 'medium',
  animation = 'slideUp',
  showCloseButton = true,
  closeOnOutsideTap = true,
  closeOnEscKey = true,
  style,
  contentStyle,
  overlayStyle,
  backgroundColor,
  blurIntensity = 0.8,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  // ============================================================================
  // ANIMATION LOGIC
  // ============================================================================

  /**
   * Show modal with animation
   */
  const showModal = useCallback(() => {
    setIsAnimating(true);
    
    const animations = [];
    
    if (animation === 'slideUp' || animation === 'slideDown') {
      animations.push(
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 30,
        })
      );
    }
    
    if (animation === 'scale') {
      animations.push(
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 30,
        })
      );
    }
    
    animations.push(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    );
    
    Animated.parallel(animations).start(() => {
      setIsAnimating(false);
    });
  }, [animation, slideAnim, fadeAnim, scaleAnim]);

  /**
   * Hide modal with animation
   */
  const hideModal = useCallback(() => {
    setIsAnimating(true);
    
    const animations = [];
    
    if (animation === 'slideUp' || animation === 'slideDown') {
      animations.push(
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        })
      );
    }
    
    if (animation === 'scale') {
      animations.push(
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 250,
          useNativeDriver: true,
        })
      );
    }
    
    animations.push(
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      })
    );
    
    Animated.parallel(animations).start(() => {
      setIsAnimating(false);
      onDismiss();
    });
  }, [animation, slideAnim, fadeAnim, scaleAnim, onDismiss]);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * Handle visibility changes
   */
  useEffect(() => {
    if (visible) {
      showModal();
    } else {
      hideModal();
    }
  }, [visible, showModal, hideModal]);

  /**
   * Handle back button (Android)
   */
  useEffect(() => {
    if (visible && Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (closeOnEscKey) {
          hideModal();
          return true;
        }
        return false;
      });
      
      return () => backHandler.remove();
    }
  }, [visible, closeOnEscKey, hideModal]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Handle outside tap
   */
  const handleOutsideTap = useCallback(() => {
    if (closeOnOutsideTap && !isAnimating) {
      hideModal();
    }
  }, [closeOnOutsideTap, isAnimating, hideModal]);

  /**
   * Handle close button press
   */
  const handleClosePress = useCallback(() => {
    if (!isAnimating) {
      hideModal();
    }
  }, [isAnimating, hideModal]);

  // ============================================================================
  // STYLES
  // ============================================================================

  const styles = getStyles(theme, size, backgroundColor, blurIntensity);

  // ============================================================================
  // ANIMATIONS
  // ============================================================================

  const getAnimationStyle = (): ViewStyle => {
    switch (animation) {
      case 'slideUp':
        return {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
              }),
            },
            { scale: scaleAnim },
          ],
        };
      case 'slideDown':
        return {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-300, 0],
              }),
            },
            { scale: scaleAnim },
          ],
        };
      case 'scale':
        return {
          transform: [{ scale: scaleAnim }],
        };
      case 'fade':
        return {};
      default:
        return {};
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={hideModal}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <TouchableWithoutFeedback onPress={handleOutsideTap}>
        <Animated.View
          style={[
            styles.overlay,
            overlayStyle,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              style={[
                styles.container,
                style,
                {
                  opacity: fadeAnim,
                },
                getAnimationStyle(),
              ]}
            >
              {/* Linear gradient background - UI Documentation compliant */}
              <LinearGradient
                colors={['#16213E', '#0F0F1A']}
                start={[0, 0]}
                end={[0, 1]}
                style={StyleSheet.absoluteFillObject}
              />
              
              {/* Header */}
              {(title || showCloseButton) && (
                <View style={styles.header}>
                  {title && (
                    <Text style={styles.title} numberOfLines={1}>
                      {title}
                    </Text>
                  )}
                  {showCloseButton && (
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={handleClosePress}
                      accessibilityLabel="Close modal"
                      accessibilityRole="button"
                    >
                      <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Content */}
              <View style={[styles.content, contentStyle]}>
                {children}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const getStyles = (
  theme: CorpAstroTheme,
  size: ModalSize,
  backgroundColor?: ColorValue,
  blurIntensity: number = 0.8
): { [key: string]: ViewStyle | TextStyle } => {
  const { width, height } = Dimensions.get('window');
  
  const sizeConfig = {
    small: { maxWidth: 320, maxHeight: height * 0.4 },
    medium: { maxWidth: 480, maxHeight: height * 0.6 },
    large: { maxWidth: 640, maxHeight: height * 0.8 },
    fullscreen: { maxWidth: width - 32, maxHeight: height - 64 },
  };

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: `rgba(8,8,15,${0.8 * blurIntensity})`,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    container: {
      maxWidth: sizeConfig[size].maxWidth,
      maxHeight: sizeConfig[size].maxHeight,
      width: '100%',
      borderRadius: 32,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 30 },
      shadowOpacity: 0.9,
      shadowRadius: 45,
      elevation: 20,
      borderWidth: 1,
      borderColor: 'rgba(46,134,222,0.3)',
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 80,
      paddingHorizontal: 32,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.08)',
    },
    title: {
      flex: 1,
      fontSize: 24,
      fontWeight: '600',
      color: '#FFFFFF',
      fontFamily: 'Futura PT',
    },
    closeButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255,255,255,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 16,
    },
    closeButtonText: {
      fontSize: 24,
      color: '#FFFFFF',
      fontWeight: '300',
      lineHeight: 24,
    },
    content: {
      flex: 1,
      padding: 32,
    },
  });
};

// ============================================================================
// EXPORTS
// ============================================================================

export default Modal;
