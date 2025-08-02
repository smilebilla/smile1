import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  PanResponder,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
  Dimensions,
} from 'react-native';

/**
 * Color format types
 */
export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva';

/**
 * Color picker size variants
 */
export type ColorPickerSize = 'small' | 'medium' | 'large';

/**
 * Color picker variant types
 */
export type ColorPickerVariant = 'default' | 'compact' | 'minimal' | 'advanced';

/**
 * Color value interface
 */
export interface ColorValue {
  hex: string;
  rgb: { r: number; g: number; b: number };
  rgba: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number };
  hsla: { h: number; s: number; l: number; a: number };
  hsv: { h: number; s: number; v: number };
  hsva: { h: number; s: number; v: number; a: number };
}

/**
 * Predefined color swatch
 */
export interface ColorSwatch {
  color: string;
  label?: string;
  value?: string;
}

/**
 * Color picker component props
 */
export interface ColorPickerProps {
  /** Current color value (controlled) */
  value?: string;
  /** Default color value (uncontrolled) */
  defaultValue?: string;
  /** Color format */
  format?: ColorFormat;
  /** Size variant */
  size?: ColorPickerSize;
  /** Variant type */
  variant?: ColorPickerVariant;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Whether the picker is loading */
  loading?: boolean;
  /** Whether the picker is read-only */
  readOnly?: boolean;
  /** Color change handler */
  onColorChange?: (color: string, colorValue: ColorValue) => void;
  /** Color change complete handler */
  onColorChangeComplete?: (color: string, colorValue: ColorValue) => void;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom picker style */
  pickerStyle?: ViewStyle;
  /** Custom indicator style */
  indicatorStyle?: ViewStyle;
  /** Custom slider style */
  sliderStyle?: ViewStyle;
  /** Custom swatch style */
  swatchStyle?: ViewStyle;
  /** Custom input style */
  inputStyle?: ViewStyle;
  /** Custom label style */
  labelStyle?: TextStyle;
  /** Show color swatches */
  showSwatches?: boolean;
  /** Predefined color swatches */
  swatches?: ColorSwatch[];
  /** Show color input */
  showColorInput?: boolean;
  /** Show opacity slider */
  showOpacity?: boolean;
  /** Show color preview */
  showPreview?: boolean;
  /** Show color values */
  showValues?: boolean;
  /** Enable smooth animation */
  smoothAnimation?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
  /** Custom render function for picker */
  renderPicker?: (props: {
    color: string;
    colorValue: ColorValue;
    size: ColorPickerSize;
    style: ViewStyle;
  }) => React.ReactNode;
  /** Custom render function for swatch */
  renderSwatch?: (props: {
    swatch: ColorSwatch;
    isSelected: boolean;
    onPress: () => void;
    style: ViewStyle;
  }) => React.ReactNode;
  /** Custom render function for preview */
  renderPreview?: (props: {
    color: string;
    colorValue: ColorValue;
    style: ViewStyle;
  }) => React.ReactNode;
  /** Show advanced controls */
  showAdvancedControls?: boolean;
  /** Custom picker width */
  pickerWidth?: number;
  /** Custom picker height */
  pickerHeight?: number;
  /** Enable eyedropper tool */
  enableEyedropper?: boolean;
  /** Recent colors limit */
  recentColorsLimit?: number;
  /** Show recent colors */
  showRecentColors?: boolean;
  /** Recent colors */
  recentColors?: string[];
  /** Recent colors change handler */
  onRecentColorsChange?: (colors: string[]) => void;
}

/**
 * Size configuration for different picker sizes
 */
const sizeConfigs = {
  small: {
    pickerSize: 200,
    indicatorSize: 16,
    sliderHeight: 20,
    sliderWidth: 200,
    swatchSize: 24,
    fontSize: 12,
    spacing: 8,
    padding: 12,
  },
  medium: {
    pickerSize: 250,
    indicatorSize: 20,
    sliderHeight: 24,
    sliderWidth: 250,
    swatchSize: 32,
    fontSize: 14,
    spacing: 12,
    padding: 16,
  },
  large: {
    pickerSize: 300,
    indicatorSize: 24,
    sliderHeight: 28,
    sliderWidth: 300,
    swatchSize: 40,
    fontSize: 16,
    spacing: 16,
    padding: 20,
  },
};

/**
 * Default color swatches
 */
const defaultSwatches: ColorSwatch[] = [
  { color: '#FF0000', label: 'Red' },
  { color: '#00FF00', label: 'Green' },
  { color: '#0000FF', label: 'Blue' },
  { color: '#FFFF00', label: 'Yellow' },
  { color: '#FF00FF', label: 'Magenta' },
  { color: '#00FFFF', label: 'Cyan' },
  { color: '#000000', label: 'Black' },
  { color: '#FFFFFF', label: 'White' },
  { color: '#808080', label: 'Gray' },
  { color: '#FFA500', label: 'Orange' },
  { color: '#800080', label: 'Purple' },
  { color: '#008000', label: 'Dark Green' },
  { color: '#000080', label: 'Navy' },
  { color: '#800000', label: 'Maroon' },
  { color: '#008080', label: 'Teal' },
  { color: '#C0C0C0', label: 'Silver' },
];

/**
 * Color conversion utilities
 */
const colorUtils = {
  // Convert hex to RGB
  hexToRgb: (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : { r: 0, g: 0, b: 0 };
  },

  // Convert RGB to hex
  rgbToHex: (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  },

  // Convert RGB to HSL
  rgbToHsl: (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  },

  // Convert HSL to RGB
  hslToRgb: (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    if (s === 0) {
      const gray = l * 255;
      return { r: gray, g: gray, b: gray };
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1/3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1/3);

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  },

  // Convert RGB to HSV
  rgbToHsv: (r: number, g: number, b: number): { h: number; s: number; v: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    const v = max;
    const d = max - min;
    const s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, v: v * 100 };
  },

  // Convert HSV to RGB
  hsvToRgb: (h: number, s: number, v: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    v /= 100;
    
    const c = v * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;

    if (h < 1/6) {
      r = c; g = x; b = 0;
    } else if (h < 2/6) {
      r = x; g = c; b = 0;
    } else if (h < 3/6) {
      r = 0; g = c; b = x;
    } else if (h < 4/6) {
      r = 0; g = x; b = c;
    } else if (h < 5/6) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  },

  // Get color value object
  getColorValue: (color: string): ColorValue => {
    const rgb = colorUtils.hexToRgb(color);
    const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = colorUtils.rgbToHsv(rgb.r, rgb.g, rgb.b);
    
    return {
      hex: color,
      rgb,
      rgba: { ...rgb, a: 1 },
      hsl,
      hsla: { ...hsl, a: 1 },
      hsv,
      hsva: { ...hsv, a: 1 },
    };
  },
};

/**
 * Color picker component
 * 
 * A comprehensive color picker component following Corp Astro design system.
 * Features HSV color space, swatches, opacity control, and various formats.
 * 
 * @param props - Color picker component props
 * @returns JSX.Element
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  defaultValue = '#2E86DE',
  format = 'hex',
  size = 'medium',
  variant = 'default',
  disabled = false,
  loading = false,
  readOnly = false,
  onColorChange,
  onColorChangeComplete,
  containerStyle,
  pickerStyle,
  indicatorStyle,
  sliderStyle,
  swatchStyle,
  inputStyle,
  labelStyle,
  showSwatches = true,
  swatches = defaultSwatches,
  showColorInput = true,
  showOpacity = true,
  showPreview = true,
  showValues = true,
  smoothAnimation = true,
  animationDuration = 200,
  testID,
  accessibilityLabel,
  accessibilityHint,
  hapticFeedback = true,
  renderPicker,
  renderSwatch,
  renderPreview,
  showAdvancedControls = false,
  pickerWidth,
  pickerHeight,
  enableEyedropper = false,
  recentColorsLimit = 8,
  showRecentColors = false,
  recentColors = [],
  onRecentColorsChange,
}) => {
  // State management
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const [hue, setHue] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(100);
  const [brightness, setBrightness] = useState<number>(100);
  const [opacity, setOpacity] = useState<number>(1);
  const [pickerDimensions, setPickerDimensions] = useState({ width: 0, height: 0 });
  const [internalRecentColors, setInternalRecentColors] = useState<string[]>(recentColors);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  // Animation values
  const indicatorScale = useRef(new Animated.Value(1)).current;
  const pickerOpacity = useRef(new Animated.Value(1)).current;
  
  // Refs for pan responders
  const pickerRef = useRef<View>(null);
  const hueSliderRef = useRef<View>(null);
  const opacitySliderRef = useRef<View>(null);
  
  // Size configuration
  const sizeConfig = sizeConfigs[size];
  const finalPickerWidth = pickerWidth || sizeConfig.pickerSize;
  const finalPickerHeight = pickerHeight || sizeConfig.pickerSize;
  
  // Get current color value
  const currentColorValue = colorUtils.getColorValue(currentValue);
  
  // Handle color change
  const handleColorChange = useCallback((newColor: string, complete = false) => {
    if (disabled || loading || readOnly) return;
    
    const colorValue = colorUtils.getColorValue(newColor);
    
    // Haptic feedback
    if (hapticFeedback && complete) {
      // Add haptic feedback here if needed
    }
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(newColor);
    }
    
    // Update recent colors
    if (complete && showRecentColors) {
      const newRecentColors = [newColor, ...internalRecentColors.filter(c => c !== newColor)]
        .slice(0, recentColorsLimit);
      setInternalRecentColors(newRecentColors);
      onRecentColorsChange?.(newRecentColors);
    }
    
    // Call external handlers
    if (complete) {
      onColorChangeComplete?.(newColor, colorValue);
    } else {
      onColorChange?.(newColor, colorValue);
    }
  }, [
    disabled,
    loading,
    readOnly,
    hapticFeedback,
    isControlled,
    showRecentColors,
    internalRecentColors,
    recentColorsLimit,
    onRecentColorsChange,
    onColorChangeComplete,
    onColorChange,
  ]);
  
  // Update HSV values when color changes
  useEffect(() => {
    const hsv = currentColorValue.hsv;
    setHue(hsv.h);
    setSaturation(hsv.s);
    setBrightness(hsv.v);
  }, [currentColorValue]);
  
  // Generate color from HSV
  const generateColorFromHSV = useCallback((h: number, s: number, v: number) => {
    const rgb = colorUtils.hsvToRgb(h, s, v);
    return colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
  }, []);
  
  // Color picker pan responder
  const pickerPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled && !loading && !readOnly,
    onMoveShouldSetPanResponder: () => !disabled && !loading && !readOnly,
    onPanResponderGrant: (evt) => {
      // Animate indicator
      Animated.spring(indicatorScale, {
        toValue: 1.2,
        useNativeDriver: true,
      }).start();
    },
    onPanResponderMove: (evt, gestureState) => {
      if (pickerDimensions.width === 0 || pickerDimensions.height === 0) return;
      
      const x = Math.max(0, Math.min(gestureState.moveX, pickerDimensions.width));
      const y = Math.max(0, Math.min(gestureState.moveY, pickerDimensions.height));
      
      const newSaturation = (x / pickerDimensions.width) * 100;
      const newBrightness = 100 - (y / pickerDimensions.height) * 100;
      
      setSaturation(newSaturation);
      setBrightness(newBrightness);
      
      const newColor = generateColorFromHSV(hue, newSaturation, newBrightness);
      handleColorChange(newColor);
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Animate indicator back
      Animated.spring(indicatorScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      
      // Fire completion event
      const newColor = generateColorFromHSV(hue, saturation, brightness);
      handleColorChange(newColor, true);
    },
  });
  
  // Hue slider pan responder
  const hueSliderPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled && !loading && !readOnly,
    onMoveShouldSetPanResponder: () => !disabled && !loading && !readOnly,
    onPanResponderMove: (evt, gestureState) => {
      const x = Math.max(0, Math.min(gestureState.moveX, sizeConfig.sliderWidth));
      const newHue = (x / sizeConfig.sliderWidth) * 360;
      
      setHue(newHue);
      
      const newColor = generateColorFromHSV(newHue, saturation, brightness);
      handleColorChange(newColor);
    },
    onPanResponderRelease: () => {
      const newColor = generateColorFromHSV(hue, saturation, brightness);
      handleColorChange(newColor, true);
    },
  });
  
  // Opacity slider pan responder
  const opacitySliderPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled && !loading && !readOnly && showOpacity,
    onMoveShouldSetPanResponder: () => !disabled && !loading && !readOnly && showOpacity,
    onPanResponderMove: (evt, gestureState) => {
      const x = Math.max(0, Math.min(gestureState.moveX, sizeConfig.sliderWidth));
      const newOpacity = x / sizeConfig.sliderWidth;
      
      setOpacity(newOpacity);
      
      // For now, just update the picker - in a real implementation you'd handle alpha
      const newColor = generateColorFromHSV(hue, saturation, brightness);
      handleColorChange(newColor);
    },
    onPanResponderRelease: () => {
      const newColor = generateColorFromHSV(hue, saturation, brightness);
      handleColorChange(newColor, true);
    },
  });
  
  // Handle picker layout
  const handlePickerLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setPickerDimensions({ width, height });
  }, []);
  
  // Handle swatch press
  const handleSwatchPress = useCallback((color: string) => {
    if (disabled || loading || readOnly) return;
    
    handleColorChange(color, true);
  }, [disabled, loading, readOnly, handleColorChange]);
  
  // Render color picker
  const renderColorPicker = useCallback(() => {
    const pickerStyles = [
      styles.colorPicker,
      {
        width: finalPickerWidth,
        height: finalPickerHeight,
        backgroundColor: `hsl(${hue}, 100%, 50%)`,
      },
      pickerStyle,
    ];
    
    // Use custom render function if provided
    if (renderPicker) {
      return renderPicker({
        color: currentValue,
        colorValue: currentColorValue,
        size,
        style: StyleSheet.flatten(pickerStyles),
      });
    }
    
    const indicatorX = (saturation / 100) * finalPickerWidth;
    const indicatorY = ((100 - brightness) / 100) * finalPickerHeight;
    
    return (
      <View
        style={pickerStyles}
        onLayout={handlePickerLayout}
        {...pickerPanResponder.panHandlers}
      >
        {/* Saturation overlay */}
        <View style={[styles.saturationOverlay, { width: finalPickerWidth, height: finalPickerHeight }]} />
        
        {/* Brightness overlay */}
        <View style={[styles.brightnessOverlay, { width: finalPickerWidth, height: finalPickerHeight }]} />
        
        {/* Color indicator */}
        <Animated.View
          style={[
            styles.colorIndicator,
            {
              width: sizeConfig.indicatorSize,
              height: sizeConfig.indicatorSize,
              borderRadius: sizeConfig.indicatorSize / 2,
              left: indicatorX - sizeConfig.indicatorSize / 2,
              top: indicatorY - sizeConfig.indicatorSize / 2,
              backgroundColor: currentValue,
              transform: [{ scale: indicatorScale }],
            },
            indicatorStyle,
          ]}
        />
      </View>
    );
  }, [
    finalPickerWidth,
    finalPickerHeight,
    hue,
    pickerStyle,
    renderPicker,
    currentValue,
    currentColorValue,
    size,
    saturation,
    brightness,
    sizeConfig,
    handlePickerLayout,
    pickerPanResponder,
    indicatorScale,
    indicatorStyle,
  ]);
  
  // Render hue slider
  const renderHueSlider = useCallback(() => {
    const sliderStyles = [
      styles.hueSlider,
      {
        width: sizeConfig.sliderWidth,
        height: sizeConfig.sliderHeight,
      },
      sliderStyle,
    ];
    
    const thumbPosition = (hue / 360) * sizeConfig.sliderWidth;
    
    return (
      <View style={sliderStyles} {...hueSliderPanResponder.panHandlers}>
        <View style={styles.hueGradient} />
        <View
          style={[
            styles.sliderThumb,
            {
              left: thumbPosition - 6,
              backgroundColor: `hsl(${hue}, 100%, 50%)`,
            },
          ]}
        />
      </View>
    );
  }, [sizeConfig, sliderStyle, hue, hueSliderPanResponder]);
  
  // Render opacity slider
  const renderOpacitySlider = useCallback(() => {
    if (!showOpacity) return null;
    
    const sliderStyles = [
      styles.opacitySlider,
      {
        width: sizeConfig.sliderWidth,
        height: sizeConfig.sliderHeight,
      },
      sliderStyle,
    ];
    
    const thumbPosition = opacity * sizeConfig.sliderWidth;
    
    return (
      <View style={sliderStyles} {...opacitySliderPanResponder.panHandlers}>
        <View style={[styles.opacityGradient, { backgroundColor: currentValue }]} />
        <View
          style={[
            styles.sliderThumb,
            {
              left: thumbPosition - 6,
              backgroundColor: currentValue,
              opacity: opacity,
            },
          ]}
        />
      </View>
    );
  }, [showOpacity, sizeConfig, sliderStyle, opacity, opacitySliderPanResponder, currentValue]);
  
  // Render color swatches
  const renderColorSwatches = useCallback(() => {
    if (!showSwatches) return null;
    
    return (
      <View style={styles.swatchesContainer}>
        {swatches.map((swatch, index) => {
          const isSelected = swatch.color === currentValue;
          const swatchStyles = [
            styles.colorSwatch,
            {
              width: sizeConfig.swatchSize,
              height: sizeConfig.swatchSize,
              backgroundColor: swatch.color,
              borderColor: isSelected ? '#2E86DE' : 'rgba(255, 255, 255, 0.2)',
              borderWidth: isSelected ? 2 : 1,
            },
            swatchStyle,
          ];
          
          // Use custom render function if provided
          if (renderSwatch) {
            return renderSwatch({
              swatch,
              isSelected,
              onPress: () => handleSwatchPress(swatch.color),
              style: StyleSheet.flatten(swatchStyles),
            });
          }
          
          return (
            <TouchableOpacity
              key={`${swatch.color}-${index}`}
              style={swatchStyles}
              onPress={() => handleSwatchPress(swatch.color)}
              disabled={disabled || loading || readOnly}
              accessible={true}
              accessibilityLabel={swatch.label || `Color ${swatch.color}`}
              accessibilityRole="button"
            />
          );
        })}
      </View>
    );
  }, [
    showSwatches,
    swatches,
    currentValue,
    sizeConfig,
    swatchStyle,
    renderSwatch,
    handleSwatchPress,
    disabled,
    loading,
    readOnly,
  ]);
  
  // Render recent colors
  const renderRecentColors = useCallback(() => {
    if (!showRecentColors || internalRecentColors.length === 0) return null;
    
    return (
      <View style={styles.recentColorsContainer}>
        <Text style={[styles.sectionLabel, { fontSize: sizeConfig.fontSize }]}>
          Recent Colors
        </Text>
        <View style={styles.recentColorsRow}>
          {internalRecentColors.map((color, index) => (
            <TouchableOpacity
              key={`recent-${color}-${index}`}
              style={[
                styles.recentColorSwatch,
                {
                  width: sizeConfig.swatchSize,
                  height: sizeConfig.swatchSize,
                  backgroundColor: color,
                },
              ]}
              onPress={() => handleSwatchPress(color)}
              disabled={disabled || loading || readOnly}
            />
          ))}
        </View>
      </View>
    );
  }, [
    showRecentColors,
    internalRecentColors,
    sizeConfig,
    handleSwatchPress,
    disabled,
    loading,
    readOnly,
  ]);
  
  // Render color preview
  const renderColorPreview = useCallback(() => {
    if (!showPreview) return null;
    
    const previewStyles = [
      styles.colorPreview,
      {
        width: sizeConfig.swatchSize * 2,
        height: sizeConfig.swatchSize * 2,
        backgroundColor: currentValue,
      },
    ];
    
    // Use custom render function if provided
    if (renderPreview) {
      return renderPreview({
        color: currentValue,
        colorValue: currentColorValue,
        style: StyleSheet.flatten(previewStyles),
      });
    }
    
    return (
      <View style={previewStyles}>
        <Text style={[styles.previewText, { fontSize: sizeConfig.fontSize }]}>
          {currentValue}
        </Text>
      </View>
    );
  }, [
    showPreview,
    sizeConfig,
    currentValue,
    renderPreview,
    currentColorValue,
  ]);
  
  // Render color values
  const renderColorValues = useCallback(() => {
    if (!showValues) return null;
    
    return (
      <View style={styles.valuesContainer}>
        <Text style={[styles.valueText, { fontSize: sizeConfig.fontSize }]}>
          HEX: {currentColorValue.hex}
        </Text>
        <Text style={[styles.valueText, { fontSize: sizeConfig.fontSize }]}>
          RGB: {currentColorValue.rgb.r}, {currentColorValue.rgb.g}, {currentColorValue.rgb.b}
        </Text>
        <Text style={[styles.valueText, { fontSize: sizeConfig.fontSize }]}>
          HSL: {Math.round(currentColorValue.hsl.h)}°, {Math.round(currentColorValue.hsl.s)}%, {Math.round(currentColorValue.hsl.l)}%
        </Text>
      </View>
    );
  }, [showValues, sizeConfig, currentColorValue]);
  
  return (
    <View
      style={[
        styles.container,
        {
          padding: sizeConfig.padding,
          opacity: disabled ? 0.5 : 1,
        },
        containerStyle,
      ]}
      testID={testID}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="adjustable"
    >
      {/* Color picker */}
      {renderColorPicker()}
      
      {/* Hue slider */}
      <View style={[styles.sliderContainer, { marginTop: sizeConfig.spacing }]}>
        <Text style={[styles.sliderLabel, { fontSize: sizeConfig.fontSize }]}>
          Hue
        </Text>
        {renderHueSlider()}
      </View>
      
      {/* Opacity slider */}
      {showOpacity && (
        <View style={[styles.sliderContainer, { marginTop: sizeConfig.spacing }]}>
          <Text style={[styles.sliderLabel, { fontSize: sizeConfig.fontSize }]}>
            Opacity
          </Text>
          {renderOpacitySlider()}
        </View>
      )}
      
      {/* Color preview */}
      {showPreview && (
        <View style={[styles.previewContainer, { marginTop: sizeConfig.spacing }]}>
          {renderColorPreview()}
        </View>
      )}
      
      {/* Color values */}
      {renderColorValues()}
      
      {/* Color swatches */}
      {renderColorSwatches()}
      
      {/* Recent colors */}
      {renderRecentColors()}
      
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingIndicator} />
        </View>
      )}
    </View>
  );
};

/**
 * Color picker component styles
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  
  colorPicker: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  
  saturationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    opacity: 0.7,
  },
  
  brightnessOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    opacity: 0.5,
  },
  
  colorIndicator: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  
  sliderContainer: {
    alignItems: 'center',
  },
  
  sliderLabel: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 8,
  },
  
  hueSlider: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  
  hueGradient: {
    flex: 1,
    backgroundColor: '#ff0000',
  },
  
  opacitySlider: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  
  opacityGradient: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  
  sliderThumb: {
    position: 'absolute',
    top: -2,
    width: 12,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  
  previewContainer: {
    alignItems: 'center',
  },
  
  colorPreview: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  previewText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  valuesContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  
  valueText: {
    color: '#B8B8C0',
    fontWeight: '400',
    marginBottom: 4,
  },
  
  swatchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
    maxWidth: 320,
  },
  
  colorSwatch: {
    margin: 4,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  
  recentColorsContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  
  sectionLabel: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 8,
  },
  
  recentColorsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  
  recentColorSwatch: {
    margin: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
  },
  
  loadingIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2E86DE',
    opacity: 0.7,
  },
});

export default ColorPicker;
