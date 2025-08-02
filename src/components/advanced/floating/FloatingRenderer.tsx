import React from 'react';
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface RenderableObject {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  scale: number;
  blur: number;
  glow: boolean;
  shape: 'circle' | 'square' | 'diamond' | 'star';
  animatedValue?: Animated.Value;
}

interface FloatingRendererProps {
  objects: RenderableObject[];
  enableGlow?: boolean;
  enableBlur?: boolean;
  enableGradients?: boolean;
  style?: any;
}

export const FloatingRenderer: React.FC<FloatingRendererProps> = ({
  objects,
  enableGlow = true,
  enableBlur = false,
  enableGradients = true,
  style,
}) => {
  const renderShape = (obj: RenderableObject) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: obj.x - obj.size / 2,
      top: obj.y - obj.size / 2,
      width: obj.size,
      height: obj.size,
      opacity: obj.opacity,
      transform: [
        { rotate: `${obj.rotation}deg` },
        { scale: obj.scale },
      ],
    };

    const shadowStyle = enableGlow && obj.glow ? {
      shadowColor: obj.color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: obj.blur,
      elevation: obj.blur,
    } : {};

    switch (obj.shape) {
      case 'circle':
        return (
          <Animated.View
            key={obj.id}
            style={[
              baseStyle,
              {
                borderRadius: obj.size / 2,
                backgroundColor: obj.color,
              },
              shadowStyle,
            ]}
          />
        );

      case 'square':
        return (
          <Animated.View
            key={obj.id}
            style={[
              baseStyle,
              {
                backgroundColor: obj.color,
              },
              shadowStyle,
            ]}
          />
        );

      case 'diamond':
        return (
          <Animated.View
            key={obj.id}
            style={[
              baseStyle,
              {
                backgroundColor: obj.color,
                transform: [
                  { rotate: `${obj.rotation + 45}deg` },
                  { scale: obj.scale },
                ],
              },
              shadowStyle,
            ]}
          />
        );

      case 'star':
        // Simple star using multiple triangles
        return (
          <Animated.View
            key={obj.id}
            style={[
              baseStyle,
              {
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <View
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: obj.size / 4,
                borderRightWidth: obj.size / 4,
                borderBottomWidth: obj.size / 2,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: obj.color,
                position: 'absolute',
                ...shadowStyle,
              }}
            />
            <View
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: obj.size / 4,
                borderRightWidth: obj.size / 4,
                borderTopWidth: obj.size / 2,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: obj.color,
                position: 'absolute',
                transform: [{ rotate: '180deg' }],
                ...shadowStyle,
              }}
            />
          </Animated.View>
        );

      default:
        return null;
    }
  };

  const renderGradientShape = (obj: RenderableObject) => {
    if (!enableGradients) return renderShape(obj);

    const baseStyle = {
      position: 'absolute' as const,
      left: obj.x - obj.size / 2,
      top: obj.y - obj.size / 2,
      width: obj.size,
      height: obj.size,
      opacity: obj.opacity,
      transform: [
        { rotate: `${obj.rotation}deg` },
        { scale: obj.scale },
      ],
    };

    const shadowStyle = enableGlow && obj.glow ? {
      shadowColor: obj.color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: obj.blur,
      elevation: obj.blur,
    } : {};

    const gradientColors = [
      `rgba(46,134,222,0.8)`,
      `rgba(46,134,222,0)`,
    ] as const;

    return (
      <Animated.View
        key={obj.id}
        style={[baseStyle, shadowStyle]}
      >
        <LinearGradient
          colors={gradientColors}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: obj.shape === 'circle' ? obj.size / 2 : 0,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
    );
  };

  return (
    <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, style]}>
      {objects.map(renderGradientShape)}
    </View>
  );
};

export default FloatingRenderer;
