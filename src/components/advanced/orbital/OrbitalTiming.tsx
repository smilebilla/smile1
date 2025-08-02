import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

export interface OrbitalTimingConfig {
  /** Timing function name */
  name: string;
  /** Easing function */
  easing: (value: number) => number;
  /** Duration in milliseconds */
  duration: number;
  /** Delay in milliseconds */
  delay?: number;
  /** Repeat count (-1 for infinite) */
  repeat?: number;
  /** Direction */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  /** Fill mode */
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

export interface OrbitalTimingProps {
  /** Timing configurations */
  timings: OrbitalTimingConfig[];
  /** Active timing */
  activeTiming?: string;
  /** Global speed multiplier */
  speed?: number;
  /** Timing enabled */
  enabled?: boolean;
  /** Pause all timings */
  paused?: boolean;
  /** Synchronize timings */
  synchronized?: boolean;
  /** Master clock enabled */
  masterClock?: boolean;
  /** Master clock tick rate (ms) */
  masterClockTickRate?: number;
  /** Timing change callback */
  onTimingChange?: (timingName: string) => void;
  /** Tick callback */
  onTick?: (timestamp: number) => void;
  /** Timing complete callback */
  onTimingComplete?: (timingName: string) => void;
  /** Children render function */
  children?: (currentTiming: OrbitalTimingConfig | null, timestamp: number) => React.ReactNode;
}

/**
 * OrbitalTiming - Timing control system for orbital animations
 * 
 * Features:
 * - Predefined orbital timing functions
 * - Custom easing curve support
 * - Synchronized timing control
 * - Master clock system
 * - Speed control and time scaling
 * - Timing state management
 * - Real-time timing updates
 * - Performance optimizations
 * 
 * @param timings - Array of timing configurations
 * @param activeTiming - Currently active timing name
 * @param speed - Global speed multiplier (default: 1)
 * @param enabled - Timing enabled (default: true)
 * @param paused - Pause all timings (default: false)
 * @param synchronized - Synchronize timings (default: false)
 * @param masterClock - Master clock enabled (default: true)
 * @param masterClockTickRate - Master clock tick rate (default: 16)
 * @param onTimingChange - Timing change callback
 * @param onTick - Tick callback
 * @param onTimingComplete - Timing complete callback
 * @param children - Children render function
 * 
 * @returns OrbitalTiming component
 */
export const OrbitalTiming: React.FC<OrbitalTimingProps> = ({
  timings,
  activeTiming,
  speed = 1,
  enabled = true,
  paused = false,
  synchronized = false,
  masterClock = true,
  masterClockTickRate = 16,
  onTimingChange,
  onTick,
  onTimingComplete,
  children
}) => {
  const [currentTiming, setCurrentTiming] = useState<OrbitalTimingConfig | null>(null);
  const [timestamp, setTimestamp] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const masterClockRef = useRef<number | null>(null);
  const timingStatesRef = useRef<Map<string, {
    startTime: number;
    currentRepeat: number;
    isReverse: boolean;
    isComplete: boolean;
  }>>(new Map());
  
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  // Predefined orbital timing functions
  const defaultTimings: OrbitalTimingConfig[] = [
    {
      name: 'orbital-linear',
      easing: Easing.linear,
      duration: 10000,
      repeat: -1,
      direction: 'normal',
    },
    {
      name: 'orbital-ease',
      easing: Easing.ease,
      duration: 8000,
      repeat: -1,
      direction: 'normal',
    },
    {
      name: 'orbital-ease-in',
      easing: Easing.in(Easing.ease),
      duration: 6000,
      repeat: -1,
      direction: 'normal',
    },
    {
      name: 'orbital-ease-out',
      easing: Easing.out(Easing.ease),
      duration: 6000,
      repeat: -1,
      direction: 'normal',
    },
    {
      name: 'orbital-ease-in-out',
      easing: Easing.inOut(Easing.ease),
      duration: 8000,
      repeat: -1,
      direction: 'normal',
    },
    {
      name: 'orbital-elastic',
      easing: Easing.elastic(1),
      duration: 5000,
      repeat: 3,
      direction: 'alternate',
    },
    {
      name: 'orbital-bounce',
      easing: Easing.bounce,
      duration: 4000,
      repeat: 2,
      direction: 'normal',
    },
    {
      name: 'orbital-back',
      easing: Easing.back(1.7),
      duration: 3000,
      repeat: 1,
      direction: 'alternate',
    },
    {
      name: 'orbital-circular',
      easing: Easing.circle,
      duration: 12000,
      repeat: -1,
      direction: 'normal',
    },
    {
      name: 'orbital-sine',
      easing: Easing.sin,
      duration: 7000,
      repeat: -1,
      direction: 'alternate',
    },
    {
      name: 'orbital-cubic',
      easing: Easing.cubic,
      duration: 9000,
      repeat: -1,
      direction: 'normal',
    },
    {
      name: 'orbital-quad',
      easing: Easing.quad,
      duration: 5000,
      repeat: -1,
      direction: 'alternate',
    },
  ];

  // Combine default and custom timings
  const allTimings = [...defaultTimings, ...timings];

  // Find active timing configuration
  const findActiveTiming = (name: string | undefined): OrbitalTimingConfig | null => {
    if (!name) return null;
    return allTimings.find(timing => timing.name === name) || null;
  };

  // Initialize timing state
  const initializeTimingState = (timing: OrbitalTimingConfig) => {
    timingStatesRef.current.set(timing.name, {
      startTime: timestamp,
      currentRepeat: 0,
      isReverse: false,
      isComplete: false,
    });
  };

  // Update timing state
  const updateTimingState = (timing: OrbitalTimingConfig, currentTime: number) => {
    const state = timingStatesRef.current.get(timing.name);
    if (!state) return;

    const elapsed = currentTime - state.startTime;
    const scaledDuration = timing.duration / speed;
    
    // Check if timing is complete
    const repeatCount = timing.repeat ?? -1;
    if (repeatCount !== -1 && state.currentRepeat >= repeatCount) {
      state.isComplete = true;
      onTimingComplete?.(timing.name);
      return;
    }

    // Check if current cycle is complete
    if (elapsed >= scaledDuration) {
      state.currentRepeat++;
      state.startTime = currentTime;
      
      // Handle direction changes
      if (timing.direction === 'alternate' || timing.direction === 'alternate-reverse') {
        state.isReverse = !state.isReverse;
      } else if (timing.direction === 'reverse') {
        state.isReverse = true;
      } else {
        state.isReverse = false;
      }
    }
  };

  // Calculate timing progress
  const calculateTimingProgress = (timing: OrbitalTimingConfig, currentTime: number): number => {
    const state = timingStatesRef.current.get(timing.name);
    if (!state || state.isComplete) return 0;

    const elapsed = currentTime - state.startTime;
    const scaledDuration = timing.duration / speed;
    const rawProgress = Math.min(elapsed / scaledDuration, 1);
    
    // Apply easing
    const easedProgress = timing.easing(rawProgress);
    
    // Apply direction
    return state.isReverse ? 1 - easedProgress : easedProgress;
  };

  // Master clock tick
  const masterClockTick = (currentTime: number) => {
    if (!enabled || paused) return;

    const adjustedTime = currentTime * speed;
    setTimestamp(adjustedTime);
    
    // Update active timing
    if (currentTiming) {
      if (!timingStatesRef.current.has(currentTiming.name)) {
        initializeTimingState(currentTiming);
      }
      updateTimingState(currentTiming, adjustedTime);
    }
    
    // Update all timings if synchronized
    if (synchronized) {
      allTimings.forEach(timing => {
        if (!timingStatesRef.current.has(timing.name)) {
          initializeTimingState(timing);
        }
        updateTimingState(timing, adjustedTime);
      });
    }
    
    onTick?.(adjustedTime);
  };

  // Start master clock
  const startMasterClock = () => {
    if (!masterClock || isRunning) return;
    
    setIsRunning(true);
    startTimeRef.current = Date.now();
    
    const tick = () => {
      if (!enabled || paused) {
        masterClockRef.current = requestAnimationFrame(tick);
        return;
      }
      
      const currentTime = Date.now() - startTimeRef.current;
      masterClockTick(currentTime);
      
      masterClockRef.current = requestAnimationFrame(tick);
    };
    
    masterClockRef.current = requestAnimationFrame(tick);
  };

  // Stop master clock
  const stopMasterClock = () => {
    if (masterClockRef.current) {
      cancelAnimationFrame(masterClockRef.current);
      masterClockRef.current = null;
    }
    setIsRunning(false);
  };

  // Pause master clock
  const pauseMasterClock = () => {
    if (isRunning) {
      pausedTimeRef.current = Date.now();
      stopMasterClock();
    }
  };

  // Resume master clock
  const resumeMasterClock = () => {
    if (pausedTimeRef.current > 0) {
      const pausedDuration = Date.now() - pausedTimeRef.current;
      startTimeRef.current += pausedDuration;
      pausedTimeRef.current = 0;
      startMasterClock();
    }
  };

  // Reset timing
  const resetTiming = (timingName?: string) => {
    if (timingName) {
      timingStatesRef.current.delete(timingName);
    } else {
      timingStatesRef.current.clear();
    }
    setTimestamp(0);
    startTimeRef.current = Date.now();
  };

  // Set active timing
  const setActiveTiming = (timingName: string) => {
    const timing = findActiveTiming(timingName);
    if (timing) {
      setCurrentTiming(timing);
      onTimingChange?.(timingName);
    }
  };

  // Get timing progress
  const getTimingProgress = (timingName: string): number => {
    const timing = findActiveTiming(timingName);
    if (!timing) return 0;
    return calculateTimingProgress(timing, timestamp);
  };

  // Get timing state
  const getTimingState = (timingName: string) => {
    return timingStatesRef.current.get(timingName);
  };

  // Check if timing is complete
  const isTimingComplete = (timingName: string): boolean => {
    const state = timingStatesRef.current.get(timingName);
    return state?.isComplete || false;
  };

  // Effect for active timing changes
  useEffect(() => {
    if (activeTiming) {
      setActiveTiming(activeTiming);
    }
  }, [activeTiming]);

  // Effect for enabled state changes
  useEffect(() => {
    if (enabled) {
      startMasterClock();
    } else {
      stopMasterClock();
    }
  }, [enabled]);

  // Effect for paused state changes
  useEffect(() => {
    if (paused) {
      pauseMasterClock();
    } else {
      resumeMasterClock();
    }
  }, [paused]);

  // Effect for speed changes
  useEffect(() => {
    // Reset timing states when speed changes
    timingStatesRef.current.clear();
    startTimeRef.current = Date.now();
  }, [speed]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMasterClock();
    };
  }, []);

  // Render children with timing data
  if (children) {
    return <>{children(currentTiming, timestamp)}</>;
  }

  return null;
};

// Export utility functions for creating custom timing configurations
export const createOrbitalTiming = (
  name: string,
  easing: (value: number) => number,
  duration: number,
  options: Partial<Omit<OrbitalTimingConfig, 'name' | 'easing' | 'duration'>> = {}
): OrbitalTimingConfig => ({
  name,
  easing,
  duration,
  delay: 0,
  repeat: -1,
  direction: 'normal',
  fillMode: 'none',
  ...options,
});

export const createCustomEasing = (
  controlPoints: [number, number, number, number]
): (value: number) => number => {
  return Easing.bezier(controlPoints[0], controlPoints[1], controlPoints[2], controlPoints[3]);
};

export const createSteppedEasing = (
  steps: number,
  jumpStart: boolean = false
): (value: number) => number => {
  return (value: number) => {
    const step = 1 / steps;
    const currentStep = Math.floor(value / step);
    return jumpStart ? (currentStep + 1) * step : currentStep * step;
  };
};

export default OrbitalTiming;
