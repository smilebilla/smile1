/**
 * Corp Astro UI Library - Typography Primitives Index
 * 
 * Centralized exports for all typography primitive components.
 * 
 * @module TypographyPrimitivesIndex
 * @version 1.0.0
 * @since 2024
 */

// DisplayText component
export { default as DisplayText } from './DisplayText';
export type { 
  DisplayTextProps, 
  DisplayTextRef,
  DisplayTextSize, 
  DisplayTextWeight,
  DisplayTextAlign,
  DisplayTextColor,
  DisplayTextAnimation,
} from './DisplayText';

// Heading component
export { default as Heading } from './Heading';
export type { 
  HeadingProps, 
  HeadingRef,
  HeadingLevel,
  HeadingSize, 
  HeadingWeight,
  HeadingAlign,
  HeadingColor,
  HeadingAnimation,
} from './Heading';

// BodyText component
export { default as BodyText } from './BodyText';
export type { 
  BodyTextProps, 
  BodyTextRef,
  BodyTextSize, 
  BodyTextWeight,
  BodyTextAlign,
  BodyTextColor,
  BodyTextAnimation,
  BodyTextVariant,
} from './BodyText';

// Label component
export { default as Label } from './Label';
export type { 
  LabelProps, 
  LabelRef,
  LabelSize, 
  LabelWeight,
  LabelAlign,
  LabelColor,
  LabelAnimation,
  LabelVariant,
} from './Label';

// Caption component
export { default as Caption } from './Caption';
export type { 
  CaptionProps, 
  CaptionRef,
  CaptionSize, 
  CaptionWeight,
  CaptionAlign,
  CaptionColor,
  CaptionAnimation,
  CaptionVariant,
} from './Caption';

// Code component
export { default as Code } from './Code';
export type { 
  CodeProps, 
  CodeRef,
  CodeVariant,
  CodeSize, 
  CodeWeight,
  CodeAlign,
  CodeColor,
  CodeAnimation,
  CodeTheme,
} from './Code';

// Link component
export { default as Link } from './Link';
export type { 
  LinkProps, 
  LinkRef,
  LinkVariant,
  LinkSize, 
  LinkWeight,
  LinkAlign,
  LinkColor,
  LinkAnimation,
  LinkDecoration,
} from './Link';

// Re-export common typography types
export type {
  TextStyle,
  TextProps,
} from 'react-native';

/**
 * Typography primitive components for the Corp Astro UI Library
 * 
 * This module provides foundational typography components that follow
 * the Corp Astro design system. All components feature:
 * 
 * - Responsive typography scaling
 * - Accessibility compliance
 * - Animation support
 * - Theme integration
 * - Custom styling options
 * 
 * Components:
 * - DisplayText: Large, prominent text using Didot font
 * - Heading: Structured headings with Futura PT font (H1-H6)
 * - BodyText: Standard body text with Inter font (body1, body2, paragraph, caption, overline)
 * - Label: Form labels with proper spacing and state management
 * - Caption: Small, muted text for secondary content and metadata
 * - Code: Monospace code text with syntax highlighting and theme support
 * - Link: Interactive link text with hover effects and navigation support
 */
