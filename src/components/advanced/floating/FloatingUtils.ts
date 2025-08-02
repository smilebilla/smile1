import { Dimensions } from 'react-native';

// Vector utilities
export interface Vector2D {
  x: number;
  y: number;
}

export const Vector2D = {
  create: (x: number, y: number): Vector2D => ({ x, y }),
  
  add: (a: Vector2D, b: Vector2D): Vector2D => ({
    x: a.x + b.x,
    y: a.y + b.y,
  }),
  
  subtract: (a: Vector2D, b: Vector2D): Vector2D => ({
    x: a.x - b.x,
    y: a.y - b.y,
  }),
  
  multiply: (v: Vector2D, scalar: number): Vector2D => ({
    x: v.x * scalar,
    y: v.y * scalar,
  }),
  
  magnitude: (v: Vector2D): number => Math.sqrt(v.x * v.x + v.y * v.y),
  
  normalize: (v: Vector2D): Vector2D => {
    const mag = Vector2D.magnitude(v);
    return mag > 0 ? { x: v.x / mag, y: v.y / mag } : { x: 0, y: 0 };
  },
  
  distance: (a: Vector2D, b: Vector2D): number => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  },
  
  angle: (v: Vector2D): number => Math.atan2(v.y, v.x),
  
  fromAngle: (angle: number, magnitude: number = 1): Vector2D => ({
    x: Math.cos(angle) * magnitude,
    y: Math.sin(angle) * magnitude,
  }),
  
  dot: (a: Vector2D, b: Vector2D): number => a.x * b.x + a.y * b.y,
  
  lerp: (a: Vector2D, b: Vector2D, t: number): Vector2D => ({
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  }),
};

// Color utilities
export const ColorUtils = {
  hexToRgba: (hex: string, alpha: number = 1): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(0, 0, 0, ${alpha})`;
    
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
  
  rgbaToHex: (rgba: string): string => {
    const values = rgba.match(/\d+/g);
    if (!values || values.length < 3) return '#000000';
    
    const r = parseInt(values[0]);
    const g = parseInt(values[1]);
    const b = parseInt(values[2]);
    
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  },
  
  interpolate: (color1: string, color2: string, factor: number): string => {
    const c1 = ColorUtils.hexToRgba(color1).match(/\d+/g);
    const c2 = ColorUtils.hexToRgba(color2).match(/\d+/g);
    
    if (!c1 || !c2) return color1;
    
    const r = Math.round(parseInt(c1[0]) + (parseInt(c2[0]) - parseInt(c1[0])) * factor);
    const g = Math.round(parseInt(c1[1]) + (parseInt(c2[1]) - parseInt(c1[1])) * factor);
    const b = Math.round(parseInt(c1[2]) + (parseInt(c2[2]) - parseInt(c1[2])) * factor);
    
    return `rgb(${r}, ${g}, ${b})`;
  },
  
  adjustOpacity: (color: string, opacity: number): string => {
    if (color.startsWith('#')) {
      return ColorUtils.hexToRgba(color, opacity);
    }
    
    if (color.startsWith('rgb')) {
      return color.replace(/rgba?\([^)]*\)/, (match) => {
        const values = match.match(/\d+/g);
        if (!values || values.length < 3) return match;
        return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${opacity})`;
      });
    }
    
    return color;
  },
};

// Animation utilities
export const AnimationUtils = {
  easeInOut: (t: number): number => t * t * (3 - 2 * t),
  
  easeIn: (t: number): number => t * t,
  
  easeOut: (t: number): number => 1 - (1 - t) * (1 - t),
  
  bounce: (t: number): number => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },
  
  elastic: (t: number): number => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    
    const p = 0.3;
    const s = p / 4;
    return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
  },
  
  oscillate: (t: number, frequency: number = 1): number => {
    return Math.sin(t * Math.PI * 2 * frequency);
  },
};

// Physics utilities
export const PhysicsUtils = {
  applyForce: (velocity: Vector2D, force: Vector2D, mass: number): Vector2D => {
    const acceleration = Vector2D.multiply(force, 1 / mass);
    return Vector2D.add(velocity, acceleration);
  },
  
  applyDamping: (velocity: Vector2D, damping: number): Vector2D => {
    return Vector2D.multiply(velocity, damping);
  },
  
  calculateGravity: (position: Vector2D, attractor: Vector2D, mass: number): Vector2D => {
    const distance = Vector2D.distance(position, attractor);
    const direction = Vector2D.normalize(Vector2D.subtract(attractor, position));
    const force = (mass * 100) / (distance * distance + 100); // Add small value to prevent division by zero
    
    return Vector2D.multiply(direction, force);
  },
  
  wrapPosition: (position: Vector2D, bounds: { width: number; height: number }): Vector2D => {
    let { x, y } = position;
    
    if (x < 0) x = bounds.width;
    if (x > bounds.width) x = 0;
    if (y < 0) y = bounds.height;
    if (y > bounds.height) y = 0;
    
    return { x, y };
  },
  
  bouncePosition: (position: Vector2D, velocity: Vector2D, bounds: { width: number; height: number }, restitution: number = 0.8): { position: Vector2D; velocity: Vector2D } => {
    let newPosition = { ...position };
    let newVelocity = { ...velocity };
    
    if (position.x < 0 || position.x > bounds.width) {
      newVelocity.x *= -restitution;
      newPosition.x = Math.max(0, Math.min(bounds.width, position.x));
    }
    
    if (position.y < 0 || position.y > bounds.height) {
      newVelocity.y *= -restitution;
      newPosition.y = Math.max(0, Math.min(bounds.height, position.y));
    }
    
    return { position: newPosition, velocity: newVelocity };
  },
};

// Random utilities
export const RandomUtils = {
  between: (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  },
  
  integer: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  boolean: (probability: number = 0.5): boolean => {
    return Math.random() < probability;
  },
  
  choice: <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  },
  
  gaussian: (mean: number = 0, standardDeviation: number = 1): number => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    
    const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return z * standardDeviation + mean;
  },
  
  perlin: (x: number, y: number = 0): number => {
    // Simple perlin noise approximation
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => a + t * (b - a);
    
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    
    x -= Math.floor(x);
    y -= Math.floor(y);
    
    const u = fade(x);
    const v = fade(y);
    
    // Simple hash function
    const hash = (n: number) => {
      n = (n << 13) ^ n;
      return ((n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 0x7fffffff;
    };
    
    const a = hash(X + hash(Y));
    const b = hash(X + 1 + hash(Y));
    const c = hash(X + hash(Y + 1));
    const d = hash(X + 1 + hash(Y + 1));
    
    return lerp(lerp(a, b, u), lerp(c, d, u), v);
  },
};

// Screen utilities
export const ScreenUtils = {
  dimensions: Dimensions.get('window'),
  
  isPhone: (): boolean => {
    const { width, height } = ScreenUtils.dimensions;
    return Math.min(width, height) < 600;
  },
  
  isTablet: (): boolean => {
    return !ScreenUtils.isPhone();
  },
  
  orientation: (): 'portrait' | 'landscape' => {
    const { width, height } = ScreenUtils.dimensions;
    return width > height ? 'landscape' : 'portrait';
  },
  
  scale: (value: number): number => {
    const { width } = ScreenUtils.dimensions;
    const baseWidth = 375; // iPhone X width
    return (width / baseWidth) * value;
  },
  
  moderateScale: (value: number, factor: number = 0.5): number => {
    return value + (ScreenUtils.scale(value) - value) * factor;
  },
};

export default {
  Vector2D,
  ColorUtils,
  AnimationUtils,
  PhysicsUtils,
  RandomUtils,
  ScreenUtils,
};
