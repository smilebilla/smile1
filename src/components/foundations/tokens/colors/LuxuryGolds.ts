/**
 * Luxury Golds Color System
 * 
 * Premium gold color palette for Corp Astro representing success, enlightenment, and luxury.
 * These golds embody "Celestial guidance to golden opportunities" - used sparingly for 
 * maximum impact to elevate the user experience.
 * 
 * Usage Guidelines:
 * - Pure: Premium features and achievements - the primary luxury gold
 * - Champagne: Soft gold accents for subtle elegance
 * - Bronze: Darker gold for depth and sophisticated contrast
 * - Shimmer: Light gold for highlights and luminous effects
 * 
 * Color Temperature: Hot (gold) = Urgent/Important
 * Design Rule: "Gold is precious - use sparingly for maximum impact"
 * 
 * @fileoverview Luxury Golds color tokens implementing Corp Astro's premium design language
 * @author Corp Astro Design System
 * @version 1.0.0
 */

import { ColorValue } from 'react-native';

/**
 * Luxury Golds Color System
 * 
 * Premium gold palette representing success, enlightenment, and luxury.
 * Used for achievements, special features, CTAs, and premium indicators.
 * 
 * Color Psychology: Hot (gold) = Urgent/Important
 * Brand Message: "Celestial guidance to golden opportunities"
 * Design Rule: Use sparingly for maximum impact - "Gold elevates"
 */
export const LuxuryGolds = {
  /**
   * Pure Gold - Premium Features
   * 
   * Primary luxury gold representing the highest level of premium features.
   * This is the signature cosmic gold for achievements and special features.
   * 
   * Emotional mapping: Success, Enlightenment, Premium
   * Usage: Premium features, achievements, special CTAs
   * 
   * @color #FFD700
   * @glow-effect Creates gold glow: '0 0 20px rgba(255, 215, 0, 0.5)'
   * @accessibility Tested for contrast - Gold on Deep Purple: 4.8:1 ✅
   */
  pure: '#FFD700' as ColorValue,

  /**
   * Champagne Gold - Soft Accents
   * 
   * Elegant champagne gold for soft accents and subtle luxury touches.
   * Provides sophisticated gold presence without overwhelming the interface.
   * 
   * Usage: Soft gold accents, elegant highlights, subtle luxury elements
   * 
   * @color #F7DC6F
   * @tone Warm, elegant champagne with subtle sophistication
   * @accessibility Suitable for accent elements and backgrounds
   */
  champagne: '#F7DC6F' as ColorValue,

  /**
   * Bronze Gold - Depth and Contrast
   * 
   * Darker gold variant for depth creation and sophisticated contrast.
   * Provides grounding for the gold color system with earthy elegance.
   * 
   * Usage: Darker gold for depth, sophisticated contrast, grounding elements
   * 
   * @color #CD853F
   * @tone Darker, more grounded gold with earthy sophistication
   * @accessibility Enhanced contrast for text and important elements
   */
  bronze: '#CD853F' as ColorValue,

  /**
   * Shimmer Gold - Light Highlights
   * 
   * Light gold for highlights and luminous shimmer effects.
   * Creates the signature Corp Astro golden shimmer and luminous experience.
   * 
   * Usage: Light gold highlights, shimmer effects, luminous elements
   * 
   * @color #FFF3CD
   * @effect Used for shimmer animation: 'gold-shimmer 3s linear infinite'
   * @tone Lightest gold with maximum luminosity
   */
  shimmer: '#FFF3CD' as ColorValue,
} as const;

/**
 * Type definition for Luxury Golds color keys
 */
export type LuxuryGoldsKey = keyof typeof LuxuryGolds;

/**
 * Type definition for Luxury Golds color values
 */
export type LuxuryGoldsValue = typeof LuxuryGolds[LuxuryGoldsKey];

/**
 * Luxury Golds color entries for iteration
 */
export const LuxuryGoldsEntries = Object.entries(LuxuryGolds) as Array<[LuxuryGoldsKey, LuxuryGoldsValue]>;

/**
 * Luxury Golds color keys array
 */
export const LuxuryGoldsKeys = Object.keys(LuxuryGolds) as LuxuryGoldsKey[];

/**
 * Luxury Golds color values array
 */
export const LuxuryGoldsValues = Object.values(LuxuryGolds) as LuxuryGoldsValue[];

/**
 * Default export for convenient importing
 */
export default LuxuryGolds;
