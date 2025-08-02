import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import type { OrbitalBody } from './OrbitalPhysics';

export interface OrbitalInteractionProps {
  /** Orbital bodies to interact with */
  bodies: OrbitalBody[];
  /** Update bodies callback */
  onUpdateBodies: (bodies: OrbitalBody[]) => void;
  /** Center element */
  center?: {
    position: { x: number; y: number };
    radius: number;
    mass: number;
  };
  /** Interaction types enabled */
  interactionTypes?: {
    drag: boolean;
    tap: boolean;
    pinch: boolean;
    rotate: boolean;
    hover: boolean;
  };
  /** Drag sensitivity */
  dragSensitivity?: number;
  /** Tap sensitivity radius */
  tapSensitivity?: number;
  /** Pinch sensitivity */
  pinchSensitivity?: number;
  /** Rotation sensitivity */
  rotationSensitivity?: number;
  /** Hover sensitivity radius */
  hoverSensitivity?: number;
  /** Gravity manipulation enabled */
  gravityManipulation?: boolean;
  /** Orbital velocity control */
  velocityControl?: boolean;
  /** Body creation enabled */
  bodyCreation?: boolean;
  /** Body deletion enabled */
  bodyDeletion?: boolean;
  /** Visual feedback enabled */
  visualFeedback?: boolean;
  /** Container size */
  containerSize?: { width: number; height: number };
  /** Interaction callbacks */
  onBodySelect?: (body: OrbitalBody) => void;
  onBodyDeselect?: () => void;
  onBodyDrag?: (body: OrbitalBody, position: { x: number; y: number }) => void;
  onBodyTap?: (body: OrbitalBody) => void;
  onBodyCreate?: (position: { x: number; y: number }) => void;
  onBodyDelete?: (body: OrbitalBody) => void;
  onGravityChange?: (gravity: number) => void;
  onVelocityChange?: (body: OrbitalBody, velocity: { x: number; y: number }) => void;
  /** Test ID for testing */
  testID?: string;
}

interface InteractionState {
  selectedBody: OrbitalBody | null;
  dragOffset: { x: number; y: number };
  initialPosition: { x: number; y: number };
  isInteracting: boolean;
  interactionType: 'drag' | 'tap' | 'pinch' | 'rotate' | 'hover' | null;
  hoverPosition: { x: number; y: number };
  visualIndicators: Array<{
    id: string;
    position: { x: number; y: number };
    type: 'selection' | 'hover' | 'gravity' | 'velocity';
    opacity: Animated.Value;
    scale: Animated.Value;
  }>;
}

/**
 * OrbitalInteraction - Interaction handler for orbital elements
 * 
 * Features:
 * - Multi-touch gesture support (drag, tap, pinch, rotate)
 * - Orbital body selection and manipulation
 * - Gravity and velocity control
 * - Body creation and deletion
 * - Visual feedback and indicators
 * - Real-time interaction updates
 * - Performance optimizations
 * - Collision detection for interactions
 * 
 * @param bodies - Array of orbital bodies
 * @param onUpdateBodies - Callback to update bodies
 * @param center - Center element configuration
 * @param interactionTypes - Enabled interaction types
 * @param dragSensitivity - Drag sensitivity (default: 1)
 * @param tapSensitivity - Tap sensitivity radius (default: 20)
 * @param pinchSensitivity - Pinch sensitivity (default: 1)
 * @param rotationSensitivity - Rotation sensitivity (default: 1)
 * @param hoverSensitivity - Hover sensitivity radius (default: 30)
 * @param gravityManipulation - Gravity manipulation enabled (default: false)
 * @param velocityControl - Orbital velocity control (default: false)
 * @param bodyCreation - Body creation enabled (default: false)
 * @param bodyDeletion - Body deletion enabled (default: false)
 * @param visualFeedback - Visual feedback enabled (default: true)
 * @param containerSize - Container size (default: { width: 400, height: 400 })
 * @param onBodySelect - Body selection callback
 * @param onBodyDeselect - Body deselection callback
 * @param onBodyDrag - Body drag callback
 * @param onBodyTap - Body tap callback
 * @param onBodyCreate - Body creation callback
 * @param onBodyDelete - Body deletion callback
 * @param onGravityChange - Gravity change callback
 * @param onVelocityChange - Velocity change callback
 * @param testID - Test ID for testing
 * 
 * @returns OrbitalInteraction component
 */
export const OrbitalInteraction: React.FC<OrbitalInteractionProps> = ({
  bodies,
  onUpdateBodies,
  center,
  interactionTypes = {
    drag: true,
    tap: true,
    pinch: false,
    rotate: false,
    hover: true,
  },
  dragSensitivity = 1,
  tapSensitivity = 20,
  pinchSensitivity = 1,
  rotationSensitivity = 1,
  hoverSensitivity = 30,
  gravityManipulation = false,
  velocityControl = false,
  bodyCreation = false,
  bodyDeletion = false,
  visualFeedback = true,
  containerSize = { width: 400, height: 400 },
  onBodySelect,
  onBodyDeselect,
  onBodyDrag,
  onBodyTap,
  onBodyCreate,
  onBodyDelete,
  onGravityChange,
  onVelocityChange,
  testID
}) => {
  const [interactionState, setInteractionState] = useState<InteractionState>({
    selectedBody: null,
    dragOffset: { x: 0, y: 0 },
    initialPosition: { x: 0, y: 0 },
    isInteracting: false,
    interactionType: null,
    hoverPosition: { x: 0, y: 0 },
    visualIndicators: [],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: handlePanResponderGrant,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderRelease,
      onPanResponderTerminate: handlePanResponderTerminate,
    })
  ).current;

  // Calculate distance between two points
  const calculateDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }): number => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Find body at position
  const findBodyAtPosition = (position: { x: number; y: number }): OrbitalBody | null => {
    for (const body of bodies) {
      const distance = calculateDistance(position, body.position);
      if (distance <= body.radius + tapSensitivity) {
        return body;
      }
    }
    return null;
  };

  // Handle pan responder grant (touch start)
  function handlePanResponderGrant(evt: GestureResponderEvent) {
    const { locationX, locationY } = evt.nativeEvent;
    const touchPosition = { x: locationX, y: locationY };
    
    // Find body at touch position
    const body = findBodyAtPosition(touchPosition);
    
    if (body && interactionTypes.drag) {
      // Start dragging
      setInteractionState(prev => ({
        ...prev,
        selectedBody: body,
        dragOffset: {
          x: touchPosition.x - body.position.x,
          y: touchPosition.y - body.position.y,
        },
        initialPosition: { ...body.position },
        isInteracting: true,
        interactionType: 'drag',
      }));
      
      onBodySelect?.(body);
      createVisualIndicator(body.position, 'selection');
      
    } else if (interactionTypes.tap) {
      // Handle tap
      setInteractionState(prev => ({
        ...prev,
        isInteracting: true,
        interactionType: 'tap',
        initialPosition: touchPosition,
      }));
    }
  }

  // Handle pan responder move (touch move)
  function handlePanResponderMove(evt: GestureResponderEvent, gestureState: PanResponderGestureState) {
    const { locationX, locationY } = evt.nativeEvent;
    const touchPosition = { x: locationX, y: locationY };
    
    if (interactionState.selectedBody && interactionState.interactionType === 'drag') {
      // Update body position
      const newPosition = {
        x: touchPosition.x - interactionState.dragOffset.x,
        y: touchPosition.y - interactionState.dragOffset.y,
      };
      
      // Constrain to container bounds
      const constrainedPosition = {
        x: Math.max(interactionState.selectedBody.radius, 
            Math.min(containerSize.width - interactionState.selectedBody.radius, newPosition.x)),
        y: Math.max(interactionState.selectedBody.radius, 
            Math.min(containerSize.height - interactionState.selectedBody.radius, newPosition.y)),
      };
      
      // Update body
      const updatedBodies = bodies.map(body => {
        if (body.id === interactionState.selectedBody!.id) {
          const updatedBody = {
            ...body,
            position: constrainedPosition,
          };
          
          // Update velocity if velocity control is enabled
          if (velocityControl) {
            const dx = constrainedPosition.x - interactionState.initialPosition.x;
            const dy = constrainedPosition.y - interactionState.initialPosition.y;
            const velocity = {
              x: dx * dragSensitivity * 0.1,
              y: dy * dragSensitivity * 0.1,
            };
            updatedBody.velocity = velocity;
            onVelocityChange?.(updatedBody, velocity);
          }
          
          return updatedBody;
        }
        return body;
      });
      
      onUpdateBodies(updatedBodies);
      onBodyDrag?.(interactionState.selectedBody, constrainedPosition);
      
      // Update visual indicators
      updateVisualIndicator(interactionState.selectedBody.id, constrainedPosition);
      
    } else if (interactionTypes.hover) {
      // Handle hover
      setInteractionState(prev => ({
        ...prev,
        hoverPosition: touchPosition,
      }));
      
      const hoverBody = findBodyAtPosition(touchPosition);
      if (hoverBody) {
        createVisualIndicator(hoverBody.position, 'hover');
      }
    }
  }

  // Handle pan responder release (touch end)
  function handlePanResponderRelease(evt: GestureResponderEvent) {
    const { locationX, locationY } = evt.nativeEvent;
    const touchPosition = { x: locationX, y: locationY };
    
    if (interactionState.interactionType === 'drag' && interactionState.selectedBody) {
      // End dragging
      onBodyDeselect?.();
      removeVisualIndicator(interactionState.selectedBody.id);
      
    } else if (interactionState.interactionType === 'tap') {
      // Handle tap completion
      const body = findBodyAtPosition(touchPosition);
      
      if (body) {
        onBodyTap?.(body);
        
        // Handle body deletion
        if (bodyDeletion && interactionState.selectedBody === body) {
          const updatedBodies = bodies.filter(b => b.id !== body.id);
          onUpdateBodies(updatedBodies);
          onBodyDelete?.(body);
        }
        
      } else if (bodyCreation) {
        // Create new body
        onBodyCreate?.(touchPosition);
      }
    }
    
    // Reset interaction state
    setInteractionState(prev => ({
      ...prev,
      selectedBody: null,
      dragOffset: { x: 0, y: 0 },
      initialPosition: { x: 0, y: 0 },
      isInteracting: false,
      interactionType: null,
    }));
  }

  // Handle pan responder terminate
  function handlePanResponderTerminate() {
    // Reset interaction state
    setInteractionState(prev => ({
      ...prev,
      selectedBody: null,
      dragOffset: { x: 0, y: 0 },
      initialPosition: { x: 0, y: 0 },
      isInteracting: false,
      interactionType: null,
    }));
    
    onBodyDeselect?.();
  }

  // Create visual indicator
  const createVisualIndicator = (position: { x: number; y: number }, type: InteractionState['visualIndicators'][0]['type']) => {
    if (!visualFeedback) return;
    
    const indicator = {
      id: `indicator-${Date.now()}-${Math.random()}`,
      position,
      type,
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.5),
    };
    
    setInteractionState(prev => ({
      ...prev,
      visualIndicators: [...prev.visualIndicators, indicator],
    }));
    
    // Animate indicator appearance
    Animated.parallel([
      Animated.timing(indicator.opacity, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(indicator.scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Update visual indicator
  const updateVisualIndicator = (bodyId: string, position: { x: number; y: number }) => {
    setInteractionState(prev => ({
      ...prev,
      visualIndicators: prev.visualIndicators.map(indicator => {
        if (indicator.id.includes(bodyId)) {
          return { ...indicator, position };
        }
        return indicator;
      }),
    }));
  };

  // Remove visual indicator
  const removeVisualIndicator = (bodyId: string) => {
    const indicatorToRemove = interactionState.visualIndicators.find(i => i.id.includes(bodyId));
    if (indicatorToRemove) {
      Animated.parallel([
        Animated.timing(indicatorToRemove.opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(indicatorToRemove.scale, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setInteractionState(prev => ({
          ...prev,
          visualIndicators: prev.visualIndicators.filter(i => i.id !== indicatorToRemove.id),
        }));
      });
    }
  };

  // Render visual indicators
  const renderVisualIndicators = () => {
    if (!visualFeedback) return null;
    
    return interactionState.visualIndicators.map(indicator => {
      const color = (() => {
        switch (indicator.type) {
          case 'selection': return SignatureBlues.primary;
          case 'hover': return SignatureBlues.glow;
          case 'gravity': return SignatureBlues.accent;
          case 'velocity': return SignatureBlues.light;
          default: return SignatureBlues.primary;
        }
      })();
      
      return (
        <Animated.View
          key={indicator.id}
          style={[
            styles.visualIndicator,
            {
              left: indicator.position.x - 20,
              top: indicator.position.y - 20,
              opacity: indicator.opacity,
              transform: [{ scale: indicator.scale }],
              borderColor: color as string,
              backgroundColor: `${color as string}20`,
            },
          ]}
        />
      );
    });
  };

  // Handle gravity manipulation
  const handleGravityManipulation = (gestureState: PanResponderGestureState) => {
    if (!gravityManipulation) return;
    
    const gravityChange = gestureState.dy * 0.01;
    onGravityChange?.(gravityChange);
  };

  return (
    <View
      style={[
        styles.container,
        { width: containerSize.width, height: containerSize.height }
      ]}
      testID={testID}
      {...panResponder.panHandlers}
    >
      {renderVisualIndicators()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  visualIndicator: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
});

export default OrbitalInteraction;
