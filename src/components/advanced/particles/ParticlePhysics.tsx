import React, { useEffect, useRef } from 'react';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import type { Particle } from './ParticleField';

export interface ParticlePhysicsProps {
  /** Particles to simulate */
  particles: Particle[];
  /** Update particles callback */
  onUpdateParticles: (particles: Particle[]) => void;
  /** Gravity force */
  gravity?: { x: number; y: number };
  /** Wind force */
  wind?: { x: number; y: number };
  /** Drag coefficient */
  drag?: number;
  /** Bounce coefficient */
  bounce?: number;
  /** Friction coefficient */
  friction?: number;
  /** Collision detection enabled */
  collisionDetection?: boolean;
  /** Particle attraction enabled */
  particleAttraction?: boolean;
  /** Attraction strength */
  attractionStrength?: number;
  /** Attraction radius */
  attractionRadius?: number;
  /** Particle repulsion enabled */
  particleRepulsion?: boolean;
  /** Repulsion strength */
  repulsionStrength?: number;
  /** Repulsion radius */
  repulsionRadius?: number;
  /** Orbital mechanics enabled */
  orbitalMechanics?: boolean;
  /** Central mass position */
  centralMass?: { x: number; y: number; mass: number };
  /** Container bounds */
  containerBounds?: { width: number; height: number };
  /** Boundary behavior */
  boundaryBehavior?: 'bounce' | 'wrap' | 'absorb' | 'none';
  /** Time step */
  timeStep?: number;
  /** Physics enabled */
  enabled?: boolean;
  /** Performance optimization */
  optimizePerformance?: boolean;
  /** Maximum simulation distance */
  maxSimulationDistance?: number;
}

interface PhysicsState {
  particles: Particle[];
  forces: { x: number; y: number }[];
  velocities: { x: number; y: number }[];
  accelerations: { x: number; y: number }[];
}

/**
 * ParticlePhysics - Advanced particle physics simulation engine
 * 
 * Features:
 * - Gravity and wind forces
 * - Drag and friction simulation
 * - Particle-particle collision detection
 * - Attraction and repulsion forces
 * - Orbital mechanics simulation
 * - Boundary behavior handling
 * - Performance optimizations
 * - Configurable time step
 * - Force accumulation system
 * - Velocity integration
 * 
 * @param particles - Array of particles to simulate
 * @param onUpdateParticles - Callback to update particles
 * @param gravity - Gravity force (default: { x: 0, y: 0.1 })
 * @param wind - Wind force (default: { x: 0, y: 0 })
 * @param drag - Drag coefficient (default: 0.01)
 * @param bounce - Bounce coefficient (default: 0.8)
 * @param friction - Friction coefficient (default: 0.99)
 * @param collisionDetection - Collision detection enabled (default: false)
 * @param particleAttraction - Particle attraction enabled (default: false)
 * @param attractionStrength - Attraction strength (default: 0.1)
 * @param attractionRadius - Attraction radius (default: 50)
 * @param particleRepulsion - Particle repulsion enabled (default: false)
 * @param repulsionStrength - Repulsion strength (default: 0.5)
 * @param repulsionRadius - Repulsion radius (default: 20)
 * @param orbitalMechanics - Orbital mechanics enabled (default: false)
 * @param centralMass - Central mass position (default: { x: 200, y: 200, mass: 1000 })
 * @param containerBounds - Container bounds (default: { width: 400, height: 400 })
 * @param boundaryBehavior - Boundary behavior (default: 'bounce')
 * @param timeStep - Time step (default: 1)
 * @param enabled - Physics enabled (default: true)
 * @param optimizePerformance - Performance optimization (default: true)
 * @param maxSimulationDistance - Maximum simulation distance (default: 200)
 * 
 * @returns ParticlePhysics component
 */
export const ParticlePhysics: React.FC<ParticlePhysicsProps> = ({
  particles,
  onUpdateParticles,
  gravity = { x: 0, y: 0.1 },
  wind = { x: 0, y: 0 },
  drag = 0.01,
  bounce = 0.8,
  friction = 0.99,
  collisionDetection = false,
  particleAttraction = false,
  attractionStrength = 0.1,
  attractionRadius = 50,
  particleRepulsion = false,
  repulsionStrength = 0.5,
  repulsionRadius = 20,
  orbitalMechanics = false,
  centralMass = { x: 200, y: 200, mass: 1000 },
  containerBounds = { width: 400, height: 400 },
  boundaryBehavior = 'bounce',
  timeStep = 1,
  enabled = true,
  optimizePerformance = true,
  maxSimulationDistance = 200
}) => {
  const physicsStateRef = useRef<PhysicsState>({
    particles: [],
    forces: [],
    velocities: [],
    accelerations: []
  });

  // Calculate distance between two points
  const calculateDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }): number => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate gravitational force
  const calculateGravitationalForce = (particle: Particle, mass: { x: number; y: number; mass: number }): { x: number; y: number } => {
    const distance = calculateDistance(particle, mass);
    if (distance === 0) return { x: 0, y: 0 };

    const force = (mass.mass * particle.size) / (distance * distance);
    const dx = mass.x - particle.x;
    const dy = mass.y - particle.y;
    const magnitude = Math.sqrt(dx * dx + dy * dy);

    return {
      x: (dx / magnitude) * force,
      y: (dy / magnitude) * force
    };
  };

  // Calculate particle interaction forces
  const calculateParticleInteractionForces = (targetParticle: Particle, allParticles: Particle[]): { x: number; y: number } => {
    let totalForceX = 0;
    let totalForceY = 0;

    allParticles.forEach(otherParticle => {
      if (targetParticle.id === otherParticle.id) return;

      const distance = calculateDistance(targetParticle, otherParticle);
      if (optimizePerformance && distance > maxSimulationDistance) return;

      // Attraction force
      if (particleAttraction && distance < attractionRadius && distance > 0) {
        const force = attractionStrength * (1 - distance / attractionRadius);
        const dx = otherParticle.x - targetParticle.x;
        const dy = otherParticle.y - targetParticle.y;
        const magnitude = Math.sqrt(dx * dx + dy * dy);

        totalForceX += (dx / magnitude) * force;
        totalForceY += (dy / magnitude) * force;
      }

      // Repulsion force
      if (particleRepulsion && distance < repulsionRadius && distance > 0) {
        const force = repulsionStrength * (1 - distance / repulsionRadius);
        const dx = targetParticle.x - otherParticle.x;
        const dy = targetParticle.y - otherParticle.y;
        const magnitude = Math.sqrt(dx * dx + dy * dy);

        totalForceX += (dx / magnitude) * force;
        totalForceY += (dy / magnitude) * force;
      }
    });

    return { x: totalForceX, y: totalForceY };
  };

  // Handle collision detection
  const handleCollisions = (particles: Particle[]): Particle[] => {
    if (!collisionDetection) return particles;

    const updatedParticles = [...particles];

    for (let i = 0; i < updatedParticles.length; i++) {
      for (let j = i + 1; j < updatedParticles.length; j++) {
        const p1 = updatedParticles[i];
        const p2 = updatedParticles[j];
        const distance = calculateDistance(p1, p2);
        const minDistance = p1.size + p2.size;

        if (distance < minDistance) {
          // Calculate collision response
          const overlap = minDistance - distance;
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const magnitude = Math.sqrt(dx * dx + dy * dy);

          if (magnitude > 0) {
            const normalX = dx / magnitude;
            const normalY = dy / magnitude;

            // Separate particles
            const separationX = (normalX * overlap) / 2;
            const separationY = (normalY * overlap) / 2;

            updatedParticles[i] = {
              ...p1,
              x: p1.x - separationX,
              y: p1.y - separationY
            };

            updatedParticles[j] = {
              ...p2,
              x: p2.x + separationX,
              y: p2.y + separationY
            };

            // Calculate velocity exchange
            const relativeVelocityX = p2.vx - p1.vx;
            const relativeVelocityY = p2.vy - p1.vy;
            const velocityAlongNormal = relativeVelocityX * normalX + relativeVelocityY * normalY;

            if (velocityAlongNormal > 0) continue;

            const restitution = bounce;
            const impulse = -(1 + restitution) * velocityAlongNormal;
            const impulsePerMass = impulse / (p1.size + p2.size);

            updatedParticles[i].vx -= impulsePerMass * p2.size * normalX;
            updatedParticles[i].vy -= impulsePerMass * p2.size * normalY;
            updatedParticles[j].vx += impulsePerMass * p1.size * normalX;
            updatedParticles[j].vy += impulsePerMass * p1.size * normalY;
          }
        }
      }
    }

    return updatedParticles;
  };

  // Handle boundary behavior
  const handleBoundaries = (particle: Particle): Particle => {
    let newParticle = { ...particle };

    switch (boundaryBehavior) {
      case 'bounce':
        // Left/right bounds
        if (newParticle.x - newParticle.size < 0) {
          newParticle.x = newParticle.size;
          newParticle.vx = -newParticle.vx * bounce;
        } else if (newParticle.x + newParticle.size > containerBounds.width) {
          newParticle.x = containerBounds.width - newParticle.size;
          newParticle.vx = -newParticle.vx * bounce;
        }

        // Top/bottom bounds
        if (newParticle.y - newParticle.size < 0) {
          newParticle.y = newParticle.size;
          newParticle.vy = -newParticle.vy * bounce;
        } else if (newParticle.y + newParticle.size > containerBounds.height) {
          newParticle.y = containerBounds.height - newParticle.size;
          newParticle.vy = -newParticle.vy * bounce;
        }
        break;

      case 'wrap':
        // Wrap around edges
        if (newParticle.x < -newParticle.size) {
          newParticle.x = containerBounds.width + newParticle.size;
        } else if (newParticle.x > containerBounds.width + newParticle.size) {
          newParticle.x = -newParticle.size;
        }

        if (newParticle.y < -newParticle.size) {
          newParticle.y = containerBounds.height + newParticle.size;
        } else if (newParticle.y > containerBounds.height + newParticle.size) {
          newParticle.y = -newParticle.size;
        }
        break;

      case 'absorb':
        // Remove particles that go out of bounds
        if (newParticle.x < -newParticle.size || 
            newParticle.x > containerBounds.width + newParticle.size ||
            newParticle.y < -newParticle.size || 
            newParticle.y > containerBounds.height + newParticle.size) {
          newParticle.opacity = 0;
          newParticle.life = 0;
        }
        break;

      case 'none':
        // No boundary handling
        break;
    }

    return newParticle;
  };

  // Update physics simulation
  const updatePhysics = () => {
    if (!enabled || particles.length === 0) return;

    const updatedParticles = particles.map(particle => {
      // Initialize forces
      let forceX = 0;
      let forceY = 0;

      // Apply gravity
      forceX += gravity.x;
      forceY += gravity.y;

      // Apply wind
      forceX += wind.x;
      forceY += wind.y;

      // Apply drag
      const dragForceX = -particle.vx * drag;
      const dragForceY = -particle.vy * drag;
      forceX += dragForceX;
      forceY += dragForceY;

      // Apply orbital mechanics
      if (orbitalMechanics) {
        const gravitationalForce = calculateGravitationalForce(particle, centralMass);
        forceX += gravitationalForce.x;
        forceY += gravitationalForce.y;
      }

      // Apply particle interaction forces
      if (particleAttraction || particleRepulsion) {
        const interactionForces = calculateParticleInteractionForces(particle, particles);
        forceX += interactionForces.x;
        forceY += interactionForces.y;
      }

      // Update velocity
      let newVx = particle.vx + forceX * timeStep;
      let newVy = particle.vy + forceY * timeStep;

      // Apply friction
      newVx *= friction;
      newVy *= friction;

      // Update position
      let newX = particle.x + newVx * timeStep;
      let newY = particle.y + newVy * timeStep;

      // Create updated particle
      const updatedParticle = {
        ...particle,
        x: newX,
        y: newY,
        vx: newVx,
        vy: newVy
      };

      // Handle boundaries
      return handleBoundaries(updatedParticle);
    });

    // Handle collisions
    const finalParticles = handleCollisions(updatedParticles);

    // Update particles
    onUpdateParticles(finalParticles);
  };

  // Run physics simulation
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(updatePhysics, 16); // ~60fps

    return () => clearInterval(interval);
  }, [particles, enabled, gravity, wind, drag, bounce, friction, collisionDetection, particleAttraction, particleRepulsion, orbitalMechanics]);

  // This is a logic-only component, no render
  return null;
};

export default ParticlePhysics;
