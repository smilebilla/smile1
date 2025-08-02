/**
 * Corp Astro UI Library - Gradients Index
 */

// Button Gradients
export {
  primaryButtonGradient,
  primaryButtonHoverGradient,
  secondaryButtonGradient,
  secondaryButtonHoverGradient,
  ghostButtonGradient,
  ghostButtonHoverGradient,
  floatingActionButtonGradient as buttonFloatingGradient,
  destructiveButtonGradient,
  successButtonGradient,
  buttonGradients,
  generateButtonGradientCSS,
  getButtonGradientProps,
  validateButtonGradient,
} from './ButtonGradients';

// Floating Gradients (unique exports)
export {
  floatingOrbGradient as floatingElementGradient,
  floatingTrailGradient,
  floatingGlowGradient,
} from './FloatingGradients';

// Hero Gradients
export * from './HeroGradients';

// Navigation Gradients (unique exports)
export {
  navigationGradients,
} from './NavigationGradients';
