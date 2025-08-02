/**
 * Corp Astro UI Library - Advanced Components
 * 
 * Advanced components for Corp Astro applications.
 * These components provide complex functionality and premium user experiences.
 * 
 * @module AdvancedComponents
 * @version 1.0.0
 * @since 2024
 */

// Modal System
export { default as Modal } from './modals/Modal';
export type { ModalProps, ModalSize } from './modals/Modal';

export { default as ModalHeader } from './modals/ModalHeader';
export type { ModalHeaderProps } from './modals/ModalHeader';

export { default as ModalContent } from './modals/ModalContent';
export type { ModalContentProps } from './modals/ModalContent';

export { default as ModalFooter } from './modals/ModalFooter';
export type { ModalFooterProps } from './modals/ModalFooter';

export { default as ModalCloseButton } from './modals/ModalCloseButton';
export type { ModalCloseButtonProps } from './modals/ModalCloseButton';

export { default as BottomSheet } from './modals/BottomSheet';
export type { BottomSheetProps } from './modals/BottomSheet';

export { default as ModalOverlay } from './modals/ModalOverlay';
export type { ModalOverlayProps } from './modals/ModalOverlay';

export { 
  default as ModalAnimation,
  ModalAnimationSlideUp,
  ModalAnimationSlideDown,
  ModalAnimationFade,
  ModalAnimationScale,
  ModalAnimationRotate,
  ModalAnimationSlideLeft,
  ModalAnimationSlideRight,
  ModalAnimationFast,
  ModalAnimationSlow
} from './modals/ModalAnimation';
export type { ModalAnimationProps } from './modals/ModalAnimation';

// Overlay System
export { default as Tooltip } from './overlays/Tooltip';
export type { TooltipProps } from './overlays/Tooltip';

export { default as Popover } from './overlays/Popover';
export type { PopoverProps } from './overlays/Popover';

export { default as HoverCard } from './overlays/HoverCard';
export type { HoverCardProps } from './overlays/HoverCard';

export { default as Backdrop } from './overlays/Backdrop';
export type { BackdropProps } from './overlays/Backdrop';

// Display System
export { default as List } from './display/List';
export type { ListProps, ListItemData, ListVariant, ListLayout, ListInteractionMode } from './display/List';

export { default as Badge } from './display/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize, BadgeColor, BadgePosition, BadgeAnimation } from './display/Badge';

export { default as Chip } from './display/Chip';
export type { ChipProps, ChipVariant, ChipSize, ChipColor, ChipState, ChipIcon } from './display/Chip';

// Disclosure System
export { 
  Accordion,
  AccordionItem,
  Panel,
  ACCORDION_PRESETS,
  PANEL_PRESETS
} from './disclosure';
export type { 
  AccordionProps,
  AccordionItemProps,
  PanelProps,
  AccordionVariant,
  AccordionMode,
  AccordionAnimation,
  PanelVariant,
  PanelSize,
  PanelAnimation,
  DisclosureVariant,
  DisclosureAnimation,
  DisclosureSize
} from './disclosure';

// Loading System
export { default as SkeletonLoader } from './loading/SkeletonLoader';
export type { SkeletonLoaderProps, SkeletonVariant } from './loading/SkeletonLoader';

export { default as Spinner } from './loading/Spinner';
export type { SpinnerProps, SpinnerVariant, SpinnerSize } from './loading/Spinner';

export { default as ProgressBar } from './loading/ProgressBar';
export type { ProgressBarProps, ProgressVariant, ProgressSize } from './loading/ProgressBar';

// Feedback System
export { default as Alert } from './feedback/Alert';
export type { AlertProps, AlertVariant } from './feedback/Alert';

export { default as Toast } from './feedback/Toast';
export type { ToastProps, ToastVariant, ToastPosition } from './feedback/Toast';

// Re-export all advanced components (specific exports to avoid conflicts)
export * from './modals/Modal';
export * from './modals/ModalHeader';
export * from './modals/ModalContent';
export * from './modals/ModalFooter';
export * from './modals/ModalCloseButton';
export * from './modals/BottomSheet';
export * from './modals/ModalOverlay';
export * from './loading/SkeletonLoader';
export * from './loading/Spinner';
export * from './loading/ProgressBar';

// Constellation System
export {
  ConstellationStar,
  ConstellationLine,
  ConstellationPattern,
  ConstellationInteraction,
  ConstellationMap,
} from './constellation';

export type {
  ConstellationStarProps,
  ConstellationLineProps,
  ConstellationPoint,
  ConstellationConnection,
  ConstellationPatternProps,
  ConstellationInteractionProps,
  ConstellationMapProps,
} from './constellation';

// Orbital System
export {
  OrbitalRing,
  OrbitalSatellite,
  OrbitalCenter,
  OrbitalContainer,
} from './orbital';

export type {
  OrbitalRingProps,
  OrbitalSatelliteProps,
  OrbitalCenterProps,
  OrbitalRingConfig,
  OrbitalSatelliteConfig,
  OrbitalContainerProps,
} from './orbital';

// Particle System
export { 
  ParticleField,
  ParticleEmitter,
  ParticleConnection,
  ParticleInteraction,
  ParticleRenderer,
  ParticlePhysics
} from './particles';

export type {
  Particle,
  ParticleFieldProps,
  ParticleEmitterProps,
  ParticleConnectionProps,
  ParticleInteractionProps,
  ParticleRendererProps,
  ParticlePhysicsProps
} from './particles';

// Floating Elements System
export { 
  FloatingOrb,
  FloatingTrail,
  FloatingElement,
  FloatingContainer,
  ParticleSystem,
  ParticleConnections,
  FloatingPhysics,
  FloatingRenderer,
  FloatingAnimation,
  FloatingCollision,
  FloatingUtils,
  Vector2D,
  ColorUtils,
  AnimationUtils,
  PhysicsUtils,
  RandomUtils,
  ScreenUtils
} from './floating';

// Rename ParticleInteraction from floating to avoid conflict
export { ParticleInteraction as FloatingParticleInteraction } from './floating';
