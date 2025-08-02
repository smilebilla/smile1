import React, { useEffect, useRef } from 'react';

interface CollisionObject {
  id: string;
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
  mass: number;
  restitution: number;
  static: boolean;
}

interface CollisionEvent {
  objectA: CollisionObject;
  objectB: CollisionObject;
  point: { x: number; y: number };
  normal: { x: number; y: number };
  force: number;
}

interface FloatingCollisionProps {
  objects: CollisionObject[];
  onCollision?: (event: CollisionEvent) => void;
  onObjectsUpdate?: (objects: CollisionObject[]) => void;
  enabled?: boolean;
  bounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const FloatingCollision: React.FC<FloatingCollisionProps> = ({
  objects,
  onCollision,
  onObjectsUpdate,
  enabled = true,
  bounds,
}) => {
  const lastUpdateTime = useRef<number>(0);
  const animationRef = useRef<number | null>(null);

  const checkCircleCollision = (objA: CollisionObject, objB: CollisionObject) => {
    const dx = objA.x - objB.x;
    const dy = objA.y - objB.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = (objA.size + objB.size) / 2;

    return distance < minDistance;
  };

  const resolveCollision = (objA: CollisionObject, objB: CollisionObject) => {
    const dx = objA.x - objB.x;
    const dy = objA.y - objB.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = (objA.size + objB.size) / 2;

    if (distance >= minDistance) return;

    // Normalize collision vector
    const nx = dx / distance;
    const ny = dy / distance;

    // Separate objects
    const overlap = minDistance - distance;
    const totalMass = objA.mass + objB.mass;

    if (!objA.static && !objB.static) {
      const separationA = (objB.mass / totalMass) * overlap;
      const separationB = (objA.mass / totalMass) * overlap;

      objA.x += nx * separationA;
      objA.y += ny * separationA;
      objB.x -= nx * separationB;
      objB.y -= ny * separationB;
    } else if (objA.static && !objB.static) {
      objB.x -= nx * overlap;
      objB.y -= ny * overlap;
    } else if (!objA.static && objB.static) {
      objA.x += nx * overlap;
      objA.y += ny * overlap;
    }

    // Calculate relative velocity
    const relativeVelocityX = objA.velocityX - objB.velocityX;
    const relativeVelocityY = objA.velocityY - objB.velocityY;

    // Calculate relative velocity in collision normal direction
    const velocityAlongNormal = relativeVelocityX * nx + relativeVelocityY * ny;

    // Don't resolve if velocities are separating
    if (velocityAlongNormal > 0) return;

    // Calculate restitution
    const restitution = Math.min(objA.restitution, objB.restitution);

    // Calculate impulse scalar
    const impulseScalar = -(1 + restitution) * velocityAlongNormal;
    const impulse = impulseScalar / (1 / objA.mass + 1 / objB.mass);

    // Apply impulse
    if (!objA.static) {
      objA.velocityX += (impulse / objA.mass) * nx;
      objA.velocityY += (impulse / objA.mass) * ny;
    }

    if (!objB.static) {
      objB.velocityX -= (impulse / objB.mass) * nx;
      objB.velocityY -= (impulse / objB.mass) * ny;
    }

    // Fire collision event
    if (onCollision) {
      const collisionEvent: CollisionEvent = {
        objectA: objA,
        objectB: objB,
        point: {
          x: objA.x + nx * (objA.size / 2),
          y: objA.y + ny * (objA.size / 2),
        },
        normal: { x: nx, y: ny },
        force: Math.abs(impulse),
      };

      onCollision(collisionEvent);
    }
  };

  const checkBoundaryCollision = (obj: CollisionObject) => {
    if (!bounds) return;

    const radius = obj.size / 2;

    // Left boundary
    if (obj.x - radius < bounds.x) {
      obj.x = bounds.x + radius;
      obj.velocityX *= -obj.restitution;
    }

    // Right boundary
    if (obj.x + radius > bounds.x + bounds.width) {
      obj.x = bounds.x + bounds.width - radius;
      obj.velocityX *= -obj.restitution;
    }

    // Top boundary
    if (obj.y - radius < bounds.y) {
      obj.y = bounds.y + radius;
      obj.velocityY *= -obj.restitution;
    }

    // Bottom boundary
    if (obj.y + radius > bounds.y + bounds.height) {
      obj.y = bounds.y + bounds.height - radius;
      obj.velocityY *= -obj.restitution;
    }
  };

  useEffect(() => {
    if (!enabled) return;

    const updateCollisions = (currentTime: number) => {
      const deltaTime = currentTime - lastUpdateTime.current;
      lastUpdateTime.current = currentTime;

      if (deltaTime > 100) {
        animationRef.current = requestAnimationFrame(updateCollisions);
        return;
      }

      const updatedObjects = [...objects];

      // Check object-to-object collisions
      for (let i = 0; i < updatedObjects.length; i++) {
        for (let j = i + 1; j < updatedObjects.length; j++) {
          const objA = updatedObjects[i];
          const objB = updatedObjects[j];

          if (checkCircleCollision(objA, objB)) {
            resolveCollision(objA, objB);
          }
        }
      }

      // Check boundary collisions
      if (bounds) {
        updatedObjects.forEach(checkBoundaryCollision);
      }

      onObjectsUpdate?.(updatedObjects);
      animationRef.current = requestAnimationFrame(updateCollisions);
    };

    animationRef.current = requestAnimationFrame(updateCollisions);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [objects, enabled, bounds, onCollision, onObjectsUpdate]);

  // This is a logic component, it doesn't render anything
  return null;
};

export default FloatingCollision;
