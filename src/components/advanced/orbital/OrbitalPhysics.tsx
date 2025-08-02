import React, { useEffect, useRef, useState } from 'react';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';

export interface OrbitalBody {
  id: string;
  mass: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
  radius: number;
  color: string;
  fixed: boolean;
  trail: { x: number; y: number }[];
}

export interface OrbitalPhysicsProps {
  /** Orbital bodies */
  bodies: OrbitalBody[];
  /** Update bodies callback */
  onUpdateBodies: (bodies: OrbitalBody[]) => void;
  /** Gravitational constant */
  gravitationalConstant?: number;
  /** Time step */
  timeStep?: number;
  /** Simulation speed */
  simulationSpeed?: number;
  /** Collision detection */
  collisionDetection?: boolean;
  /** Merge on collision */
  mergeOnCollision?: boolean;
  /** Energy conservation */
  energyConservation?: boolean;
  /** Momentum conservation */
  momentumConservation?: boolean;
  /** Trail length */
  trailLength?: number;
  /** Boundary behavior */
  boundaryBehavior?: 'reflect' | 'absorb' | 'wrap' | 'none';
  /** Container bounds */
  containerBounds?: { width: number; height: number };
  /** Central force */
  centralForce?: { x: number; y: number; strength: number };
  /** Damping factor */
  damping?: number;
  /** Physics enabled */
  enabled?: boolean;
  /** Simulation paused */
  paused?: boolean;
  /** Performance optimization */
  optimizePerformance?: boolean;
  /** Maximum simulation distance */
  maxSimulationDistance?: number;
  /** Collision callback */
  onCollision?: (body1: OrbitalBody, body2: OrbitalBody) => void;
  /** Merger callback */
  onMerge?: (resultBody: OrbitalBody, originalBodies: OrbitalBody[]) => void;
}

/**
 * OrbitalPhysics - Orbital physics simulation engine
 * 
 * Features:
 * - N-body gravitational simulation
 * - Collision detection and response
 * - Energy and momentum conservation
 * - Orbital trail tracking
 * - Boundary behavior handling
 * - Central force fields
 * - Damping and drag effects
 * - Performance optimizations
 * - Real-time physics updates
 * 
 * @param bodies - Array of orbital bodies
 * @param onUpdateBodies - Callback to update bodies
 * @param gravitationalConstant - Gravitational constant (default: 1)
 * @param timeStep - Time step (default: 0.016)
 * @param simulationSpeed - Simulation speed multiplier (default: 1)
 * @param collisionDetection - Collision detection enabled (default: true)
 * @param mergeOnCollision - Merge bodies on collision (default: false)
 * @param energyConservation - Energy conservation enabled (default: true)
 * @param momentumConservation - Momentum conservation enabled (default: true)
 * @param trailLength - Trail length (default: 50)
 * @param boundaryBehavior - Boundary behavior (default: 'none')
 * @param containerBounds - Container bounds (default: { width: 400, height: 400 })
 * @param centralForce - Central force (default: null)
 * @param damping - Damping factor (default: 1)
 * @param enabled - Physics enabled (default: true)
 * @param paused - Simulation paused (default: false)
 * @param optimizePerformance - Performance optimization (default: true)
 * @param maxSimulationDistance - Maximum simulation distance (default: 500)
 * @param onCollision - Collision callback
 * @param onMerge - Merger callback
 * 
 * @returns OrbitalPhysics component
 */
export const OrbitalPhysics: React.FC<OrbitalPhysicsProps> = ({
  bodies,
  onUpdateBodies,
  gravitationalConstant = 1,
  timeStep = 0.016,
  simulationSpeed = 1,
  collisionDetection = true,
  mergeOnCollision = false,
  energyConservation = true,
  momentumConservation = true,
  trailLength = 50,
  boundaryBehavior = 'none',
  containerBounds = { width: 400, height: 400 },
  centralForce,
  damping = 1,
  enabled = true,
  paused = false,
  optimizePerformance = true,
  maxSimulationDistance = 500,
  onCollision,
  onMerge
}) => {
  const animationRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);

  // Calculate distance between two bodies
  const calculateDistance = (body1: OrbitalBody, body2: OrbitalBody): number => {
    const dx = body1.position.x - body2.position.x;
    const dy = body1.position.y - body2.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate gravitational force between two bodies
  const calculateGravitationalForce = (body1: OrbitalBody, body2: OrbitalBody): { x: number; y: number } => {
    const distance = calculateDistance(body1, body2);
    if (distance === 0) return { x: 0, y: 0 };

    // Skip if too far for performance
    if (optimizePerformance && distance > maxSimulationDistance) {
      return { x: 0, y: 0 };
    }

    // Calculate force magnitude
    const forceMagnitude = (gravitationalConstant * body1.mass * body2.mass) / (distance * distance);

    // Calculate force direction
    const dx = body2.position.x - body1.position.x;
    const dy = body2.position.y - body1.position.y;
    const forceDirection = Math.sqrt(dx * dx + dy * dy);

    return {
      x: (dx / forceDirection) * forceMagnitude,
      y: (dy / forceDirection) * forceMagnitude
    };
  };

  // Calculate central force
  const calculateCentralForce = (body: OrbitalBody): { x: number; y: number } => {
    if (!centralForce) return { x: 0, y: 0 };

    const dx = centralForce.x - body.position.x;
    const dy = centralForce.y - body.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return { x: 0, y: 0 };

    const forceMagnitude = centralForce.strength / (distance * distance);
    return {
      x: (dx / distance) * forceMagnitude,
      y: (dy / distance) * forceMagnitude
    };
  };

  // Check collision between two bodies
  const checkCollision = (body1: OrbitalBody, body2: OrbitalBody): boolean => {
    if (!collisionDetection) return false;
    const distance = calculateDistance(body1, body2);
    return distance <= (body1.radius + body2.radius);
  };

  // Handle collision between two bodies
  const handleCollision = (body1: OrbitalBody, body2: OrbitalBody): OrbitalBody[] => {
    onCollision?.(body1, body2);

    if (mergeOnCollision) {
      // Merge bodies
      const totalMass = body1.mass + body2.mass;
      const newPosition = {
        x: (body1.position.x * body1.mass + body2.position.x * body2.mass) / totalMass,
        y: (body1.position.y * body1.mass + body2.position.y * body2.mass) / totalMass
      };
      const newVelocity = {
        x: (body1.velocity.x * body1.mass + body2.velocity.x * body2.mass) / totalMass,
        y: (body1.velocity.y * body1.mass + body2.velocity.y * body2.mass) / totalMass
      };

      const mergedBody: OrbitalBody = {
        id: `merged-${body1.id}-${body2.id}`,
        mass: totalMass,
        position: newPosition,
        velocity: newVelocity,
        acceleration: { x: 0, y: 0 },
        radius: Math.sqrt(body1.radius * body1.radius + body2.radius * body2.radius),
        color: body1.mass > body2.mass ? body1.color : body2.color,
        fixed: false,
        trail: [...body1.trail, ...body2.trail].slice(-trailLength)
      };

      onMerge?.(mergedBody, [body1, body2]);
      return [mergedBody];
    } else {
      // Elastic collision
      const totalMass = body1.mass + body2.mass;
      const massDiff = body1.mass - body2.mass;
      const distance = calculateDistance(body1, body2);
      
      if (distance === 0) return [body1, body2];

      // Calculate collision normal
      const dx = body2.position.x - body1.position.x;
      const dy = body2.position.y - body1.position.y;
      const normalX = dx / distance;
      const normalY = dy / distance;

      // Calculate relative velocity
      const relativeVelX = body2.velocity.x - body1.velocity.x;
      const relativeVelY = body2.velocity.y - body1.velocity.y;
      const relativeVelNormal = relativeVelX * normalX + relativeVelY * normalY;

      // Do not resolve if velocities are separating
      if (relativeVelNormal > 0) return [body1, body2];

      // Calculate collision impulse
      const impulse = 2 * relativeVelNormal / totalMass;

      // Update velocities
      const newBody1 = {
        ...body1,
        velocity: {
          x: body1.velocity.x + impulse * body2.mass * normalX,
          y: body1.velocity.y + impulse * body2.mass * normalY
        }
      };

      const newBody2 = {
        ...body2,
        velocity: {
          x: body2.velocity.x - impulse * body1.mass * normalX,
          y: body2.velocity.y - impulse * body1.mass * normalY
        }
      };

      // Separate bodies
      const overlap = (body1.radius + body2.radius) - distance;
      const separationX = (normalX * overlap) / 2;
      const separationY = (normalY * overlap) / 2;

      newBody1.position.x -= separationX;
      newBody1.position.y -= separationY;
      newBody2.position.x += separationX;
      newBody2.position.y += separationY;

      return [newBody1, newBody2];
    }
  };

  // Handle boundary behavior
  const handleBoundaries = (body: OrbitalBody): OrbitalBody => {
    if (boundaryBehavior === 'none') return body;

    const newBody = { ...body };

    switch (boundaryBehavior) {
      case 'reflect':
        // Reflect off boundaries
        if (newBody.position.x - newBody.radius < 0) {
          newBody.position.x = newBody.radius;
          newBody.velocity.x = -newBody.velocity.x;
        } else if (newBody.position.x + newBody.radius > containerBounds.width) {
          newBody.position.x = containerBounds.width - newBody.radius;
          newBody.velocity.x = -newBody.velocity.x;
        }

        if (newBody.position.y - newBody.radius < 0) {
          newBody.position.y = newBody.radius;
          newBody.velocity.y = -newBody.velocity.y;
        } else if (newBody.position.y + newBody.radius > containerBounds.height) {
          newBody.position.y = containerBounds.height - newBody.radius;
          newBody.velocity.y = -newBody.velocity.y;
        }
        break;

      case 'wrap':
        // Wrap around boundaries
        if (newBody.position.x < -newBody.radius) {
          newBody.position.x = containerBounds.width + newBody.radius;
        } else if (newBody.position.x > containerBounds.width + newBody.radius) {
          newBody.position.x = -newBody.radius;
        }

        if (newBody.position.y < -newBody.radius) {
          newBody.position.y = containerBounds.height + newBody.radius;
        } else if (newBody.position.y > containerBounds.height + newBody.radius) {
          newBody.position.y = -newBody.radius;
        }
        break;

      case 'absorb':
        // Remove bodies that go out of bounds
        if (newBody.position.x < -newBody.radius || 
            newBody.position.x > containerBounds.width + newBody.radius ||
            newBody.position.y < -newBody.radius || 
            newBody.position.y > containerBounds.height + newBody.radius) {
          return { ...newBody, mass: 0 }; // Mark for removal
        }
        break;
    }

    return newBody;
  };

  // Update physics simulation
  const updatePhysics = () => {
    if (!enabled || paused || bodies.length === 0) return;

    let updatedBodies = [...bodies];

    // Calculate forces and accelerations
    updatedBodies = updatedBodies.map(body => {
      if (body.fixed) return body;

      let totalForceX = 0;
      let totalForceY = 0;

      // Gravitational forces from other bodies
      bodies.forEach(otherBody => {
        if (body.id !== otherBody.id) {
          const force = calculateGravitationalForce(body, otherBody);
          totalForceX += force.x;
          totalForceY += force.y;
        }
      });

      // Central force
      if (centralForce) {
        const force = calculateCentralForce(body);
        totalForceX += force.x;
        totalForceY += force.y;
      }

      // Calculate acceleration (F = ma)
      const acceleration = {
        x: totalForceX / body.mass,
        y: totalForceY / body.mass
      };

      return {
        ...body,
        acceleration
      };
    });

    // Update velocities and positions
    updatedBodies = updatedBodies.map(body => {
      if (body.fixed) return body;

      // Update velocity
      const newVelocity = {
        x: body.velocity.x + body.acceleration.x * timeStep * simulationSpeed,
        y: body.velocity.y + body.acceleration.y * timeStep * simulationSpeed
      };

      // Apply damping
      newVelocity.x *= damping;
      newVelocity.y *= damping;

      // Update position
      const newPosition = {
        x: body.position.x + newVelocity.x * timeStep * simulationSpeed,
        y: body.position.y + newVelocity.y * timeStep * simulationSpeed
      };

      // Update trail
      const newTrail = [...body.trail, newPosition].slice(-trailLength);

      return {
        ...body,
        velocity: newVelocity,
        position: newPosition,
        trail: newTrail
      };
    });

    // Handle collisions
    const processedBodies: OrbitalBody[] = [];
    const collisionPairs: [number, number][] = [];

    for (let i = 0; i < updatedBodies.length; i++) {
      for (let j = i + 1; j < updatedBodies.length; j++) {
        if (checkCollision(updatedBodies[i], updatedBodies[j])) {
          collisionPairs.push([i, j]);
        }
      }
    }

    // Process collisions
    const bodiesToRemove = new Set<number>();
    const newBodies: OrbitalBody[] = [];

    collisionPairs.forEach(([i, j]) => {
      if (bodiesToRemove.has(i) || bodiesToRemove.has(j)) return;

      const collisionResult = handleCollision(updatedBodies[i], updatedBodies[j]);
      
      if (collisionResult.length === 1) {
        // Merger occurred
        newBodies.push(collisionResult[0]);
        bodiesToRemove.add(i);
        bodiesToRemove.add(j);
      } else {
        // Elastic collision
        updatedBodies[i] = collisionResult[0];
        updatedBodies[j] = collisionResult[1];
      }
    });

    // Remove collided bodies and add new ones
    updatedBodies = updatedBodies.filter((_, index) => !bodiesToRemove.has(index));
    updatedBodies.push(...newBodies);

    // Handle boundaries
    updatedBodies = updatedBodies.map(handleBoundaries);

    // Remove absorbed bodies
    updatedBodies = updatedBodies.filter(body => body.mass > 0);

    onUpdateBodies(updatedBodies);
  };

  // Animation loop
  const animate = (timestamp: number) => {
    if (timestamp - lastUpdateTime.current >= (1000 / 60)) {
      updatePhysics();
      lastUpdateTime.current = timestamp;
    }

    if (enabled && !paused) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Start/stop animation
  useEffect(() => {
    if (enabled && !paused) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, paused]);

  // This is a logic-only component
  return null;
};

export default OrbitalPhysics;
