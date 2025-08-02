import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface FloatingTrailProps {
  enabled?: boolean;
  length?: number;
  opacity?: number[];
  blur?: number[];
  color?: string;
  size?: number;
  followTarget?: { x: number; y: number };
  children?: React.ReactNode;
  style?: any;
}

export const FloatingTrail: React.FC<FloatingTrailProps> = ({
  enabled = true,
  length = 5,
  opacity = [0.5, 0.3, 0.2, 0.1, 0.05],
  blur = [0, 1, 2, 3, 4],
  color = SignatureBlues.primary,
  size = 8,
  followTarget,
  children,
  style,
}) => {
  const trailPoints = useRef<TrailPoint[]>([]);
  const animatedValues = useRef<Animated.Value[]>([]);
  const updateInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize animated values for each trail point
    animatedValues.current = Array(length).fill(0).map(() => new Animated.Value(0));
    
    return () => {
      if (updateInterval.current) {
        clearInterval(updateInterval.current);
      }
    };
  }, [length]);

  useEffect(() => {
    if (!enabled || !followTarget) return;

    const updateTrail = () => {
      const now = Date.now();
      const newPoint: TrailPoint = {
        x: followTarget.x,
        y: followTarget.y,
        timestamp: now,
      };

      // Add new point to trail
      trailPoints.current.unshift(newPoint);

      // Remove old points
      trailPoints.current = trailPoints.current.slice(0, length);

      // Animate trail points
      trailPoints.current.forEach((point, index) => {
        if (animatedValues.current[index]) {
          Animated.timing(animatedValues.current[index], {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }
      });
    };

    updateInterval.current = setInterval(updateTrail, 50); // Update every 50ms

    return () => {
      if (updateInterval.current) {
        clearInterval(updateInterval.current);
      }
    };
  }, [enabled, followTarget, length]);

  const renderTrailPoint = (point: TrailPoint, index: number) => {
    const pointOpacity = opacity[index] || 0.05;
    const pointBlur = blur[index] || 4;
    const animatedValue = animatedValues.current[index];

    if (!animatedValue) return null;

    return (
      <Animated.View
        key={`trail-${index}-${point.timestamp}`}
        style={[
          {
            position: 'absolute',
            left: point.x - size / 2,
            top: point.y - size / 2,
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            opacity: pointOpacity,
            shadowColor: color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: pointOpacity,
            shadowRadius: pointBlur,
            elevation: pointBlur,
          },
          {
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
        ]}
      />
    );
  };

  if (!enabled) {
    return <View style={style}>{children}</View>;
  }

  return (
    <View style={[{ position: 'relative' }, style]}>
      {trailPoints.current.map(renderTrailPoint)}
      {children}
    </View>
  );
};

export default FloatingTrail;
