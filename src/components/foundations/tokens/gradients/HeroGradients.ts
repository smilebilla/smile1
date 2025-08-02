/**
 * Hero Gradients - Corp Astro Design System
 * 
 * Hero background gradient definitions for main screens and feature sections.
 * Based on exact specifications from UI documentation.
 * 
 * @format
 */

export interface HeroGradientConfig {
  colors: readonly string[];
  locations: readonly number[];
  angle: number;
  noiseTexture?: {
    enabled: boolean;
    opacity: number;
    url: string;
  };
}

/**
 * Primary hero gradient for main backgrounds and feature sections
 * 
 * From UI Docs: "heroGradient: {
 *   colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
 *   locations: [0, 0.3, 0.7, 1],
 *   angle: 135,
 *   // Add noise texture overlay at 5% opacity for depth
 * }"
 */
export const heroGradient: HeroGradientConfig = {
  colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483'] as const,
  locations: [0, 0.3, 0.7, 1] as const,
  angle: 135,
  noiseTexture: {
    enabled: true,
    opacity: 0.05,
    url: 'noise.png'
  }
};

/**
 * Alternative hero gradient for cards and elevated surfaces
 * 
 * From UI Docs: "heroCard: {
 *   background: {
 *     gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #533483 100%)',
 *     noise: 'url(noise.png) 5% opacity'
 *   }
 * }"
 */
export const heroCardGradient: HeroGradientConfig = {
  colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483'] as const,
  locations: [0, 0.3, 0.7, 1] as const,
  angle: 135,
  noiseTexture: {
    enabled: true,
    opacity: 0.05,
    url: 'noise.png'
  }
};

/**
 * Subtle hero gradient for section backgrounds
 * Lighter opacity version for layered designs
 */
export const heroSectionGradient: HeroGradientConfig = {
  colors: ['rgba(26,26,46,0.8)', 'rgba(22,33,62,0.8)', 'rgba(15,52,96,0.8)', 'rgba(83,52,131,0.8)'] as const,
  locations: [0, 0.3, 0.7, 1] as const,
  angle: 135,
  noiseTexture: {
    enabled: true,
    opacity: 0.03,
    url: 'noise.png'
  }
};

/**
 * Hero gradient variants for different contexts
 */
export const heroGradients = {
  primary: heroGradient,
  card: heroCardGradient,
  section: heroSectionGradient
} as const;

/**
 * CSS string generation for React Native LinearGradient
 */
export const generateHeroGradientCSS = (variant: keyof typeof heroGradients = 'primary'): string => {
  const gradient = heroGradients[variant];
  const colorStops = gradient.colors.map((color, index) => 
    `${color} ${Math.round(gradient.locations[index] * 100)}%`
  ).join(', ');
  
  return `linear-gradient(${gradient.angle}deg, ${colorStops})`;
};

/**
 * React Native LinearGradient props
 */
export const getHeroGradientProps = (variant: keyof typeof heroGradients = 'primary') => {
  const gradient = heroGradients[variant];
  
  return {
    colors: gradient.colors,
    locations: gradient.locations,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 }, // 135 degree equivalent
    angle: gradient.angle
  };
};

/**
 * Type definitions
 */
export type HeroGradientVariant = keyof typeof heroGradients;

/**
 * Validation utilities
 */
export const validateHeroGradient = (gradient: HeroGradientConfig): boolean => {
  return (
    gradient.colors.length === gradient.locations.length &&
    gradient.colors.length >= 2 &&
    gradient.locations.every((loc, index) => 
      loc >= 0 && loc <= 1 && (index === 0 || loc > gradient.locations[index - 1])
    ) &&
    gradient.angle >= 0 && gradient.angle <= 360
  );
};

export default heroGradients;
