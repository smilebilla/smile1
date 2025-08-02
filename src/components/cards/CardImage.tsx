/**
 * Corp Astro UI Library - Card Image Component
 * 
 * An image component for cards with cosmic design aesthetics.
 * Provides image display with proper sizing and overlay support.
 * 
 * Features:
 * - Responsive image sizing
 * - Cosmic overlay effects
 * - Placeholder and loading states
 * - Accessibility support
 * - Theme-aware styling
 * - Error handling
 * 
 * Design System Compliance:
 * - BorderRadius: 16px for consistency
 * - Aspect ratios: 16:9, 4:3, 1:1, custom
 * - Overlay: rgba(0,0,0,0.3) for text readability
 * - Loading: Skeleton animation
 * 
 * @module CardImage
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  AccessibilityProps,
  ImageSourcePropType,
  ActivityIndicator,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';

/**
 * Card image aspect ratio types
 */
export type CardImageAspectRatio = '16:9' | '4:3' | '1:1' | 'custom';

/**
 * Card image component props
 */
export interface CardImageProps extends AccessibilityProps {
  /** Image source */
  source: ImageSourcePropType;
  /** Image aspect ratio */
  aspectRatio?: CardImageAspectRatio;
  /** Custom aspect ratio (width/height) */
  customAspectRatio?: number;
  /** Whether to show overlay */
  showOverlay?: boolean;
  /** Overlay content */
  overlayContent?: React.ReactNode;
  /** Alt text for accessibility */
  alt?: string;
  /** Whether image is loading */
  loading?: boolean;
  /** Custom container styling */
  style?: ViewStyle;
  /** Custom image styling */
  imageStyle?: ImageStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Card image component with cosmic design aesthetics
 */
export const CardImage: React.FC<CardImageProps> = ({
  source,
  aspectRatio = '16:9',
  customAspectRatio,
  showOverlay = false,
  overlayContent,
  alt,
  loading = false,
  style,
  imageStyle,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const [imageLoading, setImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Get aspect ratio styles
  const getAspectRatioStyles = () => {
    if (aspectRatio === 'custom' && customAspectRatio) {
      return { aspectRatio: customAspectRatio };
    }

    switch (aspectRatio) {
      case '16:9':
        return { aspectRatio: 16 / 9 };
      case '4:3':
        return { aspectRatio: 4 / 3 };
      case '1:1':
        return { aspectRatio: 1 };
      default:
        return { aspectRatio: 16 / 9 };
    }
  };

  // Handle image load
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Handle image error
  const handleImageError = () => {
    setImageLoading(false);
    setHasError(true);
  };

  // Render loading placeholder
  const renderLoadingPlaceholder = () => (
    <View style={[styles.placeholder, getAspectRatioStyles()]}>
      <ActivityIndicator size="large" color={SignatureBlues.primary} />
    </View>
  );

  // Render error placeholder
  const renderErrorPlaceholder = () => (
    <View style={[styles.placeholder, styles.errorPlaceholder, getAspectRatioStyles()]}>
      <Text style={styles.errorText}>Failed to load image</Text>
    </View>
  );

  // Render overlay
  const renderOverlay = () => {
    if (!showOverlay && !overlayContent) return null;

    return (
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.6)']}
        locations={[0, 0.6, 1]}
        style={styles.overlay}
      >
        {overlayContent && (
          <View style={styles.overlayContent}>
            {overlayContent}
          </View>
        )}
      </LinearGradient>
    );
  };

  // Show loading state
  if (loading) {
    return renderLoadingPlaceholder();
  }

  // Show error state
  if (hasError) {
    return renderErrorPlaceholder();
  }

  return (
    <View style={[styles.container, style]} testID={testID} {...accessibilityProps}>
      <Image
        source={source}
        style={[styles.image, getAspectRatioStyles(), imageStyle]}
        onLoad={handleImageLoad}
        onError={handleImageError}
        accessibilityLabel={alt}
        resizeMode="cover"
      />
      
      {/* Loading overlay */}
      {imageLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={SignatureBlues.primary} />
        </View>
      )}

      {/* Content overlay */}
      {renderOverlay()}
    </View>
  );
};

/**
 * Card image component styles
 */
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    borderRadius: 16,
  },
  placeholder: {
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  errorPlaceholder: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  overlayContent: {
    padding: spacing.lg,
    alignItems: 'center',
  },
});

export default CardImage;
