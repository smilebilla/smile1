/**
 * Signature Blues Color System
 * 
 * Brand identity blue color palette for Corp Astro.
 * These blues represent trust, authority, and intelligence - embodying
 * "Corporate credibility meets cosmic wisdom".
 * 
 * Usage Guidelines:
 * - Primary: Logo blue for primary actions and professional elements
 * - Light: Hover states, links, and interactive elements
 * - Glow: Glow effects, highlights, and atmospheric elements
 * - Accent: Secondary accents and complementary elements
 * 
 * @fileoverview Signature Blues color tokens implementing Corp Astro's brand identity
 * @author Corp Astro Design System
 * @version 1.0.0
 */

import { ColorValue } from 'react-native';

/**
 * Signature Blues Color System
 * 
 * Brand identity blue palette representing trust, authority, and intelligence.
 * Used for primary actions, professional elements, and corporate credibility.
 */
export const SignatureBlues = {
  /**
   * Primary Corp Blue - Logo Blue
   * 
   * The signature brand color representing corporate credibility and cosmic wisdom.
   * Used for primary actions, buttons, and key brand elements.
   * 
   * Emotional mapping: Trust, Authority, Intelligence
   * Usage: Primary actions, professional elements, logo color
   * 
   * @color #2E86DE
   * @contrast-ratio 5.2:1 (against void background)
   * @accessibility WCAG AA compliant
   */
  primary: '#2E86DE' as ColorValue,

  /**
   * Light Corp Blue - Interactive Elements
   * 
   * Lighter variant used for hover states, links, and secondary interactive elements.
   * Provides visual hierarchy while maintaining brand consistency.
   * 
   * Usage: Hover states, links, secondary buttons
   * 
   * @color #54A0FF
   * @accessibility Tested for contrast compliance
   */
  light: '#54A0FF' as ColorValue,

  /**
   * Glow Corp Blue - Atmospheric Effects
   * 
   * Used for glow effects, highlights, and atmospheric elements.
   * Creates the signature Corp Astro luminous aesthetic.
   * 
   * Usage: Glow effects, highlights, atmospheric elements
   * 
   * @color #74B9FF
   * @effect Creates blue glow: '0 0 20px rgba(46, 134, 222, 0.5)'
   */
  glow: '#74B9FF' as ColorValue,

  /**
   * Accent Corp Blue - Secondary Elements
   * 
   * Secondary accent color for complementary elements and subtle highlights.
   * Provides additional depth to the blue color system.
   * 
   * Usage: Secondary accents, complementary elements
   * 
   * @color #48C9E5
   * @tone Cooler blue with cyan undertones
   */
  accent: '#48C9E5' as ColorValue,
} as const;

/**
 * Type definition for Signature Blues color keys
 */
export type SignatureBluesKey = keyof typeof SignatureBlues;

/**
 * Type definition for Signature Blues color values
 */
export type SignatureBluesValue = typeof SignatureBlues[SignatureBluesKey];

/**
 * Signature Blues color entries for iteration
 */
export const SignatureBluesEntries = Object.entries(SignatureBlues) as Array<[SignatureBluesKey, SignatureBluesValue]>;

/**
 * Signature Blues color keys array
 */
export const SignatureBluesKeys = Object.keys(SignatureBlues) as SignatureBluesKey[];

/**
 * Signature Blues color values array
 */
export const SignatureBluesValues = Object.values(SignatureBlues) as SignatureBluesValue[];

/**
 * Default export for convenient importing
 */
export default SignatureBlues;
