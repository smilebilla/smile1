// Floating Elements System - Corp Astro UI Library
// Complete floating elements system with physics, animations, and interactions

// Core Components
export { FloatingOrb } from './FloatingOrb';
export { FloatingTrail } from './FloatingTrail';
export { FloatingElement } from './FloatingElement';
export { FloatingContainer } from './FloatingContainer';

// Particle System
export { ParticleSystem } from './ParticleSystem';
export { ParticleConnections } from './ParticleConnections';
export { ParticleInteraction } from './ParticleInteraction';

// Physics and Animation
export { FloatingPhysics } from './FloatingPhysics';
export { FloatingRenderer } from './FloatingRenderer';
export { FloatingAnimation } from './FloatingAnimation';
export { FloatingCollision } from './FloatingCollision';

// Utilities
export { default as FloatingUtils } from './FloatingUtils';
export { Vector2D, ColorUtils, AnimationUtils, PhysicsUtils, RandomUtils, ScreenUtils } from './FloatingUtils';

// Animation Helpers
export {
  createFloatAnimation,
  createRotationAnimation,
  createPulseAnimation,
  createFadeAnimation,
} from './FloatingAnimation';
