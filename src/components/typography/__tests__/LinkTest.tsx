/**
 * Corp Astro UI Library - Link Component Test
 * 
 * Comprehensive test component for the Link typography primitive.
 * Tests all variants, sizes, colors, animations, and interactive states.
 * 
 * @module LinkTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Link, { LinkRef } from '../Link';

/**
 * Link Test Component
 */
export const LinkTest: React.FC = () => {
  // State for interactive controls
  const [variant, setVariant] = useState<'default' | 'inline' | 'button' | 'nav' | 'external'>('default');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [weight, setWeight] = useState<'regular' | 'medium' | 'semibold'>('medium');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [color, setColor] = useState<'primary' | 'secondary' | 'accent' | 'muted' | 'inverse' | 'error' | 'warning' | 'success'>('primary');
  const [animation, setAnimation] = useState<'none' | 'fade' | 'slide' | 'scale' | 'glow' | 'shimmer'>('glow');
  const [decoration, setDecoration] = useState<'none' | 'underline' | 'hover' | 'always'>('hover');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [external, setExternal] = useState(false);
  const [visited, setVisited] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [enableGlow, setEnableGlow] = useState(true);
  const [truncate, setTruncate] = useState(false);
  const [animationLoop, setAnimationLoop] = useState(false);

  // Ref for imperative methods
  const linkRef = useRef<LinkRef>(null);

  // Test data
  const variants = ['default', 'inline', 'button', 'nav', 'external'] as const;
  const sizes = ['small', 'medium', 'large'] as const;
  const weights = ['regular', 'medium', 'semibold'] as const;
  const alignments = ['left', 'center', 'right'] as const;
  const colors = ['primary', 'secondary', 'accent', 'muted', 'inverse', 'error', 'warning', 'success'] as const;
  const animations = ['none', 'fade', 'slide', 'scale', 'glow', 'shimmer'] as const;
  const decorations = ['none', 'underline', 'hover', 'always'] as const;

  // Handle link press
  const handlePress = () => {
    Alert.alert('Link Pressed', 'Link navigation would occur here');
  };

  // Handle ref methods
  const handleAnimate = () => {
    linkRef.current?.animate(1, 500);
  };

  const handleMeasure = async () => {
    try {
      const measurements = await linkRef.current?.measure();
      Alert.alert('Measurements', `Width: ${measurements?.width}, Height: ${measurements?.height}`);
    } catch (error) {
      Alert.alert('Error', 'Could not measure component');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Link Component Test</Text>
          <Text style={styles.subtitle}>Interactive Typography Primitive</Text>
        </View>

        {/* Live Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Preview</Text>
          <View style={styles.previewContainer}>
            <Link
              ref={linkRef}
              variant={variant}
              size={size}
              weight={weight}
              align={align}
              color={color}
              animation={animation}
              decoration={decoration}
              disabled={disabled}
              loading={loading}
              external={external}
              visited={visited}
              uppercase={uppercase}
              enableGlow={enableGlow}
              truncate={truncate}
              animationLoop={animationLoop}
              onPress={handlePress}
            >
              Sample Link Text
            </Link>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Controls</Text>
          
          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Variant:</Text>
            <View style={styles.buttonRow}>
              {variants.map((v) => (
                <TouchableOpacity
                  key={v}
                  style={[styles.button, variant === v && styles.activeButton]}
                  onPress={() => setVariant(v)}
                >
                  <Text style={[styles.buttonText, variant === v && styles.activeButtonText]}>
                    {v}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Size:</Text>
            <View style={styles.buttonRow}>
              {sizes.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.button, size === s && styles.activeButton]}
                  onPress={() => setSize(s)}
                >
                  <Text style={[styles.buttonText, size === s && styles.activeButtonText]}>
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Weight:</Text>
            <View style={styles.buttonRow}>
              {weights.map((w) => (
                <TouchableOpacity
                  key={w}
                  style={[styles.button, weight === w && styles.activeButton]}
                  onPress={() => setWeight(w)}
                >
                  <Text style={[styles.buttonText, weight === w && styles.activeButtonText]}>
                    {w}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Alignment:</Text>
            <View style={styles.buttonRow}>
              {alignments.map((a) => (
                <TouchableOpacity
                  key={a}
                  style={[styles.button, align === a && styles.activeButton]}
                  onPress={() => setAlign(a)}
                >
                  <Text style={[styles.buttonText, align === a && styles.activeButtonText]}>
                    {a}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Color:</Text>
            <View style={styles.buttonRow}>
              {colors.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.button, color === c && styles.activeButton]}
                  onPress={() => setColor(c)}
                >
                  <Text style={[styles.buttonText, color === c && styles.activeButtonText]}>
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Animation:</Text>
            <View style={styles.buttonRow}>
              {animations.map((a) => (
                <TouchableOpacity
                  key={a}
                  style={[styles.button, animation === a && styles.activeButton]}
                  onPress={() => setAnimation(a)}
                >
                  <Text style={[styles.buttonText, animation === a && styles.activeButtonText]}>
                    {a}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Decoration:</Text>
            <View style={styles.buttonRow}>
              {decorations.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[styles.button, decoration === d && styles.activeButton]}
                  onPress={() => setDecoration(d)}
                >
                  <Text style={[styles.buttonText, decoration === d && styles.activeButtonText]}>
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.toggleGroup}>
            <View style={styles.toggleRow}>
              <Text style={styles.controlLabel}>Disabled:</Text>
              <Switch value={disabled} onValueChange={setDisabled} />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.controlLabel}>Loading:</Text>
              <Switch value={loading} onValueChange={setLoading} />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.controlLabel}>External:</Text>
              <Switch value={external} onValueChange={setExternal} />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.controlLabel}>Visited:</Text>
              <Switch value={visited} onValueChange={setVisited} />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.controlLabel}>Uppercase:</Text>
              <Switch value={uppercase} onValueChange={setUppercase} />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.controlLabel}>Glow Effect:</Text>
              <Switch value={enableGlow} onValueChange={setEnableGlow} />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.controlLabel}>Truncate:</Text>
              <Switch value={truncate} onValueChange={setTruncate} />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.controlLabel}>Animation Loop:</Text>
              <Switch value={animationLoop} onValueChange={setAnimationLoop} />
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleAnimate}>
              <Text style={styles.actionButtonText}>Animate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleMeasure}>
              <Text style={styles.actionButtonText}>Measure</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Variant Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Variant Showcase</Text>
          <View style={styles.showcase}>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Default</Text>
              <Link variant="default" onPress={handlePress}>Default Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Inline</Text>
              <Link variant="inline" onPress={handlePress}>Inline Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Button</Text>
              <Link variant="button" onPress={handlePress}>Button Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Navigation</Text>
              <Link variant="nav" onPress={handlePress}>Nav Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>External</Text>
              <Link variant="external" external onPress={handlePress}>External Link</Link>
            </View>
          </View>
        </View>

        {/* Size Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size Showcase</Text>
          <View style={styles.showcase}>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Small</Text>
              <Link size="small" onPress={handlePress}>Small Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Medium</Text>
              <Link size="medium" onPress={handlePress}>Medium Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Large</Text>
              <Link size="large" onPress={handlePress}>Large Link</Link>
            </View>
          </View>
        </View>

        {/* Weight Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weight Showcase</Text>
          <View style={styles.showcase}>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Regular</Text>
              <Link weight="regular" onPress={handlePress}>Regular Weight</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Medium</Text>
              <Link weight="medium" onPress={handlePress}>Medium Weight</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Semibold</Text>
              <Link weight="semibold" onPress={handlePress}>Semibold Weight</Link>
            </View>
          </View>
        </View>

        {/* Color Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color Showcase</Text>
          <View style={styles.showcase}>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Primary</Text>
              <Link color="primary" onPress={handlePress}>Primary Color</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Secondary</Text>
              <Link color="secondary" onPress={handlePress}>Secondary Color</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Accent</Text>
              <Link color="accent" onPress={handlePress}>Accent Color</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Muted</Text>
              <Link color="muted" onPress={handlePress}>Muted Color</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Error</Text>
              <Link color="error" onPress={handlePress}>Error Color</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Warning</Text>
              <Link color="warning" onPress={handlePress}>Warning Color</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Success</Text>
              <Link color="success" onPress={handlePress}>Success Color</Link>
            </View>
          </View>
        </View>

        {/* Animation Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Animation Showcase</Text>
          <View style={styles.showcase}>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>None</Text>
              <Link animation="none" onPress={handlePress}>No Animation</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Fade</Text>
              <Link animation="fade" animationLoop onPress={handlePress}>Fade Animation</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Scale</Text>
              <Link animation="scale" animationLoop onPress={handlePress}>Scale Animation</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Glow</Text>
              <Link animation="glow" onPress={handlePress}>Glow Animation</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Shimmer</Text>
              <Link animation="shimmer" animationLoop onPress={handlePress}>Shimmer Animation</Link>
            </View>
          </View>
        </View>

        {/* Decoration Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Decoration Showcase</Text>
          <View style={styles.showcase}>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>None</Text>
              <Link decoration="none" onPress={handlePress}>No Decoration</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Underline</Text>
              <Link decoration="underline" onPress={handlePress}>Underline Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Hover</Text>
              <Link decoration="hover" onPress={handlePress}>Hover Underline</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Always</Text>
              <Link decoration="always" onPress={handlePress}>Always Underline</Link>
            </View>
          </View>
        </View>

        {/* States Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>States Showcase</Text>
          <View style={styles.showcase}>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Normal</Text>
              <Link onPress={handlePress}>Normal Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Disabled</Text>
              <Link disabled onPress={handlePress}>Disabled Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Loading</Text>
              <Link loading onPress={handlePress}>Loading Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Visited</Text>
              <Link visited onPress={handlePress}>Visited Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>External</Text>
              <Link external onPress={handlePress}>External Link</Link>
            </View>
          </View>
        </View>

        {/* Alignment Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alignment Showcase</Text>
          <View style={styles.alignmentShowcase}>
            <Link align="left" onPress={handlePress}>Left Aligned Link</Link>
            <Link align="center" onPress={handlePress}>Center Aligned Link</Link>
            <Link align="right" onPress={handlePress}>Right Aligned Link</Link>
          </View>
        </View>

        {/* Special Effects Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Effects</Text>
          <View style={styles.showcase}>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Custom Glow</Text>
              <Link enableGlow glowColor="#FF6B6B" glowIntensity={1} onPress={handlePress}>
                Custom Glow
              </Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Text Shadow</Text>
              <Link 
                textShadow={{ color: '#2E86DE', offset: { width: 2, height: 2 }, radius: 4 }}
                onPress={handlePress}
              >
                Text Shadow
              </Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Uppercase</Text>
              <Link uppercase onPress={handlePress}>Uppercase Link</Link>
            </View>
            <View style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>Truncated</Text>
              <Link truncate numberOfLines={1} onPress={handlePress}>
                This is a very long link text that will be truncated
              </Link>
            </View>
          </View>
        </View>

        {/* Navigation Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Navigation Examples</Text>
          <View style={styles.navigationExample}>
            <Text style={styles.navigationText}>
              Visit our{' '}
              <Link variant="inline" decoration="underline" onPress={handlePress}>
                homepage
              </Link>
              {' '}for more information, or check out our{' '}
              <Link variant="inline" external onPress={handlePress}>
                documentation
              </Link>
              {' '}and{' '}
              <Link variant="inline" color="accent" onPress={handlePress}>
                API reference
              </Link>
              .
            </Text>
          </View>
        </View>

        {/* Performance Test */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Test</Text>
          <View style={styles.performanceTest}>
            {Array.from({ length: 20 }, (_, i) => (
              <Link
                key={i}
                variant="inline"
                animation="glow"
                onPress={handlePress}
                style={styles.performanceLink}
              >
                {`Link ${i + 1}`}
              </Link>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08080F',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#B8B8C0',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  previewContainer: {
    backgroundColor: 'rgba(22,33,62,0.2)',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)',
  },
  controlGroup: {
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 14,
    color: '#B8B8C0',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(46,134,222,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.3)',
  },
  activeButton: {
    backgroundColor: 'rgba(46,134,222,0.3)',
    borderColor: 'rgba(46,134,222,0.5)',
  },
  buttonText: {
    fontSize: 12,
    color: '#54A0FF',
    textAlign: 'center',
  },
  activeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  toggleGroup: {
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(46,134,222,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.4)',
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#54A0FF',
    fontWeight: '600',
  },
  showcase: {
    gap: 16,
  },
  showcaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  showcaseLabel: {
    fontSize: 14,
    color: '#B8B8C0',
    width: 100,
  },
  alignmentShowcase: {
    gap: 16,
  },
  navigationExample: {
    backgroundColor: 'rgba(22,33,62,0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)',
  },
  navigationText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  performanceTest: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    backgroundColor: 'rgba(22,33,62,0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)',
  },
  performanceLink: {
    marginRight: 8,
  },
  bottomSpacing: {
    height: 32,
  },
});

/**
 * Default export
 */
export default LinkTest;
