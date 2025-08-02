/**
 * Navigation Gradients - Corp Astro Design System
 * 
 * Navigation gradient definitions for headers, bottom navigation, and floating orb system.
 * Based on exact specifications from UI documentation.
 * 
 * @format
 */

export interface NavigationGradientConfig {
  colors: readonly string[];
  locations?: readonly number[];
  angle: number;
  type: 'linear' | 'radial';
  blur?: {
    enabled: boolean;
    amount: string;
  };
}

/**
 * Bottom navigation gradient for premium floating orbs
 * 
 * From UI Docs: "bottomNav: {
 *   background: {
 *     gradient: 'linear-gradient(180deg, rgba(8,8,15,0) 0%, rgba(8,8,15,0.9) 50%, #08080F 100%)',
 *     blur: 'blur(30px)'
 *   }
 * }"
 */
export const bottomNavigationGradient: NavigationGradientConfig = {
  colors: ['rgba(8,8,15,0)', 'rgba(8,8,15,0.9)', '#08080F'] as const,
  locations: [0, 0.5, 1] as const,
  angle: 180,
  type: 'linear',
  blur: {
    enabled: true,
    amount: 'blur(30px)'
  }
};

/**
 * Bottom navigation container gradient (glass morphism)
 * 
 * From UI Docs: "bottomNav: {
 *   container: {
 *     background: 'rgba(22,33,62,0.3)',
 *     backdropFilter: 'blur(20px)'
 *   }
 * }"
 */
export const bottomNavigationContainerGradient: NavigationGradientConfig = {
  colors: ['rgba(22,33,62,0.3)', 'rgba(22,33,62,0.3)'] as const,
  locations: [0, 1] as const,
  angle: 180,
  type: 'linear',
  blur: {
    enabled: true,
    amount: 'blur(20px)'
  }
};

/**
 * Active navigation item radial gradient
 * 
 * From UI Docs: "bottomNav: {
 *   items: {
 *     active: {
 *       background: 'radial-gradient(circle, rgba(46,134,222,0.3) 0%, transparent 70%)'
 *     }
 *   }
 * }"
 */
export const activeNavigationItemGradient: NavigationGradientConfig = {
  colors: ['rgba(46,134,222,0.3)', 'transparent'] as const,
  locations: [0, 0.7] as const,
  angle: 0, // Not used for radial
  type: 'radial'
};

/**
 * Header gradient with cosmic blur
 * 
 * From UI Docs: "Platform-Specific Guidelines .md":
 * "Background: Blur with cosmic gradient   Tint: Corp Blue (#2E86DE)"
 */
export const headerGradient: NavigationGradientConfig = {
  colors: ['rgba(8,8,15,0.9)', 'rgba(22,33,62,0.6)'] as const,
  locations: [0, 1] as const,
  angle: 180,
  type: 'linear',
  blur: {
    enabled: true,
    amount: 'blur(30px)'
  }
};

/**
 * Header overlay gradient for scroll transitions
 * 
 * From UI Docs: "Platform-Specific Guidelines .md":
 * "Background: Transparent with gradient overlay"
 */
export const headerOverlayGradient: NavigationGradientConfig = {
  colors: ['transparent', 'rgba(8,8,15,0.8)'] as const,
  locations: [0, 1] as const,
  angle: 180,
  type: 'linear',
  blur: {
    enabled: true,
    amount: 'blur(20px)'
  }
};

/**
 * Tab navigation gradient
 * 
 * From UI Docs: "Separator: Subtle gradient line"
 */
export const tabNavigationGradient: NavigationGradientConfig = {
  colors: ['rgba(46,134,222,0.2)', 'rgba(46,134,222,0.05)'] as const,
  locations: [0, 1] as const,
  angle: 90,
  type: 'linear'
};

/**
 * Tab indicator gradient (active tab)
 */
export const tabIndicatorGradient: NavigationGradientConfig = {
  colors: ['#2E86DE', '#54A0FF'] as const,
  locations: [0, 1] as const,
  angle: 135,
  type: 'linear'
};

/**
 * Floating orb navigation gradient
 * 
 * From UI Docs: "floatingActionButton: {
 *   gradient: 'radial-gradient(circle, #2E86DE 0%, #533483 100%)'
 * }"
 */
export const floatingOrbGradient: NavigationGradientConfig = {
  colors: ['#2E86DE', '#533483'] as const,
  locations: [0, 1] as const,
  angle: 0, // Not used for radial
  type: 'radial'
};

/**
 * Drawer/Sidebar navigation gradient
 */
export const drawerGradient: NavigationGradientConfig = {
  colors: ['rgba(15,15,26,0.95)', 'rgba(8,8,15,0.95)'] as const,
  locations: [0, 1] as const,
  angle: 135,
  type: 'linear',
  blur: {
    enabled: true,
    amount: 'blur(40px)'
  }
};

/**
 * Search header gradient
 */
export const searchHeaderGradient: NavigationGradientConfig = {
  colors: ['rgba(22,33,62,0.4)', 'rgba(15,15,26,0.4)'] as const,
  locations: [0, 1] as const,
  angle: 180,
  type: 'linear',
  blur: {
    enabled: true,
    amount: 'blur(25px)'
  }
};

/**
 * Navigation gradient variants collection
 */
export const navigationGradients = {
  bottomNavigation: {
    background: bottomNavigationGradient,
    container: bottomNavigationContainerGradient,
    activeItem: activeNavigationItemGradient
  },
  header: {
    primary: headerGradient,
    overlay: headerOverlayGradient,
    search: searchHeaderGradient
  },
  tabs: {
    navigation: tabNavigationGradient,
    indicator: tabIndicatorGradient
  },
  floating: {
    orb: floatingOrbGradient
  },
  drawer: {
    background: drawerGradient
  }
} as const;

/**
 * CSS string generation for React Native LinearGradient
 */
export const generateNavigationGradientCSS = (
  category: keyof typeof navigationGradients,
  variant: string
): string => {
  const gradient = (navigationGradients[category] as any)[variant];
  
  if (!gradient) {
    throw new Error(`Navigation gradient not found: ${category}.${variant}`);
  }
  
  if (gradient.type === 'radial') {
    const colorStops = gradient.colors.map((color: string, index: number) => 
      `${color} ${Math.round((gradient.locations?.[index] || index / (gradient.colors.length - 1)) * 100)}%`
    ).join(', ');
    return `radial-gradient(circle, ${colorStops})`;
  } else {
    const colorStops = gradient.colors.map((color: string, index: number) => 
      `${color} ${Math.round((gradient.locations?.[index] || index / (gradient.colors.length - 1)) * 100)}%`
    ).join(', ');
    return `linear-gradient(${gradient.angle}deg, ${colorStops})`;
  }
};

/**
 * React Native LinearGradient props
 */
export const getNavigationGradientProps = (
  category: keyof typeof navigationGradients,
  variant: string
) => {
  const gradient = (navigationGradients[category] as any)[variant];
  
  if (!gradient) {
    throw new Error(`Navigation gradient not found: ${category}.${variant}`);
  }
  
  if (gradient.type === 'radial') {
    return {
      colors: gradient.colors,
      locations: gradient.locations,
      start: { x: 0.5, y: 0.5 },
      end: { x: 1, y: 1 }
    };
  } else {
    const angleRadians = (gradient.angle * Math.PI) / 180;
    return {
      colors: gradient.colors,
      locations: gradient.locations,
      start: { x: 0, y: 0 },
      end: { 
        x: Math.cos(angleRadians), 
        y: Math.sin(angleRadians) 
      },
      angle: gradient.angle
    };
  }
};

/**
 * Type definitions
 */
export type NavigationGradientCategory = keyof typeof navigationGradients;

/**
 * Validation utilities
 */
export const validateNavigationGradient = (gradient: NavigationGradientConfig): boolean => {
  return (
    gradient.colors.length >= 2 &&
    (!gradient.locations || gradient.colors.length === gradient.locations.length) &&
    gradient.angle >= 0 && gradient.angle <= 360 &&
    ['linear', 'radial'].includes(gradient.type)
  );
};

export default navigationGradients;
