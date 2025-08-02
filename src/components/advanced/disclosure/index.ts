/**
 * Corp Astro UI Library - Disclosure Components Index
 * 
 * Central export point for all disclosure components including accordions, panels,
 * and collapsible content with cosmic design aesthetics.
 * 
 * @module DisclosureComponents
 * @version 1.0.0
 * @since 2024
 */

// ============================================================================
// ACCORDION SYSTEM
// ============================================================================

export { default as Accordion } from './Accordion';
export type {
  AccordionVariant,
  AccordionMode,
  AccordionAnimation,
  AccordionItem as AccordionItemData,
  AccordionItemHeaderProps,
  AccordionProps,
} from './Accordion';

export { default as AccordionItem } from './AccordionItem';
export type {
  AccordionItemAnimation as ItemAnimation,
  AccordionItemHeaderProps as ItemHeaderProps,
  AccordionItemProps,
} from './AccordionItem';

// ============================================================================
// PANEL SYSTEM
// ============================================================================

export { default as Panel } from './Panel';
export type {
  PanelVariant,
  PanelSize,
  PanelAnimation,
  PanelAction,
  PanelProps,
} from './Panel';

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

// Common types used across disclosure components
export type DisclosureVariant = 'default' | 'elevated' | 'bordered' | 'cosmic' | 'glass';
export type DisclosureAnimation = 'smooth' | 'spring' | 'elastic' | 'none';
export type DisclosureSize = 'small' | 'medium' | 'large';

// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================

/**
 * Common accordion configurations for specific use cases
 */
export const ACCORDION_PRESETS = {
  faq: {
    variant: 'default' as const,
    mode: 'single' as const,
    animation: 'smooth' as const,
    showDividers: true,
  },
  settings: {
    variant: 'bordered' as const,
    mode: 'multiple' as const,
    animation: 'spring' as const,
    showDividers: false,
  },
  cosmic: {
    variant: 'cosmic' as const,
    mode: 'single' as const,
    animation: 'elastic' as const,
    showDividers: false,
  },
} as const;

/**
 * Common panel configurations for specific use cases
 */
export const PANEL_PRESETS = {
  info: {
    variant: 'default' as const,
    size: 'medium' as const,
    animation: 'smooth' as const,
    collapsible: true,
  },
  dashboard: {
    variant: 'elevated' as const,
    size: 'large' as const,
    animation: 'spring' as const,
    collapsible: false,
  },
  cosmic: {
    variant: 'cosmic' as const,
    size: 'medium' as const,
    animation: 'elastic' as const,
    collapsible: true,
  },
} as const;
