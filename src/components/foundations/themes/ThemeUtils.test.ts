/**
 * ThemeUtils.ts Functionality Test
 * Quick validation of core theme utility functions
 */

import { themeUtils } from './ThemeUtils.js';

// Test color conversion functions
console.log('=== Color Conversion Tests ===');
const testColor = '#2E86DE';
console.log('Original color:', testColor);

const rgb = themeUtils.hexToRgb(testColor);
console.log('RGB:', rgb);

const hsl = themeUtils.hexToHsl(testColor);
console.log('HSL:', hsl);

// Test alpha blending
console.log('\n=== Alpha Blending Tests ===');
const alphaColor = themeUtils.withAlpha(testColor, 0.5);
console.log('With 50% alpha:', alphaColor);

const blended = themeUtils.blendColors('#000000', testColor, 0.3);
console.log('Blended with black:', blended);

// Test contrast calculation
console.log('\n=== Contrast Tests ===');
const contrastRatio = themeUtils.getContrastRatio('#FFFFFF', testColor);
console.log('Contrast ratio (white on blue):', contrastRatio);

const meetsAA = themeUtils.meetsContrastRequirement('#FFFFFF', testColor, 'AA');
console.log('Meets WCAG AA:', meetsAA);

// Test color adjustments
console.log('\n=== Color Adjustment Tests ===');
const lighter = themeUtils.lighten(testColor, 20);
console.log('Lightened by 20%:', lighter);

const darker = themeUtils.darken(testColor, 20);
console.log('Darkened by 20%:', darker);

const complementary = themeUtils.getComplementary(testColor);
console.log('Complementary color:', complementary);

// Test validation functions
console.log('\n=== Validation Tests ===');
console.log('Is valid hex (#2E86DE):', themeUtils.isValidHexColor('#2E86DE'));
console.log('Is valid hex (invalid):', themeUtils.isValidHexColor('#GGGGGG'));
console.log('Is valid alpha (0.5):', themeUtils.isValidAlpha(0.5));
console.log('Is valid alpha (invalid):', themeUtils.isValidAlpha(2));

console.log('\n=== All Tests Completed ===');
