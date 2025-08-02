/**
 * Button Gradients - Corp Astro Design System
 * 
 * Button gradient definitions for all button variants and states.
 * Based on exact specifications from UI documentation.
 * 
 * @format
 */

export interface ButtonGradientConfig {
  colors: readonly string[];
  locations?: readonly number[];
  angle: number;
  type: 'linear' | 'radial';
  shadow?: {
    color: string;
    offset: { x: number; y: number };
    blur: number;
    spread: number;
  };
}

/**
 * Primary button gradient for main CTA buttons
 * 
 * From UI Docs: "primaryButton: {
 *   background: 'linear-gradient(135deg, #2E86DE 0%, #5758BB 100%)',
 *   hover: { backgroundShift: 'linear-gradient(135deg, #54A0FF 0%, #6C5CE7 100%)' }
 * }"
 */
export const primaryButtonGradient: ButtonGradientConfig = {
  colors: ['#2E86DE', '#5758BB'] as const,
  locations: [0, 1] as const,
  angle: 135,
  type: 'linear',
  shadow: {
    color: 'rgba(46,134,222,0.4)',
    offset: { x: 0, y: 8 },
    blur: 32,
    spread: 0
  }
};

/**
 * Primary button hover gradient
 */
export const primaryButtonHoverGradient: ButtonGradientConfig = {
  colors: ['#54A0FF', '#6C5CE7'] as const,
  locations: [0, 1] as const,
  angle: 135,
  type: 'linear',
  shadow: {
    color: 'rgba(46,134,222,0.6)',
    offset: { x: 0, y: 12 },
    blur: 40,
    spread: 0
  }
};

/**
 * Secondary button gradient (glass morphism style)
 * 
 * From UI Docs: "secondaryButton: {
 *   background: 'rgba(22,33,62,0.2)',
 *   border: '1px solid rgba(46,134,222,0.3)',
 *   backdropFilter: 'blur(10px)'
 * }"
 */
export const secondaryButtonGradient: ButtonGradientConfig = {
  colors: ['rgba(22,33,62,0.2)', 'rgba(22,33,62,0.2)'] as const,
  locations: [0, 1] as const,
  angle: 135,
  type: 'linear',
  shadow: {
    color: 'rgba(46,134,222,0.2)',
    offset: { x: 0, y: 4 },
    blur: 20,
    spread: 0
  }
};

/**
 * Secondary button hover gradient
 */
export const secondaryButtonHoverGradient: ButtonGradientConfig = {
  colors: ['rgba(46,134,222,0.1)', 'rgba(46,134,222,0.1)'] as const,
  locations: [0, 1] as const,
  angle: 135,
  type: 'linear',
  shadow: {
    color: 'rgba(46,134,222,0.3)',
    offset: { x: 0, y: 6 },
    blur: 24,
    spread: 0
  }
};

/**
 * Ghost button gradient (transparent with subtle glow)
 * 
 * From UI Docs: "ghostButton: {
 *   background: 'transparent',
 *   hover: { background: 'rgba(255,255,255,0.05)' }
 * }"
 */
export const ghostButtonGradient: ButtonGradientConfig = {
  colors: ['transparent', 'transparent'] as const,
  locations: [0, 1] as const,
  angle: 135,
  type: 'linear',
  shadow: {
    color: 'rgba(46,134,222,0.1)',
    offset: { x: 0, y: 2 },
    blur: 8,
    spread: 0
  }
};

/**
 * Ghost button hover gradient
 */
export const ghostButtonHoverGradient: ButtonGradientConfig = {
  colors: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.05)'] as const,
  locations: [0, 1] as const,
  angle: 135,
  type: 'linear',
  shadow: {
    color: 'rgba(46,134,222,0.2)',
    offset: { x: 0, y: 4 },
    blur: 16,
    spread: 0
  }
};

/**
 * Floating Action Button radial gradient
 * 
 * From UI Docs: "floatingActionButton: {
 *   gradient: 'radial-gradient(circle, #2E86DE 0%, #533483 100%)',
 *   animation: 'pulse-glow 2s ease-in-out infinite'
 * }"
 */
export const floatingActionButtonGradient: ButtonGradientConfig = {
  colors: ['#2E86DE', '#533483'] as const,
  locations: [0, 1] as const,
  angle: 0, // Not used for radial
  type: 'radial',
  shadow: {
    color: 'rgba(46,134,222,0.5)',
    offset: { x: 0, y: 8 },
    blur: 40,
    spread: 0
  }
};

/**
 * Destructive button gradient (warning/error actions)
 */
export const destructiveButtonGradient: ButtonGradientConfig = {
  colors: ['#E74C3C', '#C0392B'] as const,
  locations: [0, 1] as const,
  angle: 135,
  type: 'linear',
  shadow: {
    color: 'rgba(231,76,60,0.4)',
    offset: { x: 0, y: 8 },
    blur: 32,
    spread: 0
  }
};

/**
 * Success button gradient (confirmation actions)
 */
export const successButtonGradient: ButtonGradientConfig = {
  colors: ['#27AE60', '#229954'] as const,
  locations: [0, 1] as const,
  angle: 135,
  type: 'linear',
  shadow: {
    color: 'rgba(39,174,96,0.4)',
    offset: { x: 0, y: 8 },
    blur: 32,
    spread: 0
  }
};

/**
 * Button gradient variants collection
 */
export const buttonGradients = {
  primary: {
    normal: primaryButtonGradient,
    hover: primaryButtonHoverGradient
  },
  secondary: {
    normal: secondaryButtonGradient,
    hover: secondaryButtonHoverGradient
  },
  ghost: {
    normal: ghostButtonGradient,
    hover: ghostButtonHoverGradient
  },
  floating: {
    normal: floatingActionButtonGradient,
    hover: floatingActionButtonGradient // Same for FAB
  },
  destructive: {
    normal: destructiveButtonGradient,
    hover: destructiveButtonGradient
  },
  success: {
    normal: successButtonGradient,
    hover: successButtonGradient
  }
} as const;

/**
 * CSS string generation for React Native LinearGradient
 */
export const generateButtonGradientCSS = (
  variant: keyof typeof buttonGradients,
  state: 'normal' | 'hover' = 'normal'
): string => {
  const gradient = buttonGradients[variant][state];
  
  if (gradient.type === 'radial') {
    const colorStops = gradient.colors.map((color, index) => 
      `${color} ${Math.round((gradient.locations?.[index] || index / (gradient.colors.length - 1)) * 100)}%`
    ).join(', ');
    return `radial-gradient(circle, ${colorStops})`;
  } else {
    const colorStops = gradient.colors.map((color, index) => 
      `${color} ${Math.round((gradient.locations?.[index] || index / (gradient.colors.length - 1)) * 100)}%`
    ).join(', ');
    return `linear-gradient(${gradient.angle}deg, ${colorStops})`;
  }
};

/**
 * React Native LinearGradient props
 */
export const getButtonGradientProps = (
  variant: keyof typeof buttonGradients,
  state: 'normal' | 'hover' = 'normal'
) => {
  const gradient = buttonGradients[variant][state];
  
  if (gradient.type === 'radial') {
    return {
      colors: gradient.colors,
      locations: gradient.locations,
      start: { x: 0.5, y: 0.5 },
      end: { x: 1, y: 1 }
    };
  } else {
    return {
      colors: gradient.colors,
      locations: gradient.locations,
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 }, // 135 degree equivalent
      angle: gradient.angle
    };
  }
};

/**
 * Type definitions
 */
export type ButtonGradientVariant = keyof typeof buttonGradients;
export type ButtonGradientState = 'normal' | 'hover';

/**
 * Validation utilities
 */
export const validateButtonGradient = (gradient: ButtonGradientConfig): boolean => {
  return (
    gradient.colors.length >= 2 &&
    (!gradient.locations || gradient.colors.length === gradient.locations.length) &&
    gradient.angle >= 0 && gradient.angle <= 360 &&
    ['linear', 'radial'].includes(gradient.type)
  );
};

export default buttonGradients;
