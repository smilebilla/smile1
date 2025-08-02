import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Svg, { Defs, Line, LinearGradient, Stop } from 'react-native-svg';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

export interface ConstellationLineProps {
  /** Start point coordinates */
  startPoint: { x: number; y: number };
  /** End point coordinates */
  endPoint: { x: number; y: number };
  /** Line width in pixels */
  width?: number;
  /** Line color */
  color?: string;
  /** Whether line is active/highlighted */
  isActive?: boolean;
  /** Whether line is animated */
  isAnimated?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Animation type */
  animationType?: 'draw' | 'fade' | 'pulse';
  /** Dash pattern for dashed lines */
  dashArray?: string;
  /** Opacity of the line */
  opacity?: number;
  /** Container dimensions */
  containerSize: { width: number; height: number };
  /** Test ID for testing */
  testID?: string;
}

/**
 * ConstellationLine - Connection line component for constellation patterns
 * 
 * Features:
 * - Animated line drawing
 * - Dashed and solid line variants
 * - Active state styling
 * - Gradient effects
 * - Smooth animations
 * - Corp Astro design system integration
 */
export const ConstellationLine: React.FC<ConstellationLineProps> = ({
  startPoint,
  endPoint,
  width = 1,
  color = SignatureBlues.primary,
  isActive = false,
  isAnimated = true,
  animationDuration = 2000,
  animationType = 'draw',
  dashArray = '5,5',
  opacity = 0.2,
  containerSize,
  testID = 'constellation-line',
}) => {
  const animationValue = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(opacity)).current;
  const widthAnim = useRef(new Animated.Value(width)).current;

  // Calculate line length and angle
  const lineLength = Math.sqrt(
    Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)
  );

  // Animation effects
  useEffect(() => {
    if (isAnimated) {
      if (animationType === 'draw') {
        Animated.timing(animationValue, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: false,
        }).start();
      } else if (animationType === 'fade') {
        Animated.timing(opacityAnim, {
          toValue: opacity,
          duration: animationDuration,
          useNativeDriver: true,
        }).start();
      } else if (animationType === 'pulse') {
        const pulseAnimation = Animated.loop(
          Animated.sequence([
            Animated.timing(opacityAnim, {
              toValue: opacity * 2,
              duration: animationDuration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: opacity,
              duration: animationDuration / 2,
              useNativeDriver: true,
            }),
          ])
        );
        pulseAnimation.start();
      }
    }
  }, [isAnimated, animationType, animationDuration, opacity]);

  // Active state animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: isActive ? width * 2 : width,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 0.5 : opacity,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive, width, opacity]);

  const activeColor = isActive ? SignatureBlues.glow : color;
  const activeDashArray = isActive ? 'none' : dashArray;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: containerSize.width,
          height: containerSize.height,
          opacity: opacityAnim,
        },
      ]}
      testID={testID}
    >
      <Svg
        width={containerSize.width}
        height={containerSize.height}
        style={StyleSheet.absoluteFillObject}
      >
        <Defs>
          <LinearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={activeColor} stopOpacity="0.1" />
            <Stop offset="50%" stopColor={activeColor} stopOpacity="0.8" />
            <Stop offset="100%" stopColor={activeColor} stopOpacity="0.1" />
          </LinearGradient>
        </Defs>

        {/* Main line */}
        <Animated.View>
          <Line
            x1={startPoint.x}
            y1={startPoint.y}
            x2={endPoint.x}
            y2={endPoint.y}
            stroke={isActive ? 'url(#lineGradient)' : activeColor}
            strokeWidth={isActive ? width * 2 : width}
            strokeDasharray={activeDashArray}
            strokeOpacity={isActive ? 0.8 : opacity}
            strokeLinecap="round"
          />
        </Animated.View>

        {/* Glow effect for active state */}
        {isActive && (
          <Line
            x1={startPoint.x}
            y1={startPoint.y}
            x2={endPoint.x}
            y2={endPoint.y}
            stroke={activeColor}
            strokeWidth={width * 4}
            strokeOpacity={0.2}
            strokeLinecap="round"
            filter="blur(2px)"
          />
        )}

        {/* Animated dash effect */}
        {isAnimated && animationType === 'draw' && (
          <Line
            x1={startPoint.x}
            y1={startPoint.y}
            x2={endPoint.x}
            y2={endPoint.y}
            stroke={activeColor}
            strokeWidth={width}
            strokeDasharray={`${lineLength}, ${lineLength}`}
            strokeDashoffset={lineLength}
            strokeOpacity={0.8}
            strokeLinecap="round"
          />
        )}
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default ConstellationLine;
