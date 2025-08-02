/**
 * Corp Astro UI Library - Button Primitives Index
 * 
 * Centralized exports for all button primitive components.
 * 
 * @module ButtonPrimitivesIndex
 * @version 1.0.0
 * @since 2024
 */

// Primary button components
export { ButtonPrimary } from './ButtonPrimary';
export type { ButtonPrimaryProps, ButtonPrimarySize, ButtonPrimaryVariant } from './ButtonPrimary';

// Secondary button components
export { ButtonSecondary } from './ButtonSecondary';
export type { ButtonSecondaryProps, ButtonSecondarySize, ButtonSecondaryVariant } from './ButtonSecondary';

// Ghost button components
export { ButtonGhost } from './ButtonGhost';
export type { ButtonGhostProps, ButtonGhostSize, ButtonGhostVariant } from './ButtonGhost';

// Floating button components
export { ButtonFloating } from './ButtonFloating';
export type { ButtonFloatingProps, ButtonFloatingSize, ButtonFloatingAnimation } from './ButtonFloating';

// Icon button components
export { ButtonIcon } from './ButtonIcon';
export type { ButtonIconProps, ButtonIconSize, ButtonIconVariant, ButtonIconState } from './ButtonIcon';

// Link button components
export { ButtonLink, LinkButton, TextButton } from './ButtonLink';
export type { ButtonLinkProps, ButtonLinkSize, ButtonLinkVariant, ButtonLinkConfig } from './ButtonLink';

// Button group components
export { ButtonGroup, Group, ButtonContainer } from './ButtonGroup';
export type { ButtonGroupProps, ButtonGroupDirection, ButtonGroupAlignment, ButtonGroupSpacing, ButtonGroupVariant, ButtonGroupConfig } from './ButtonGroup';
export { ButtonGroupUtils } from './ButtonGroup';

// Toggle button components
export { ButtonToggle } from './ButtonToggle';
export type { ButtonToggleProps, ButtonToggleSize, ButtonToggleVariant, ButtonToggleConfig } from './ButtonToggle';

// Base button components (shared logic)
export { ButtonBase } from './ButtonBase';
export type { 
  ButtonBaseProps, 
  ButtonBaseConfig, 
  ButtonBaseSize, 
  ButtonBaseAnimation, 
  ButtonBaseLoadingState, 
  ButtonBaseAnimationState, 
  ButtonBaseState, 
  ButtonBaseHandlers 
} from './ButtonBase';
