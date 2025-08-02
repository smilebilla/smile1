import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

type PlanetPosition = {
  planet: string;
  house: number;
};

type NorthIndianChartProps = {
  positions: PlanetPosition[];
};

const NorthIndianChart = ({ positions }: NorthIndianChartProps) => {
  const dimension = Dimensions.get('window');
  const size = Math.min(dimension.width, dimension.height) - 40; // Add some margin

  // Group planets by house
  const planetsByHouse: Record<number, string> = {};
  for (let i = 1; i <= 12; i++) {
    const planetsInHouse = positions
      .filter((p) => p.house === i)
      .map((p) => p.planet)
      .join(' ');
    planetsByHouse[i] = planetsInHouse;
  }

  // Text positions as fractions of the chart size (0 to 1)
  const textPositions = {
    1: { x: 0.5, y: 0.2 },
    2: { x: 0.75, y: 0.15 },
    3: { x: 0.8, y: 0.3 },
    4: { x: 0.8, y: 0.5 },
    5: { x: 0.75, y: 0.65 },
    6: { x: 0.75, y: 0.85 },
    7: { x: 0.5, y: 0.8 },
    8: { x: 0.25, y: 0.85 },
    9: { x: 0.2, y: 0.7 },
    10: { x: 0.2, y: 0.5 },
    11: { x: 0.25, y: 0.35 },
    12: { x: 0.25, y: 0.15 },
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View style={{ width: size, height: size, position: 'relative' }}>
        <Svg height={size} width={size} viewBox="0 0 100 100">
          {/* Square border */}
          <Rect x="0" y="0" width="100" height="100" stroke="black" fill="none" />
          {/* Diagonal 1 */}
          <Line x1="0" y1="0" x2="100" y2="100" stroke="black" />
          {/* Diagonal 2 */}
          <Line x1="0" y1="100" x2="100" y2="0" stroke="black" />
          {/* Vertical line */}
          <Line x1="50" y1="0" x2="50" y2="100" stroke="black" />
          {/* Horizontal line */}
          <Line x1="0" y1="50" x2="100" y2="50" stroke="black" />
        </Svg>
        {/* Place planet texts */}
        {Object.entries(planetsByHouse).map(([houseStr, planets]) => {
          if (!planets) return null;
          const house = parseInt(houseStr);
          const pos = textPositions[house as keyof typeof textPositions];
          return (
            <Text
              key={house}
              style={{
                position: 'absolute',
                left: pos.x * size - 20, // Adjust for text centering
                top: pos.y * size - 10,
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              {planets}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

export default NorthIndianChart;