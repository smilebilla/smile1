/**
 * Professional Grays Color System
 * 
 * Professional gray and white color palette for Corp Astro's text hierarchy and UI elements.
 * These grays provide the foundation for readable, accessible text and subtle UI elements
 * that maintain professionalism while supporting the cosmic aesthetic.
 * 
 * Usage Guidelines:
 * - White: Pure white for maximum contrast elements
 * - Light: Light gray for light text on dark backgrounds
 * - Medium: Medium gray for secondary text and subtle elements
 * - Text: Default text color for primary readability
 * - Muted: Disabled states and subtle, non-essential elements
 * 
 * @fileoverview Professional Grays color tokens implementing Corp Astro's text hierarchy
 * @author Corp Astro Design System
 * @version 1.0.0
 */

import { ColorValue } from 'react-native';

/**
 * Professional Grays Color System
 * 
 * Professional gray and white palette for text hierarchy and UI elements.
 * Provides accessible, readable text colors that maintain professionalism
 * while supporting the cosmic design aesthetic.
 */
export const ProfessionalGrays = {
  /**
   * Pure White - Maximum Contrast
   * 
   * Pure white for maximum contrast elements, primary text on dark backgrounds,
   * and high-impact UI elements that need absolute clarity.
   * 
   * Usage: Pure white text, maximum contrast elements, primary highlights
   * 
   * @color #FFFFFF
   * @contrast Maximum contrast against dark backgrounds
   * @accessibility WCAG AAA compliant against dark backgrounds
   */
  white: '#FFFFFF' as ColorValue,

  /**
   * Light Gray - Light Text on Dark
   * 
   * Light gray for light text on dark backgrounds and subtle highlights.
   * Provides softer contrast than pure white while maintaining readability.
   * 
   * Usage: Light text on dark backgrounds, subtle highlights
   * 
   * @color #F8F9FA
   * @tone Subtle, soft gray with excellent readability
   * @accessibility Tested for contrast compliance
   */
  light: '#F8F9FA' as ColorValue,

  /**
   * Medium Gray - Secondary Text
   * 
   * Medium gray for secondary text, UI element borders, and subtle separators.
   * Provides visual hierarchy without overwhelming the primary content.
   * 
   * Usage: Secondary text, UI borders, subtle separators
   * 
   * @color #E9ECEF
   * @hierarchy Secondary level in text hierarchy
   * @accessibility Appropriate for secondary content
   */
  medium: '#E9ECEF' as ColorValue,

  /**
   * Text Gray - Default Text Color
   * 
   * Default text color for primary readability and main content.
   * Balanced gray that provides excellent readability while maintaining
   * the professional aesthetic.
   * 
   * Usage: Default text color, primary content, readable text
   * 
   * @color #B8B8C0
   * @hierarchy Primary text level
   * @accessibility Optimized for readability and eye comfort
   */
  text: '#B8B8C0' as ColorValue,

  /**
   * Muted Gray - Disabled States
   * 
   * Muted gray for disabled states, placeholder text, and non-essential
   * elements that should recede into the background.
   * 
   * Usage: Disabled states, placeholder text, non-essential elements
   * 
   * @color #6C757D
   * @state Disabled, inactive, placeholder
   * @accessibility Appropriate for inactive elements
   */
  muted: '#6C757D' as ColorValue,
} as const;

/**
 * Type definition for Professional Grays color keys
 */
export type ProfessionalGraysKey = keyof typeof ProfessionalGrays;

/**
 * Type definition for Professional Grays color values
 */
export type ProfessionalGraysValue = typeof ProfessionalGrays[ProfessionalGraysKey];

/**
 * Professional Grays color entries for iteration
 */
export const ProfessionalGraysEntries = Object.entries(ProfessionalGrays) as Array<[ProfessionalGraysKey, ProfessionalGraysValue]>;

/**
 * Professional Grays color keys array
 */
export const ProfessionalGraysKeys = Object.keys(ProfessionalGrays) as ProfessionalGraysKey[];

/**
 * Professional Grays color values array
 */
export const ProfessionalGraysValues = Object.values(ProfessionalGrays) as ProfessionalGraysValue[];

/**
 * Default export for convenient importing
 */
export default ProfessionalGrays;
