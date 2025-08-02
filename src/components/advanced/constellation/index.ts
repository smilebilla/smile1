/**
 * Constellation System Components
 * 
 * Interactive constellation display system with stars, connections, patterns, and maps.
 * Supports multiple pattern types, dynamic animations, and user interactions.
 * 
 * @fileoverview Advanced constellation system for Corp Astro
 * @author Corp Astro Design System
 * @version 1.0.0
 */

// Core constellation components
export { ConstellationStar } from './ConstellationStar';
export { ConstellationLine } from './ConstellationLine';
export { ConstellationPattern } from './ConstellationPattern';
export { ConstellationInteraction } from './ConstellationInteraction';
export { ConstellationMap } from './ConstellationMap';

// Types and interfaces
export type {
  ConstellationStarProps,
} from './ConstellationStar';

export type {
  ConstellationLineProps,
} from './ConstellationLine';

export type {
  ConstellationPoint,
  ConstellationConnection,
  ConstellationPatternProps,
} from './ConstellationPattern';

export type {
  ConstellationInteractionProps,
} from './ConstellationInteraction';

export type {
  ConstellationMapProps,
} from './ConstellationMap';
