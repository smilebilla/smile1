import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';

interface PhysicsObject {
  id: string;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  mass: number;
  size: number;
  restitution: number; // Bounce factor
  friction: number;
}

interface FloatingPhysicsProps {
  objects: PhysicsObject[];
  onObjectsUpdate: (objects: PhysicsObject[]) => void;
  gravity?: number;
  airResistance?: number;
  collision?: boolean;
  bounds?: 'container' | 'screen';
  containerWidth?: number;
  containerHeight?: number;
  enabled?: boolean;
}

export const FloatingPhysics: React.FC<FloatingPhysicsProps> = ({
  objects,
  onObjectsUpdate,
  gravity = 0.1,
  airResistance = 0.999,
  collision = true,
  bounds = 'container',
  containerWidth = Dimensions.get('window').width,
  containerHeight = Dimensions.get('window').height,
  enabled = true,
}) => {
  const animationRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const updatePhysics = (currentTime: number) => {
      const deltaTime = currentTime - lastUpdateTime.current;
      lastUpdateTime.current = currentTime;

      if (deltaTime > 100) return; // Skip large time gaps

      const updatedObjects = objects.map((obj) => {
        let newObj = { ...obj };

        // Apply gravity
        newObj.velocityY += gravity;

        // Apply air resistance
        newObj.velocityX *= airResistance;
        newObj.velocityY *= airResistance;

        // Update position
        newObj.x += newObj.velocityX;
        newObj.y += newObj.velocityY;

        // Handle bounds collision
        if (bounds === 'container' || bounds === 'screen') {
          const width = bounds === 'container' ? containerWidth : Dimensions.get('window').width;
          const height = bounds === 'container' ? containerHeight : Dimensions.get('window').height;

          // Left and right bounds
          if (newObj.x - newObj.size / 2 <= 0) {
            newObj.x = newObj.size / 2;
            newObj.velocityX *= -newObj.restitution;
          } else if (newObj.x + newObj.size / 2 >= width) {
            newObj.x = width - newObj.size / 2;
            newObj.velocityX *= -newObj.restitution;
          }

          // Top and bottom bounds
          if (newObj.y - newObj.size / 2 <= 0) {
            newObj.y = newObj.size / 2;
            newObj.velocityY *= -newObj.restitution;
          } else if (newObj.y + newObj.size / 2 >= height) {
            newObj.y = height - newObj.size / 2;
            newObj.velocityY *= -newObj.restitution;
            
            // Apply friction when touching ground
            newObj.velocityX *= newObj.friction;
          }
        }

        return newObj;
      });

      // Handle object-to-object collisions
      if (collision) {
        for (let i = 0; i < updatedObjects.length; i++) {
          for (let j = i + 1; j < updatedObjects.length; j++) {
            const objA = updatedObjects[i];
            const objB = updatedObjects[j];

            const dx = objA.x - objB.x;
            const dy = objA.y - objB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (objA.size + objB.size) / 2;

            if (distance < minDistance) {
              // Separate objects
              const overlap = minDistance - distance;
              const separationX = (dx / distance) * overlap * 0.5;
              const separationY = (dy / distance) * overlap * 0.5;

              objA.x += separationX;
              objA.y += separationY;
              objB.x -= separationX;
              objB.y -= separationY;

              // Calculate collision response
              const totalMass = objA.mass + objB.mass;
              const relativeVelocityX = objA.velocityX - objB.velocityX;
              const relativeVelocityY = objA.velocityY - objB.velocityY;

              const velocityAlongNormalX = relativeVelocityX * (dx / distance);
              const velocityAlongNormalY = relativeVelocityY * (dy / distance);

              const impulse = (2 * (velocityAlongNormalX + velocityAlongNormalY)) / totalMass;

              objA.velocityX -= impulse * objB.mass * (dx / distance) * objA.restitution;
              objA.velocityY -= impulse * objB.mass * (dy / distance) * objA.restitution;
              objB.velocityX += impulse * objA.mass * (dx / distance) * objB.restitution;
              objB.velocityY += impulse * objA.mass * (dy / distance) * objB.restitution;
            }
          }
        }
      }

      onObjectsUpdate(updatedObjects);
      animationRef.current = requestAnimationFrame(updatePhysics);
    };

    animationRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [objects, enabled, gravity, airResistance, collision, bounds, containerWidth, containerHeight, onObjectsUpdate]);

  // This is a logic component, it doesn't render anything
  return null;
};

export default FloatingPhysics;
