import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface CardStackItem {
  id: string;
  content: React.ReactNode;
}

interface CardStackProps {
  items: CardStackItem[];
  maxVisible?: number;
  cardOffset?: number;
  scaleStep?: number;
  swipeEnabled?: boolean;
  swipeThreshold?: number;
  onSwipe?: (item: CardStackItem, direction: 'left' | 'right' | 'up' | 'down') => void;
  style?: ViewStyle;
  cardStyle?: ViewStyle;
}

export const CardStack: React.FC<CardStackProps> = ({
  items,
  maxVisible = 3,
  cardOffset = 8,
  scaleStep = 0.05,
  swipeEnabled = true,
  swipeThreshold = screenWidth * 0.25,
  onSwipe,
  style,
  cardStyle,
}) => {
  const [cardStack, setCardStack] = useState<CardStackItem[]>(items);
  const panValues = useRef<Animated.ValueXY[]>(items.map(() => new Animated.ValueXY())).current;

  const createPanResponder = (index: number, item: CardStackItem) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => swipeEnabled,
      onMoveShouldSetPanResponder: () => swipeEnabled,
      onPanResponderMove: Animated.event(
        [null, { dx: panValues[index].x, dy: panValues[index].y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        const dxAbs = Math.abs(gesture.dx);
        const dyAbs = Math.abs(gesture.dy);
        let direction: 'left' | 'right' | 'up' | 'down' | null = null;

        if (dyAbs > swipeThreshold && dyAbs > dxAbs) {
          direction = gesture.dy < 0 ? 'up' : 'down';
        } else if (dxAbs > swipeThreshold) {
          direction = gesture.dx < 0 ? 'left' : 'right';
        }

        if (direction) {
          const toValue =
            direction === 'left'
              ? { x: -screenWidth, y: 0 }
              : direction === 'right'
              ? { x: screenWidth, y: 0 }
              : direction === 'up'
              ? { x: 0, y: -screenHeight }
              : { x: 0, y: screenHeight };

          Animated.timing(panValues[index], {
            toValue,
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            panValues[index].setValue({ x: 0, y: 0 });

            // Rotate swiped card to back
            setCardStack((prev) => {
              const newStack = [...prev.slice(1), prev[0]];
              return newStack;
            });

            onSwipe?.(item, direction);
          });
        } else {
          Animated.spring(panValues[index], {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    });
  };

  const visibleItems = cardStack.slice(0, maxVisible);

  return (
    <View style={[styles.container, style]}>
      {visibleItems
        .map((item, index) => {
          const pan = panValues[index];
          const panResponder = createPanResponder(index, item);

          const translate = {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              {
                rotate: pan.x.interpolate({
                  inputRange: [-screenWidth / 2, 0, screenWidth / 2],
                  outputRange: ['-15deg', '0deg', '15deg'],
                  extrapolate: 'clamp',
                }),
              },
              { scale: new Animated.Value(1 - index * scaleStep) },
            ],
            top: index * cardOffset,
            opacity: 1 - index * 0.2,
            zIndex: maxVisible - index,
            elevation: maxVisible - index,
          };

          return (
            <Animated.View
              key={item.id}
              style={[styles.card, translate, cardStyle]}
              {...(swipeEnabled ? panResponder.panHandlers : {})}
            >
              {item.content}
            </Animated.View>
          );
        })
        .reverse()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  card: {
    position: 'absolute',
    width: '90%',
    borderRadius: 16,
    padding: 20,
    shadowColor: 'rgba(22, 33, 62, 0.8)', // Match section background
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
});
