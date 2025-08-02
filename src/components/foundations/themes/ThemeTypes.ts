/**
 * Corp Astro UI Library - Theme Type Definitions
 * 
 * Complete TypeScript type definitions for the theme system, providing 
 * comprehensive type safety, IntelliSense support, and compile-time validation
 * for all theme-related operations.
 * 
 * @module ThemeTypes
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design Tokens: Type definitions and structure specifications
 * - Design System: Theme type patterns and component interfaces
 * - Developer Handoff: Type safety requirements and IntelliSense support
 */

import { ColorValue as RNColorValue } from 'react-native';
import { CorpAstroDarkTheme } from './DarkTheme';

// ============================================================================
// PRIMITIVE TYPE DEFINITIONS
// ============================================================================

/**
 * Base color value type
 */
export type ColorValue = string | RNColorValue;

/**
 * Spacing value in pixels
 */
export type SpacingValue = number;

/**
 * Font size value in pixels
 */
export type FontSizeValue = number;

/**
 * Font weight values matching system requirements
 */
export type FontWeightValue = '300' | '400' | '500' | '600' | '700';

/**
 * Border radius value in pixels
 */
export type BorderRadiusValue = number;

/**
 * Animation duration in milliseconds
 */
export type AnimationDuration = number;

/**
 * CSS easing function string
 */
export type EasingFunction = string;

/**
 * Opacity value (0-1)
 */
export type OpacityValue = number;

/**
 * Z-index value
 */
export type ZIndexValue = number;

/**
 * Breakpoint value in pixels
 */
export type BreakpointValue = number;

// ============================================================================
// GRADIENT TYPE DEFINITIONS
// ============================================================================

/**
 * Gradient type options
 */
export type GradientType = 'linear' | 'radial';

/**
 * Gradient definition interface
 */
export interface GradientDefinition {
  colors: ColorValue[];
  locations?: number[];
  angle?: number;
  type?: GradientType;
}

/**
 * Gradient stop definition
 */
export interface GradientStop {
  color: ColorValue;
  offset: number;
}

/**
 * Linear gradient specific properties
 */
export interface LinearGradientDefinition extends GradientDefinition {
  type: 'linear';
  angle: number;
}

/**
 * Radial gradient specific properties
 */
export interface RadialGradientDefinition extends GradientDefinition {
  type: 'radial';
  centerX?: number;
  centerY?: number;
  radius?: number;
}

// ============================================================================
// SHADOW TYPE DEFINITIONS
// ============================================================================

/**
 * Shadow definition interface
 */
export interface ShadowDefinition {
  shadowColor: ColorValue;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation?: number; // Android specific
}

/**
 * Glow effect definition
 */
export interface GlowDefinition extends ShadowDefinition {
  glowIntensity: number;
  glowSpread: number;
}

/**
 * Box shadow CSS string
 */
export type BoxShadowValue = string;

// ============================================================================
// ANIMATION TYPE DEFINITIONS
// ============================================================================

/**
 * Animation timing function
 */
export type TimingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | string;

/**
 * Animation direction
 */
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

/**
 * Animation iteration count
 */
export type AnimationIterationCount = number | 'infinite';

/**
 * Animation fill mode
 */
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

/**
 * Animation configuration
 */
export interface AnimationConfig {
  duration: AnimationDuration;
  timingFunction: TimingFunction;
  delay?: number;
  iterationCount?: AnimationIterationCount;
  direction?: AnimationDirection;
  fillMode?: AnimationFillMode;
}

/**
 * Orbital animation specific configuration
 */
export interface OrbitalAnimationConfig extends AnimationConfig {
  rotationSpeed: number;
  pulseIntensity: number;
  trailLength: number;
}

/**
 * Constellation animation configuration
 */
export interface ConstellationAnimationConfig extends AnimationConfig {
  connectionSpeed: number;
  formationPattern: 'circle' | 'organic' | 'nearest-neighbor';
  glowIntensity: number;
}

// ============================================================================
// TYPOGRAPHY TYPE DEFINITIONS
// ============================================================================

/**
 * Font family options
 */
export type FontFamily = 'Didot' | 'Futura PT' | 'Inter' | 'Cinzel' | 'SF Pro' | 'Roboto';

/**
 * Font style options
 */
export type FontStyle = 'normal' | 'italic';

/**
 * Text decoration options
 */
export type TextDecoration = 'none' | 'underline' | 'line-through';

/**
 * Text align options
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Line height value
 */
export type LineHeightValue = number;

/**
 * Letter spacing value in pixels
 */
export type LetterSpacingValue = number;

/**
 * Typography style definition
 */
export interface TypographyStyle {
  fontFamily: FontFamily;
  fontSize: FontSizeValue;
  fontWeight: FontWeightValue;
  lineHeight: LineHeightValue;
  letterSpacing: LetterSpacingValue;
  color?: ColorValue;
  textAlign?: TextAlign;
  textDecoration?: TextDecoration;
  fontStyle?: FontStyle;
}

/**
 * Heading levels
 */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Text variants
 */
export type TextVariant = 'body' | 'caption' | 'overline' | 'subtitle' | 'button' | 'code';

// ============================================================================
// LAYOUT TYPE DEFINITIONS
// ============================================================================

/**
 * Flex direction options
 */
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

/**
 * Flex wrap options
 */
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Justify content options
 */
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

/**
 * Align items options
 */
export type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

/**
 * Align self options
 */
export type AlignSelf = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

/**
 * Position options
 */
export type Position = 'relative' | 'absolute' | 'fixed' | 'sticky';

/**
 * Overflow options
 */
export type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto';

/**
 * Layout style definition
 */
export interface LayoutStyle {
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  margin?: SpacingValue;
  padding?: SpacingValue;
  position?: Position;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  zIndex?: ZIndexValue;
  overflow?: Overflow;
}

/**
 * Flex layout style definition
 */
export interface FlexLayoutStyle extends LayoutStyle {
  display?: 'flex';
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
}

// ============================================================================
// COMPONENT TYPE DEFINITIONS
// ============================================================================

/**
 * Button size variants
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'floating' | 'icon' | 'link';

/**
 * Button state
 */
export type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled' | 'loading';

/**
 * Input size variants
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input variants
 */
export type InputVariant = 'text' | 'email' | 'password' | 'number' | 'search' | 'textarea' | 'select';

/**
 * Input state
 */
export type InputState = 'default' | 'focus' | 'error' | 'disabled' | 'success';

/**
 * Card variants
 */
export type CardVariant = 'hero' | 'data' | 'content' | 'interactive' | 'compact' | 'feature';

/**
 * Card state
 */
export type CardState = 'default' | 'hover' | 'pressed' | 'loading';

/**
 * Modal variants
 */
export type ModalVariant = 'standard' | 'fullscreen' | 'bottom-sheet' | 'popover';

/**
 * Alert variants
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Loading variants
 */
export type LoadingVariant = 'spinner' | 'skeleton' | 'cosmic' | 'progress' | 'overlay';

// ============================================================================
// THEME TOKEN TYPE DEFINITIONS
// ============================================================================

/**
 * Color token keys
 */
export type ColorToken = 
  | 'cosmos.void' | 'cosmos.deep' | 'cosmos.dark' | 'cosmos.medium'
  | 'brand.primary' | 'brand.light' | 'brand.glow' | 'brand.accent'
  | 'mystical.deep' | 'mystical.royal' | 'mystical.light' | 'mystical.glow'
  | 'luxury.pure' | 'luxury.champagne' | 'luxury.bronze' | 'luxury.shimmer'
  | 'neutral.light' | 'neutral.medium' | 'neutral.text' | 'neutral.muted';

/**
 * Gradient token keys
 */
export type GradientToken = 
  | 'hero.primary' | 'hero.secondary'
  | 'button.primary' | 'button.secondary'
  | 'navigation.bottom' | 'navigation.header'
  | 'floating.fab' | 'floating.orb';

/**
 * Spacing token keys
 */
export type SpacingToken = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'huge';

/**
 * Typography token keys
 */
export type TypographyToken = 
  | 'heading.h1' | 'heading.h2' | 'heading.h3' | 'heading.h4' | 'heading.h5' | 'heading.h6'
  | 'body.large' | 'body.medium' | 'body.small'
  | 'caption.large' | 'caption.small'
  | 'button.large' | 'button.medium' | 'button.small'
  | 'code.inline' | 'code.block';

/**
 * Shadow token keys
 */
export type ShadowToken = 'sm' | 'md' | 'lg' | 'xl' | 'cosmic' | 'glow';

/**
 * Animation token keys
 */
export type AnimationToken = 
  | 'duration.fast' | 'duration.normal' | 'duration.slow' | 'duration.orbital'
  | 'easing.ease' | 'easing.easeIn' | 'easing.easeOut' | 'easing.easeInOut' | 'easing.orbital';

/**
 * Border radius token keys
 */
export type BorderRadiusToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';

/**
 * Opacity token keys
 */
export type OpacityToken = 'disabled' | 'hover' | 'focus' | 'backdrop' | 'glassMorphism';

/**
 * Z-index token keys
 */
export type ZIndexToken = 'base' | 'dropdown' | 'modal' | 'popover' | 'toast' | 'tooltip' | 'overlay' | 'max';

/**
 * Breakpoint token keys
 */
export type BreakpointToken = 'sm' | 'md' | 'lg' | 'xl';

// ============================================================================
// THEME INTERFACE TYPE DEFINITIONS
// ============================================================================

/**
 * Theme interface - extends the base theme with type safety
 */
export interface ThemeInterface extends CorpAstroDarkTheme {
  // Theme metadata
  name: string;
  version: string;
  mode: 'light' | 'dark';
  
  // Utility functions
  getColor: (token: ColorToken) => ColorValue;
  getGradient: (token: GradientToken) => GradientDefinition;
  getSpacing: (token: SpacingToken) => SpacingValue;
  getTypography: (token: TypographyToken) => TypographyStyle;
  getShadow: (token: ShadowToken) => ShadowDefinition;
  getAnimation: (token: AnimationToken) => AnimationConfig;
  getBorderRadius: (token: BorderRadiusToken) => BorderRadiusValue;
  getOpacity: (token: OpacityToken) => OpacityValue;
  getZIndex: (token: ZIndexToken) => ZIndexValue;
  getBreakpoint: (token: BreakpointToken) => BreakpointValue;
}

/**
 * Theme provider context value
 */
export interface ThemeContextValue {
  theme: ThemeInterface;
  setTheme: (theme: ThemeInterface) => void;
  toggleTheme: () => void;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeInterface;
  persistTheme?: boolean;
  onThemeChange?: (theme: ThemeInterface) => void;
}

// ============================================================================
// UTILITY TYPE DEFINITIONS
// ============================================================================

/**
 * Extract keys from nested object type
 */
export type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${K & string}.${NestedKeys<T[K]> & string}`
        : K & string;
    }[keyof T]
  : never;

/**
 * Get value type from nested object using dot notation
 */
export type NestedValue<T, K extends string> = K extends `${infer P}.${infer R}`
  ? P extends keyof T
    ? NestedValue<T[P], R>
    : never
  : K extends keyof T
  ? T[K]
  : never;

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make all properties required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Strict theme type for compile-time validation
 */
export type StrictTheme = DeepRequired<ThemeInterface>;

/**
 * Partial theme type for theme overrides
 */
export type PartialTheme = DeepPartial<ThemeInterface>;

// ============================================================================
// COMPONENT STYLE TYPE DEFINITIONS
// ============================================================================

/**
 * Base component style props
 */
export interface BaseStyleProps {
  color?: ColorValue;
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  borderWidth?: number;
  borderRadius?: BorderRadiusValue;
  margin?: SpacingValue;
  padding?: SpacingValue;
  shadow?: ShadowDefinition;
  opacity?: OpacityValue;
  zIndex?: ZIndexValue;
}

/**
 * Text component style props
 */
export interface TextStyleProps extends BaseStyleProps {
  fontSize?: FontSizeValue;
  fontWeight?: FontWeightValue;
  fontFamily?: FontFamily;
  lineHeight?: LineHeightValue;
  letterSpacing?: LetterSpacingValue;
  textAlign?: TextAlign;
  textDecoration?: TextDecoration;
}

/**
 * Layout component style props
 */
export interface LayoutStyleProps extends BaseStyleProps {
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  position?: Position;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  overflow?: Overflow;
}

/**
 * Flex component style props
 */
export interface FlexStyleProps extends LayoutStyleProps {
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
}

/**
 * Animation component style props
 */
export interface AnimationStyleProps extends BaseStyleProps {
  animationDuration?: AnimationDuration;
  animationTimingFunction?: TimingFunction;
  animationDelay?: number;
  animationIterationCount?: AnimationIterationCount;
  animationDirection?: AnimationDirection;
  animationFillMode?: AnimationFillMode;
}

// ============================================================================
// RESPONSIVE TYPE DEFINITIONS
// ============================================================================

/**
 * Responsive value type
 */
export type ResponsiveValue<T> = T | {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

/**
 * Responsive style props
 */
export interface ResponsiveStyleProps {
  [key: string]: ResponsiveValue<any>;
}

/**
 * Breakpoint configuration
 */
export interface BreakpointConfig {
  sm: BreakpointValue;
  md: BreakpointValue;
  lg: BreakpointValue;
  xl: BreakpointValue;
}

// ============================================================================
// VALIDATION TYPE DEFINITIONS
// ============================================================================

/**
 * Theme validation result
 */
export interface ThemeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Theme validator function type
 */
export type ThemeValidator = (theme: ThemeInterface) => ThemeValidationResult;

// ============================================================================
// HOOK TYPE DEFINITIONS
// ============================================================================

/**
 * Use theme hook return type
 */
export interface UseThemeReturn {
  theme: ThemeInterface;
  colors: ThemeInterface['colors'];
  gradients: ThemeInterface['gradients'];
  typography: ThemeInterface['typography'];
  spacing: ThemeInterface['spacing'];
  shadows: ThemeInterface['shadows'];
  animation: ThemeInterface['animation'];
  borderRadius: ThemeInterface['borderRadius'];
  opacity: ThemeInterface['opacity'];
  zIndex: ThemeInterface['zIndex'];
  breakpoints: ThemeInterface['breakpoints'];
  components: ThemeInterface['components'];
  
  // Utility functions
  getColor: ThemeInterface['getColor'];
  getGradient: ThemeInterface['getGradient'];
  getSpacing: ThemeInterface['getSpacing'];
  getTypography: ThemeInterface['getTypography'];
  getShadow: ThemeInterface['getShadow'];
  getAnimation: ThemeInterface['getAnimation'];
  getBorderRadius: ThemeInterface['getBorderRadius'];
  getOpacity: ThemeInterface['getOpacity'];
  getZIndex: ThemeInterface['getZIndex'];
  getBreakpoint: ThemeInterface['getBreakpoint'];
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Main theme type - alias for Corp Astro Dark Theme
 */
export type CorpAstroTheme = CorpAstroDarkTheme;
