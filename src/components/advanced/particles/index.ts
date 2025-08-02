/**
 * Particle System Components
 * 
 * Complete particle system with field, emitter, connections, interactions, rendering, and physics.
 * Supports dynamic particle creation, complex interactions, and realistic physics simulation.
 * 
 * @fileoverview Advanced particle system for Corp Astro
 * @author Corp Astro Design System
 * @version 1.0.0
 */

// Core particle components
export { ParticleField } from './ParticleField';
export { ParticleEmitter } from './ParticleEmitter';
export { ParticleConnection } from './ParticleConnection';
export { ParticleInteraction } from './ParticleInteraction';
export { ParticleRenderer } from './ParticleRenderer';
export { ParticlePhysics } from './ParticlePhysics';

// Types and interfaces
export type {
  Particle,
  ParticleFieldProps,
} from './ParticleField';

export type {
  ParticleEmitterProps,
} from './ParticleEmitter';

export type {
  ParticleConnectionProps,
} from './ParticleConnection';

export type {
  ParticleInteractionProps,
} from './ParticleInteraction';

export type {
  ParticleRendererProps,
} from './ParticleRenderer';

export type {
  ParticlePhysicsProps,
} from './ParticlePhysics';
