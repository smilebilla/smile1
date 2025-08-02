import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, LayoutChangeEvent } from 'react-native';
import { FloatingElement } from './FloatingElement';
import { FloatingTrail } from './FloatingTrail';
import { ParticleSystem } from './ParticleSystem';
import { ParticleConnections } from './ParticleConnections';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

interface FloatingItem {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  floatEnabled: boolean;
  rotateEnabled: boolean;
  pulseEnabled: boolean;
}

interface FloatingContainerProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  showParticles?: boolean;
  showConnections?: boolean;
  showTrails?: boolean;
  particleCount?: number;
  floatingItems?: FloatingItem[];
  autoGenerate?: boolean;
  autoGenerateCount?: number;
  bounds?: 'container' | 'screen';
  children?: React.ReactNode;
  style?: any;
}

export const FloatingContainer: React.FC<FloatingContainerProps> = ({
  width,
  height,
  backgroundColor = 'transparent',
  showParticles = true,
  showConnections = true,
  showTrails = false,
  particleCount = 20,
  floatingItems = [],
  autoGenerate = false,
  autoGenerateCount = 5,
  bounds = 'container',
  children,
  style,
}) => {
  const containerRef = useRef<View>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: width || Dimensions.get('window').width,
    height: height || Dimensions.get('window').height,
  });
  const [generatedItems, setGeneratedItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    if (autoGenerate && autoGenerateCount > 0) {
      const items: FloatingItem[] = [];
      
      for (let i = 0; i < autoGenerateCount; i++) {
        items.push({
          id: `auto-${i}`,
          x: Math.random() * containerDimensions.width,
          y: Math.random() * containerDimensions.height,
          size: 16 + Math.random() * 32, // Random size between 16-48
          color: '#2E86DE',
          floatEnabled: true,
          rotateEnabled: Math.random() > 0.5,
          pulseEnabled: Math.random() > 0.7,
        });
      }
      
      setGeneratedItems(items);
    }
  }, [autoGenerate, autoGenerateCount, containerDimensions]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width: layoutWidth, height: layoutHeight } = event.nativeEvent.layout;
    setContainerDimensions({
      width: layoutWidth,
      height: layoutHeight,
    });
  };

  const allItems = [...floatingItems, ...generatedItems];

  const containerStyle = {
    width: width || '100%',
    height: height || '100%',
    backgroundColor,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  return (
    <View
      ref={containerRef}
      style={[containerStyle, style]}
      onLayout={handleLayout}
    >
      {/* Particle System Background */}
      {showParticles && (
        <ParticleSystem
          count={particleCount}
          particleSize={[2, 3, 4]}
          color="#2E86DE"
          speed={[0.3, 0.5, 0.8]}
          direction="random"
          bounds={bounds === 'container' ? 'container' : 'viewport'}
          collision={false}
          glowRadius={6}
          opacity={0.4}
        />
      )}

      {/* Particle Connections */}
      {showConnections && showParticles && (
        <ParticleConnections
          particles={[]} // Will be populated by ParticleSystem
          enabled={true}
          maxDistance={80}
          color="#2E86DE"
          width={1}
          opacity={0.15}
          animated={true}
        />
      )}

      {/* Floating Elements */}
      {allItems.map((item) => (
        <FloatingElement
          key={item.id}
          id={item.id}
          x={item.x}
          y={item.y}
          size={item.size}
          color={item.color}
          floatEnabled={item.floatEnabled}
          rotateEnabled={item.rotateEnabled}
          pulseEnabled={item.pulseEnabled}
          floatDistance={20}
          floatDuration={4000 + Math.random() * 2000}
          rotateDuration={10000 + Math.random() * 5000}
          pulseDuration={2000 + Math.random() * 1000}
        />
      ))}

      {/* Floating Trails */}
      {showTrails && (
        <FloatingTrail
          enabled={true}
          length={8}
          opacity={[0.6, 0.4, 0.3, 0.2, 0.1, 0.05, 0.02, 0.01]}
          blur={[0, 1, 2, 3, 4, 5, 6, 7]}
          color="#2E86DE"
          size={6}
        />
      )}

      {/* Child Content */}
      {children}
    </View>
  );
};

export default FloatingContainer;
