import React from 'react';
import { View } from 'react-native';
import ParticleField from '../../components/advanced/particles/ParticleField';
import { useTheme } from '../../components/foundations/themes/useTheme';

const CosmicBackground: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <ParticleField
        particleCount={150}
        particleSizeRange={[1, 4]}
        particleColors={[String(colors.brand.primary), String(colors.brand.accent), '#FFFFFF']}
        speedRange={[0.1, 0.5]}
        lifetimeRange={[10, 20]}
        spawnRate={10}
        gravity={{ x: 0, y: 0 }}
        wind={{ x: 0, y: 0 }}
        bounceEdges={false}
        fadeOut={true}
      />
    </View>
  );
};

export default CosmicBackground;