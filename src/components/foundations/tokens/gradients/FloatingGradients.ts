/**
 * Floating Gradients - Corp Astro Design System
 * 
 * Floating element gradient definitions for FABs, floating orbs, and particle systems.
 * Based on exact specifications from UI documentation.
 * 
 * @format
 */

export interface FloatingGradientConfig {
  colors: readonly string[];
  locations?: readonly number[];
  angle: number;
  type: 'linear' | 'radial';
  animation?: {
    enabled: boolean;
    type: 'pulse' | 'rotate' | 'glow' | 'orbit';
    duration: string;
    easing: string;
    iteration: 'infinite' | number;
  };
  glow?: {
    enabled: boolean;
    color: string;
    blur: number;
    spread: number;
  };
}

/**
 * Floating Action Button radial gradient
 * 
 * From UI Docs: "floatingActionButton: {
 *   gradient: 'radial-gradient(circle, #2E86DE 0%, #533483 100%)',
 *   animation: 'pulse-glow 2s ease-in-out infinite',
 *   shadow: '0 8px 40px rgba(46,134,222,0.5)'
 * }"
 */
export const floatingActionButtonGradient: FloatingGradientConfig = {
  colors: ['#2E86DE', '#533483'] as const,
  locations: [0, 1] as const,
  angle: 0, // Not used for radial
  type: 'radial',
  animation: {
    enabled: true,
    type: 'pulse',
    duration: '2s',
    easing: 'ease-in-out',
    iteration: 'infinite'
  },
  glow: {
    enabled: true,
    color: 'rgba(46,134,222,0.5)',
    blur: 40,
    spread: 8
  }
};

/**
 * Floating orb gradient for navigation system
 * 
 * From UI Docs: "FloatingOrb.tsx: {
 *   background: 'radial-gradient(circle, rgba(46,134,222,0.8) 0%, rgba(46,134,222,0) 70%)',
 *   animation: {
 *     float: duration: '6s', timing: 'ease-in-out',
 *     rotate: duration: '20s', timing: 'linear',
 *     pulse: duration: '3s', timing: 'ease-in-out'
 *   }
 * }"
 */
export const floatingOrbGradient: FloatingGradientConfig = {
  colors: ['rgba(46,134,222,0.8)', 'rgba(46,134,222,0)'] as const,
  locations: [0, 0.7] as const,
  angle: 0, // Not used for radial
  type: 'radial',
  animation: {
    enabled: true,
    type: 'pulse',
    duration: '3s',
    easing: 'ease-in-out',
    iteration: 'infinite'
  },
  glow: {
    enabled: true,
    color: 'rgba(46,134,222,0.6)',
    blur: 30,
    spread: 5
  }
};

/**
 * Floating trail gradient for particle effects
 * 
 * From UI Docs: "FloatingTrail.tsx: {
 *   enabled: true,
 *   length: 5,
 *   opacity: [0.5, 0.3, 0.2, 0.1, 0.05],
 *   blur: [0, 1, 2, 3, 4]
 * }"
 */
export const floatingTrailGradient: FloatingGradientConfig = {
  colors: [
    'rgba(46,134,222,0.5)',
    'rgba(46,134,222,0.3)',
    'rgba(46,134,222,0.2)',
    'rgba(46,134,222,0.1)',
    'rgba(46,134,222,0.05)'
  ] as const,
  locations: [0, 0.25, 0.5, 0.75, 1] as const,
  angle: 0,
  type: 'radial',
  animation: {
    enabled: true,
    type: 'glow',
    duration: '1.5s',
    easing: 'ease-in-out',
    iteration: 'infinite'
  }
};

/**
 * Particle system gradient
 * 
 * From UI Docs: "ParticleSystem.tsx: {
 *   particle: {
 *     color: 'rgba(46,134,222,0.6)',
 *     glow: '0 0 8px rgba(46,134,222,0.8)'
 *   }
 * }"
 */
export const particleSystemGradient: FloatingGradientConfig = {
  colors: ['rgba(46,134,222,0.6)', 'rgba(46,134,222,0.2)'] as const,
  locations: [0, 1] as const,
  angle: 0,
  type: 'radial',
  glow: {
    enabled: true,
    color: 'rgba(46,134,222,0.8)',
    blur: 8,
    spread: 0
  }
};

/**
 * Floating element glow gradient
 */
export const floatingGlowGradient: FloatingGradientConfig = {
  colors: ['rgba(46,134,222,0.8)', 'rgba(46,134,222,0.2)', 'transparent'] as const,
  locations: [0, 0.5, 1] as const,
  angle: 0,
  type: 'radial',
  animation: {
    enabled: true,
    type: 'pulse',
    duration: '2.5s',
    easing: 'ease-in-out',
    iteration: 'infinite'
  }
};

/**
 * Mini floating action button gradient
 * 
 * From UI Docs: "floatingActionButton: {
 *   mini: { size: 48, iconSize: 20 }
 * }"
 */
export const miniFloatingActionButtonGradient: FloatingGradientConfig = {
  colors: ['#2E86DE', '#533483'] as const,
  locations: [0, 1] as const,
  angle: 0,
  type: 'radial',
  animation: {
    enabled: true,
    type: 'pulse',
    duration: '2.5s',
    easing: 'ease-in-out',
    iteration: 'infinite'
  },
  glow: {
    enabled: true,
    color: 'rgba(46,134,222,0.4)',
    blur: 30,
    spread: 6
  }
};

/**
 * Floating connection gradient for particle connections
 * 
 * From UI Docs: "ParticleConnections.tsx: {
 *   color: 'rgba(46,134,222,0.2)',
 *   width: 1
 * }"
 */
export const floatingConnectionGradient: FloatingGradientConfig = {
  colors: ['rgba(46,134,222,0.2)', 'rgba(46,134,222,0.05)'] as const,
  locations: [0, 1] as const,
  angle: 90,
  type: 'linear',
  animation: {
    enabled: true,
    type: 'glow',
    duration: '4s',
    easing: 'ease-in-out',
    iteration: 'infinite'
  }
};

/**
 * Hover interaction gradient for floating elements
 */
export const floatingHoverGradient: FloatingGradientConfig = {
  colors: ['rgba(46,134,222,0.9)', 'rgba(83,52,131,0.9)'] as const,
  locations: [0, 1] as const,
  angle: 0,
  type: 'radial',
  animation: {
    enabled: true,
    type: 'pulse',
    duration: '1.5s',
    easing: 'ease-in-out',
    iteration: 'infinite'
  },
  glow: {
    enabled: true,
    color: 'rgba(46,134,222,0.8)',
    blur: 50,
    spread: 10
  }
};

/**
 * Floating gradient variants collection
 */
export const floatingGradients = {
  fab: {
    normal: floatingActionButtonGradient,
    mini: miniFloatingActionButtonGradient,
    hover: floatingHoverGradient
  },
  orb: {
    normal: floatingOrbGradient,
    glow: floatingGlowGradient
  },
  particle: {
    system: particleSystemGradient,
    trail: floatingTrailGradient,
    connection: floatingConnectionGradient
  }
} as const;

/**
 * CSS string generation for React Native LinearGradient
 */
export const generateFloatingGradientCSS = (
  category: keyof typeof floatingGradients,
  variant: string
): string => {
  const gradient = (floatingGradients[category] as any)[variant];
  
  if (!gradient) {
    throw new Error(`Floating gradient not found: ${category}.${variant}`);
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
export const getFloatingGradientProps = (
  category: keyof typeof floatingGradients,
  variant: string
) => {
  const gradient = (floatingGradients[category] as any)[variant];
  
  if (!gradient) {
    throw new Error(`Floating gradient not found: ${category}.${variant}`);
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
 * Animation properties for floating elements
 */
export const getFloatingAnimationProps = (
  category: keyof typeof floatingGradients,
  variant: string
) => {
  const gradient = (floatingGradients[category] as any)[variant];
  
  if (!gradient?.animation?.enabled) {
    return null;
  }
  
  return {
    type: gradient.animation.type,
    duration: gradient.animation.duration,
    easing: gradient.animation.easing,
    iteration: gradient.animation.iteration
  };
};

/**
 * Glow properties for floating elements
 */
export const getFloatingGlowProps = (
  category: keyof typeof floatingGradients,
  variant: string
) => {
  const gradient = (floatingGradients[category] as any)[variant];
  
  if (!gradient?.glow?.enabled) {
    return null;
  }
  
  return {
    color: gradient.glow.color,
    blur: gradient.glow.blur,
    spread: gradient.glow.spread
  };
};

/**
 * Type definitions
 */
export type FloatingGradientCategory = keyof typeof floatingGradients;

/**
 * Validation utilities
 */
export const validateFloatingGradient = (gradient: FloatingGradientConfig): boolean => {
  return (
    gradient.colors.length >= 2 &&
    (!gradient.locations || gradient.colors.length === gradient.locations.length) &&
    gradient.angle >= 0 && gradient.angle <= 360 &&
    ['linear', 'radial'].includes(gradient.type)
  );
};

export default floatingGradients;
