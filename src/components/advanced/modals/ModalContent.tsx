/**
 * Corp Astro UI Library - Modal Content Component
 * 
 * A comprehensive modal content component that provides scrollable content area
 * for Corp Astro modal dialogs with cosmic design aesthetics and professional styling.
 * 
 * Features:
 * - Scrollable content area with proper padding
 * - Responsive height management with maxHeight support
 * - Fade indicators for overflowing content
 * - Loading state support
 * - Empty state handling
 * - Accessibility compliant with proper ARIA attributes
 * - Theme-aware styling with Corp Astro design system
 * 
 * @module ModalContent
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - padding: 32px, maxHeight: '70vh', overflowY: 'auto'
 * - scrollable area with cosmic styling
 * - fade indicators for overflow
 */

import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  ColorValue,
} from 'react-native';
import { useTheme } from '../../foundations/themes/useTheme';
import { CorpAstroTheme } from '../../foundations/themes/DarkTheme';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Modal content component props interface
 */
export interface ModalContentProps {
  /** Content children */
  children: React.ReactNode;
  /** Whether content is scrollable */
  scrollable?: boolean;
  /** Custom maximum height */
  maxHeight?: number | string;
  /** Custom padding */
  padding?: number;
  /** Whether to show fade indicators */
  showFadeIndicators?: boolean;
  /** Whether content is loading */
  loading?: boolean;
  /** Loading component */
  loadingComponent?: React.ComponentType;
  /** Whether to show empty state */
  showEmptyState?: boolean;
  /** Empty state component */
  emptyStateComponent?: React.ComponentType;
  /** Custom styles for content container */
  style?: ViewStyle;
  /** Custom styles for scroll view */
  scrollViewStyle?: ViewStyle;
  /** Custom background color */
  backgroundColor?: ColorValue;
  /** Scroll event handler */
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
}

// ============================================================================
// MODAL CONTENT COMPONENT
// ============================================================================

/**
 * Modal content component
 * 
 * A comprehensive modal content component with scrollable area and fade indicators.
 * Provides proper spacing and overflow handling according to UI Documentation.
 * 
 * @param props - Modal content component props
 * @returns Modal content component
 */
export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  scrollable = true,
  maxHeight = '70vh',
  padding = 32,
  showFadeIndicators = true,
  loading = false,
  loadingComponent: LoadingComponent,
  showEmptyState = false,
  emptyStateComponent: EmptyStateComponent,
  style,
  scrollViewStyle,
  backgroundColor,
  onScroll,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState({ top: false, bottom: false });
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Handle scroll events
   */
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    
    // Calculate scroll position
    const isAtTop = contentOffset.y <= 0;
    const isAtBottom = contentOffset.y >= contentSize.height - layoutMeasurement.height;
    
    setScrollPosition({
      top: !isAtTop && contentSize.height > layoutMeasurement.height,
      bottom: !isAtBottom && contentSize.height > layoutMeasurement.height,
    });
    
    // Call external scroll handler
    if (onScroll) {
      onScroll(event);
    }
  }, [onScroll]);

  /**
   * Handle content size change
   */
  const handleContentSizeChange = useCallback((width: number, height: number) => {
    setContentHeight(height);
  }, []);

  /**
   * Handle scroll view layout
   */
  const handleScrollViewLayout = useCallback((event: any) => {
    setScrollViewHeight(event.nativeEvent.layout.height);
  }, []);

  // ============================================================================
  // STYLES
  // ============================================================================

  const styles = getStyles(theme, padding, backgroundColor, maxHeight);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  const showTopFade = showFadeIndicators && scrollPosition.top;
  const showBottomFade = showFadeIndicators && scrollPosition.bottom;
  const hasOverflow = contentHeight > scrollViewHeight;

  // ============================================================================
  // RENDER
  // ============================================================================

  if (loading && LoadingComponent) {
    return (
      <View style={[styles.container, style]}>
        <LoadingComponent />
      </View>
    );
  }

  if (showEmptyState && EmptyStateComponent) {
    return (
      <View style={[styles.container, style]}>
        <EmptyStateComponent />
      </View>
    );
  }

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {/* Top Fade Indicator */}
      {showTopFade && <View style={styles.topFade} />}

      {/* Scrollable Content */}
      {scrollable ? (
        <ScrollView
          ref={scrollViewRef}
          style={[styles.scrollView, scrollViewStyle]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          onContentSizeChange={handleContentSizeChange}
          onLayout={handleScrollViewLayout}
          scrollEventThrottle={16}
          testID={`${testID}-scroll-view`}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.staticContent, scrollViewStyle]}>
          {children}
        </View>
      )}

      {/* Bottom Fade Indicator */}
      {showBottomFade && <View style={styles.bottomFade} />}
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const getStyles = (
  theme: CorpAstroTheme,
  padding: number,
  backgroundColor?: ColorValue,
  maxHeight?: number | string
): { [key: string]: ViewStyle } => {
  const { height } = Dimensions.get('window');
  
  // Calculate max height
  let computedMaxHeight: number;
  if (typeof maxHeight === 'string') {
    if (maxHeight.includes('vh')) {
      const percentage = parseFloat(maxHeight.replace('vh', '')) / 100;
      computedMaxHeight = height * percentage;
    } else if (maxHeight.includes('%')) {
      const percentage = parseFloat(maxHeight.replace('%', '')) / 100;
      computedMaxHeight = height * percentage;
    } else {
      computedMaxHeight = height * 0.7; // Default to 70vh
    }
  } else {
    computedMaxHeight = maxHeight || height * 0.7; // Default to 70vh
  }

  return StyleSheet.create({
    container: {
      position: 'relative',
      maxHeight: computedMaxHeight,
      backgroundColor: backgroundColor || 'transparent',
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: padding,
      minHeight: padding * 2, // Minimum height for empty content
    },
    staticContent: {
      padding: padding,
      flex: 1,
    },
    topFade: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 20,
      backgroundColor: 'rgba(22,33,62,0.8)',
      zIndex: 1,
      pointerEvents: 'none',
    },
    bottomFade: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 20,
      backgroundColor: 'rgba(22,33,62,0.8)',
      zIndex: 1,
      pointerEvents: 'none',
    },
  });
};

// ============================================================================
// EXPORTS
// ============================================================================

export default ModalContent;
