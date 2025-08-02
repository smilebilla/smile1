/**
 * 🌌 COSMIC TRANSFORMATION - Module 17: Navigation System Enhancement
 * 
 * Comprehensive navigation system with cosmic theme integration.
 * This system provides enhanced navigation styling, animations, and effects
 * that align with the cosmic dark theme design language.
 * 
 * Features:
 * - Cosmic gradient backgrounds for navigation
 * - Floating bottom navigation with glass morphism
 * - Smooth animations and transitions
 * - Enhanced accessibility and usability
 * - Cross-platform compatibility (iOS/Android/Web)
 * - Dynamic icon styling with cosmic effects
 * - Navigation state management
 * - Performance-optimized rendering
 * 
 * @author Corp Astro Development Team
 * @version 1.0.0
 * @since Module 17 - Navigation System Enhancement
 */

import { Platform, ViewStyle, TextStyle } from 'react-native';
import DarkTheme from './DarkTheme';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type NavigationVariant = 
  | 'default'
  | 'floating'
  | 'cosmic'
  | 'glass'
  | 'premium';

export type NavigationSize = 
  | 'compact'
  | 'default'
  | 'comfortable'
  | 'spacious';

export type NavigationState = 
  | 'default'
  | 'focused'
  | 'pressed'
  | 'disabled';

export type IconType = 
  | 'home'
  | 'charts'
  | 'astro'
  | 'business'
  | 'calendar'
  | 'demo'
  | 'custom';

export interface NavigationConfig {
  variant: NavigationVariant;
  size: NavigationSize;
  state: NavigationState;
  hasGlow?: boolean;
  iconSize?: number;
  customBackground?: string;
}

export interface TabItemConfig {
  iconType: IconType;
  label: string;
  isActive: boolean;
  state: NavigationState;
  hasNotification?: boolean;
  customIcon?: string;
}

export interface NavigationStyles {
  container: ViewStyle;
  background: ViewStyle;
  tabItem: ViewStyle;
  activeTab: ViewStyle;
  iconContainer: ViewStyle;
  label: TextStyle;
  activeLabel: TextStyle;
  overlay?: ViewStyle;
  glow?: ViewStyle;
}

// =============================================================================
// NAVIGATION SYSTEM CONSTANTS
// =============================================================================

/**
 * Navigation size configurations
 */
const NAV_SIZES = {
  compact: {
    height: 60,
    iconSize: 20,
    fontSize: 10,
    padding: 8,
  },
  default: {
    height: 70,
    iconSize: 22,
    fontSize: 11,
    padding: 10,
  },
  comfortable: {
    height: 80,
    iconSize: 24,
    fontSize: 12,
    padding: 12,
  },
  spacious: {
    height: 90,
    iconSize: 26,
    fontSize: 13,
    padding: 14,
  },
} as const;

/**
 * Navigation color schemes for different variants
 */
const NAV_COLORS = {
  default: {
    background: DarkTheme.colors.cosmos.deep,
    border: DarkTheme.colors.neutral.muted,
    activeTab: DarkTheme.colors.brand.primary,
    inactiveTab: DarkTheme.colors.neutral.text,
    activeLabel: DarkTheme.colors.neutral.light,
    inactiveLabel: DarkTheme.colors.neutral.muted,
  },
  floating: {
    background: 'rgba(15, 15, 26, 0.95)',
    border: 'rgba(184, 184, 192, 0.2)',
    activeTab: DarkTheme.colors.brand.light,
    inactiveTab: DarkTheme.colors.neutral.text,
    activeLabel: DarkTheme.colors.brand.light,
    inactiveLabel: DarkTheme.colors.neutral.text,
  },
  cosmic: {
    background: 'linear-gradient(45deg, #08080F, #16213E)',
    border: DarkTheme.colors.brand.glow,
    activeTab: DarkTheme.colors.brand.glow,
    inactiveTab: DarkTheme.colors.neutral.text,
    activeLabel: DarkTheme.colors.brand.glow,
    inactiveLabel: DarkTheme.colors.neutral.light,
  },
  glass: {
    background: 'rgba(15, 15, 26, 0.8)',
    border: 'rgba(184, 184, 192, 0.15)',
    activeTab: DarkTheme.colors.mystical.light,
    inactiveTab: DarkTheme.colors.neutral.text,
    activeLabel: DarkTheme.colors.mystical.light,
    inactiveLabel: DarkTheme.colors.neutral.text,
  },
  premium: {
    background: 'linear-gradient(135deg, #533483, #2E86DE)',
    border: DarkTheme.colors.luxury.champagne,
    activeTab: DarkTheme.colors.luxury.pure,
    inactiveTab: DarkTheme.colors.neutral.light,
    activeLabel: DarkTheme.colors.luxury.pure,
    inactiveLabel: DarkTheme.colors.neutral.light,
  },
} as const;

/**
 * Navigation elevation and shadow effects
 */
const NAV_ELEVATION = {
  default: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  floating: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  cosmic: {
    shadowColor: DarkTheme.colors.brand.glow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  glass: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  premium: {
    shadowColor: DarkTheme.colors.luxury.pure,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
} as const;

// =============================================================================
// NAVIGATION SYSTEM CLASS
// =============================================================================

export class NavigationSystem {
  /**
   * Generate navigation styles based on configuration
   */
  static getNavigationStyles(config: NavigationConfig): NavigationStyles {
    const { variant, size, state, hasGlow } = config;
    
    const sizeConfig = NAV_SIZES[size];
    const colors = NAV_COLORS[variant];
    const elevation = NAV_ELEVATION[variant];
    
    const bottomInset = Platform.OS === 'ios' ? 34 : 16;
    const isFloating = variant === 'floating' || variant === 'glass';
    
    const container: ViewStyle = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
    };
    
    const background: ViewStyle = {
      flexDirection: 'row',
      backgroundColor: typeof colors.background === 'string' ? colors.background : DarkTheme.colors.cosmos.deep,
      height: sizeConfig.height + bottomInset,
      paddingTop: sizeConfig.padding,
      paddingBottom: bottomInset,
      paddingHorizontal: isFloating ? 16 : 0,
      marginHorizontal: isFloating ? 16 : 0,
      marginBottom: isFloating ? 16 : 0,
      borderTopWidth: isFloating ? 0 : 1,
      borderTopColor: colors.border,
      borderRadius: isFloating ? 24 : 0,
      ...elevation,
      opacity: state === 'disabled' ? 0.6 : 1,
      
      // Glass morphism effects for appropriate variants
      ...(variant === 'glass' && Platform.OS === 'ios' && {
        backdropFilter: 'blur(20px)',
      }),
    };
    
    const tabItem: ViewStyle = {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: sizeConfig.padding,
      borderRadius: isFloating ? 12 : 0,
    };
    
    const activeTab: ViewStyle = {
      ...tabItem,
      backgroundColor: isFloating ? 'rgba(46, 134, 222, 0.2)' : 'transparent',
      transform: [{ scale: state === 'pressed' ? 0.95 : 1 }],
    };
    
    const iconContainer: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    };
    
    const label: TextStyle = {
      fontSize: sizeConfig.fontSize,
      fontWeight: '500',
      color: colors.inactiveLabel,
      textAlign: 'center',
      letterSpacing: 0.1,
      lineHeight: sizeConfig.fontSize + 2,
    };
    
    const activeLabel: TextStyle = {
      ...label,
      fontWeight: '600',
      color: colors.activeLabel,
    };
    
    // Add glow effect if enabled
    const glow: ViewStyle | undefined = hasGlow ? {
      position: 'absolute',
      top: -4,
      left: -4,
      right: -4,
      bottom: -4,
      backgroundColor: colors.activeTab,
      opacity: 0.2,
      borderRadius: isFloating ? 28 : 4,
      zIndex: -1,
    } : undefined;
    
    // Add overlay for glass effect on Android
    const overlay: ViewStyle | undefined = (variant === 'glass' && Platform.OS === 'android') ? {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: isFloating ? 24 : 0,
    } : undefined;
    
    return {
      container,
      background,
      tabItem,
      activeTab,
      iconContainer,
      label,
      activeLabel,
      overlay,
      glow,
    };
  }
  
  /**
   * Get icon color based on tab state and navigation variant
   */
  static getIconColor(config: TabItemConfig, navVariant: NavigationVariant): string {
    const { isActive, state, iconType } = config;
    const colors = NAV_COLORS[navVariant];
    
    if (state === 'disabled') {
      return DarkTheme.colors.neutral.muted.toString();
    }
    
    if (isActive) {
      // Special colors for specific icon types
      if (iconType === 'astro') {
        return DarkTheme.colors.luxury.pure.toString();
      }
      return colors.activeTab.toString();
    }
    return colors.inactiveTab.toString();
  }
  
  /**
   * Validate navigation configuration
   */
  static validateConfig(config: NavigationConfig): boolean {
    try {
      const validVariants: NavigationVariant[] = ['default', 'floating', 'cosmic', 'glass', 'premium'];
      const validSizes: NavigationSize[] = ['compact', 'default', 'comfortable', 'spacious'];
      const validStates: NavigationState[] = ['default', 'focused', 'pressed', 'disabled'];
      
      return (
        validVariants.includes(config.variant) &&
        validSizes.includes(config.size) &&
        validStates.includes(config.state)
      );
    } catch (error) {
      console.warn('[NavigationSystem] Invalid configuration:', error);
      return false;
    }
  }
}

// =============================================================================
// NAVIGATION PRESETS
// =============================================================================

export const NavigationPresets = {
  /**
   * Default cosmic navigation with standard styling
   */
  default: (size: NavigationSize = 'default'): NavigationConfig => ({
    variant: 'default',
    size,
    state: 'default',
    hasGlow: false,
  }),
  
  /**
   * Floating navigation with glass morphism
   */
  floating: (size: NavigationSize = 'default'): NavigationConfig => ({
    variant: 'floating',
    size,
    state: 'default',
    hasGlow: false,
  }),
  
  /**
   * Premium cosmic navigation with glow effects
   */
  cosmic: (size: NavigationSize = 'default'): NavigationConfig => ({
    variant: 'cosmic',
    size,
    state: 'default',
    hasGlow: true,
  }),
  
  /**
   * Glass morphism navigation
   */
  glass: (size: NavigationSize = 'default'): NavigationConfig => ({
    variant: 'glass',
    size,
    state: 'default',
    hasGlow: false,
  }),
  
  /**
   * Premium navigation with gold accents
   */
  premium: (size: NavigationSize = 'default'): NavigationConfig => ({
    variant: 'premium',
    size,
    state: 'default',
    hasGlow: true,
  }),
};

// =============================================================================
// NAVIGATION UTILITIES
// =============================================================================

export const NavigationUtils = {
  /**
   * Get platform-specific bottom inset
   */
  getBottomInset: (): number => {
    return Platform.OS === 'ios' ? 34 : 16;
  },
  
  /**
   * Calculate navigation height including safe area
   */
  calculateHeight: (size: NavigationSize): number => {
    const sizeConfig = NAV_SIZES[size];
    const bottomInset = NavigationUtils.getBottomInset();
    return sizeConfig.height + bottomInset;
  },
  
  /**
   * Get icon size for navigation size
   */
  getIconSize: (size: NavigationSize): number => {
    return NAV_SIZES[size].iconSize;
  },
  
  /**
   * Generate haptic feedback for navigation interactions
   */
  triggerHapticFeedback: async (type: 'light' | 'medium' | 'heavy' = 'light'): Promise<void> => {
    try {
      if (Platform.OS === 'ios') {
        const { Haptics } = require('expo-haptics');
        const feedbackTypes = {
          light: Haptics.ImpactFeedbackStyle.Light,
          medium: Haptics.ImpactFeedbackStyle.Medium,
          heavy: Haptics.ImpactFeedbackStyle.Heavy,
        };
        await Haptics.impactAsync(feedbackTypes[type]);
      }
    } catch (error) {
      console.warn('[NavigationUtils] Haptic feedback not available:', error);
    }
  },
  
  /**
   * Test all navigation variants for validation
   */
  testAllVariants: (): boolean => {
    try {
      const variants: NavigationVariant[] = ['default', 'floating', 'cosmic', 'glass', 'premium'];
      const sizes: NavigationSize[] = ['compact', 'default', 'comfortable', 'spacious'];
      
      for (const variant of variants) {
        for (const size of sizes) {
          const config: NavigationConfig = {
            variant,
            size,
            state: 'default',
          };
          
          if (!NavigationSystem.validateConfig(config)) {
            return false;
          }
          
          NavigationSystem.getNavigationStyles(config);
        }
      }
      
      return true;
    } catch (error) {
      console.error('[NavigationUtils] Error testing variants:', error);
      return false;
    }
  },
};

// =============================================================================
// PERFORMANCE MONITORING
// =============================================================================

interface NavigationMetrics {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  cacheHitRate: number;
  totalNavigations: number;
}

class NavigationMetricsTracker {
  private metrics: NavigationMetrics = {
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
    cacheHitRate: 0,
    totalNavigations: 0,
  };
  
  private renderTimes: number[] = [];
  private styleCache = new Map<string, NavigationStyles>();
  
  trackRender(startTime: number): void {
    const renderTime = Date.now() - startTime;
    this.renderTimes.push(renderTime);
    this.metrics.renderCount++;
    this.metrics.lastRenderTime = renderTime;
    
    // Keep only last 100 render times for average calculation
    if (this.renderTimes.length > 100) {
      this.renderTimes.shift();
    }
    
    this.metrics.averageRenderTime = this.renderTimes.reduce((a, b) => a + b, 0) / this.renderTimes.length;
  }
  
  getMetrics(): NavigationMetrics {
    return { ...this.metrics };
  }
  
  clearCache(): void {
    this.styleCache.clear();
  }
}

export const navigationMetrics = new NavigationMetricsTracker();

/**
 * Get navigation performance metrics
 */
export const getNavigationMetrics = (): NavigationMetrics => {
  return navigationMetrics.getMetrics();
};

export default NavigationSystem;
