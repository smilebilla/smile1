/**
 * Royal Purples Color System
 * 
 * Mystical purple color palette for Corp Astro representing mystery, luxury, and transformation.
 * These purples embody "Ancient wisdom in modern form" - the transformative and special
 * elements that transcend the ordinary.
 * 
 * Usage Guidelines:
 * - Deep: From gradient - deep accents and transformative elements
 * - Royal: Primary purple for mystical elements and premium features
 * - Light: Light purple for backgrounds and subtle mystical touches
 * - Glow: Purple glow effects and atmospheric mystical elements
 * 
 * @fileoverview Royal Purples color tokens implementing Corp Astro's mystical design language
 * @author Corp Astro Design System
 * @version 1.0.0
 */

import { ColorValue } from 'react-native';

/**
 * Royal Purples Color System
 * 
 * Mystical purple palette representing mystery, luxury, and transformation.
 * Used for mystical elements, premium features, and transformative experiences.
 * 
 * Color Psychology: Deep purple = Transformative/Special
 * Brand Message: "Ancient wisdom in modern form"
 */
export const RoyalPurples = {
  /**
   * Deep Mystic Purple - Transformative Elements
   * 
   * Deep purple from the hero gradient representing transformation and mystery.
   * Used for deep accents, transformative UI elements, and mystical backgrounds.
   * 
   * Emotional mapping: Mystery, Luxury, Transformation
   * Usage: Deep accents, transformative elements, mystical backgrounds
   * 
   * @color #533483
   * @gradient-origin From hero gradient - deep mystical layer
   * @accessibility Tested for contrast with light text
   */
  deep: '#533483' as ColorValue,

  /**
   * Royal Purple - Primary Mystical Color
   * 
   * Primary purple for mystical elements and premium features.
   * Represents the core mystical identity of Corp Astro.
   * 
   * Usage: Primary purple, mystical elements, premium features
   * 
   * @color #6C5CE7
   * @glow-effect Creates purple glow: '0 0 20px rgba(108, 92, 231, 0.5)'
   * @accessibility WCAG AA compliant with appropriate backgrounds
   */
  royal: '#6C5CE7' as ColorValue,

  /**
   * Light Mystic Purple - Subtle Backgrounds
   * 
   * Light purple variant for backgrounds and subtle mystical touches.
   * Provides mystical atmosphere without overwhelming the interface.
   * 
   * Usage: Light purple backgrounds, subtle mystical elements
   * 
   * @color #A29BFE
   * @tone Softer purple for background elements
   * @accessibility Suitable for backgrounds with dark text
   */
  light: '#A29BFE' as ColorValue,

  /**
   * Glow Mystic Purple - Atmospheric Effects
   * 
   * Purple glow effects and atmospheric mystical elements.
   * Creates the signature Corp Astro mystical luminous experience.
   * 
   * Usage: Purple glow effects, atmospheric elements, mystical highlights
   * 
   * @color #DDA0FF
   * @effect Creates mystical glow and atmospheric effects
   * @tone Lighter purple with enhanced luminosity
   */
  glow: '#DDA0FF' as ColorValue,
} as const;

/**
 * Type definition for Royal Purples color keys
 */
export type RoyalPurplesKey = keyof typeof RoyalPurples;

/**
 * Type definition for Royal Purples color values
 */
export type RoyalPurplesValue = typeof RoyalPurples[RoyalPurplesKey];

/**
 * Royal Purples color entries for iteration
 */
export const RoyalPurplesEntries = Object.entries(RoyalPurples) as Array<[RoyalPurplesKey, RoyalPurplesValue]>;

/**
 * Royal Purples color keys array
 */
export const RoyalPurplesKeys = Object.keys(RoyalPurples) as RoyalPurplesKey[];

/**
 * Royal Purples color values array
 */
export const RoyalPurplesValues = Object.values(RoyalPurples) as RoyalPurplesValue[];

/**
 * Default export for convenient importing
 */
export default RoyalPurples;
