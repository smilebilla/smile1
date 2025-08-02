import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Text,
} from 'react-native';
import Heading, { HeadingRef, HeadingLevel, HeadingSize, HeadingWeight, HeadingAlign, HeadingColor, HeadingAnimation } from '../Heading';

/**
 * Corp Astro Heading Component Test
 * 
 * This component provides comprehensive testing for the Heading component,
 * demonstrating all features, variants, and interactions.
 */
const HeadingTest: React.FC = () => {
  const [level, setLevel] = useState<HeadingLevel>('h1');
  const [size, setSize] = useState<HeadingSize>('medium');
  const [weight, setWeight] = useState<HeadingWeight>('regular');
  const [align, setAlign] = useState<HeadingAlign>('left');
  const [color, setColor] = useState<HeadingColor>('primary');
  const [animation, setAnimation] = useState<HeadingAnimation>('none');
  const [animated, setAnimated] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [enableGlow, setEnableGlow] = useState(false);
  const [truncate, setTruncate] = useState(false);
  
  const headingRef = useRef<HeadingRef>(null);

  const levels: HeadingLevel[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const sizes: HeadingSize[] = ['small', 'medium', 'large', 'xlarge'];
  const weights: HeadingWeight[] = ['light', 'regular', 'medium', 'semibold', 'bold'];
  const alignments: HeadingAlign[] = ['left', 'center', 'right', 'justify'];
  const colors: HeadingColor[] = ['primary', 'secondary', 'accent', 'muted', 'inverse', 'error', 'warning', 'success'];
  const animations: HeadingAnimation[] = ['none', 'fade', 'slide', 'scale', 'glow', 'shimmer'];

  const handleAnimate = () => {
    headingRef.current?.animate(1, 500);
  };

  const handleMeasure = async () => {
    try {
      const measurements = await headingRef.current?.measure();
      console.log('Heading measurements:', measurements);
    } catch (error) {
      console.error('Error measuring heading:', error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Corp Astro Heading Test</Text>
        <Text style={styles.subtitle}>Comprehensive testing for the Heading component</Text>
      </View>

      {/* Interactive Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Controls</Text>
        
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Level:</Text>
          <View style={styles.buttonRow}>
            {levels.map((l) => (
              <TouchableOpacity
                key={l}
                style={[styles.button, level === l && styles.activeButton]}
                onPress={() => setLevel(l)}
              >
                <Text style={[styles.buttonText, level === l && styles.activeButtonText]}>
                  {l.toUpperCase()}
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
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Animated:</Text>
            <Switch value={animated} onValueChange={setAnimated} />
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

      {/* Live Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Preview</Text>
        <View style={styles.previewContainer}>
          <Heading
            ref={headingRef}
            level={level}
            size={size}
            weight={weight}
            align={align}
            color={color}
            animation={animation}
            animated={animated}
            uppercase={uppercase}
            enableGlow={enableGlow}
            truncate={truncate}
            testID="interactive-heading"
          >
            {truncate ? 'This is a very long heading that should be truncated when the truncate prop is enabled' : 'Interactive Heading'}
          </Heading>
        </View>
      </View>

      {/* Heading Levels Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Heading Levels (H1-H6)</Text>
        <View style={styles.showcase}>
          {levels.map((level) => (
            <View key={level} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{level.toUpperCase()}</Text>
              <Heading level={level} testID={`level-${level}`}>
                {level.toUpperCase()} - Corp Astro Heading
              </Heading>
            </View>
          ))}
        </View>
      </View>

      {/* Size Variants Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        <View style={styles.showcase}>
          {sizes.map((size) => (
            <View key={size} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{size}</Text>
              <Heading size={size} testID={`size-${size}`}>
                {size} Size Heading
              </Heading>
            </View>
          ))}
        </View>
      </View>

      {/* Weight Variants Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weight Variants</Text>
        <View style={styles.showcase}>
          {weights.map((weight) => (
            <View key={weight} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{weight}</Text>
              <Heading weight={weight} testID={`weight-${weight}`}>
                {weight} Weight Heading
              </Heading>
            </View>
          ))}
        </View>
      </View>

      {/* Color Variants Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Variants</Text>
        <View style={styles.showcase}>
          {colors.map((color) => (
            <View key={color} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{color}</Text>
              <Heading color={color} testID={`color-${color}`}>
                {color} Color Heading
              </Heading>
            </View>
          ))}
        </View>
      </View>

      {/* Animation Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation Showcase</Text>
        <View style={styles.showcase}>
          {animations.filter(a => a !== 'none').map((animation) => (
            <View key={animation} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{animation}</Text>
              <Heading 
                animation={animation} 
                animated={true} 
                animationLoop={true}
                testID={`animation-${animation}`}
              >
                {animation} Animation
              </Heading>
            </View>
          ))}
        </View>
      </View>

      {/* Alignment Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alignment Showcase</Text>
        <View style={styles.showcase}>
          {alignments.map((align) => (
            <View key={align} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{align}</Text>
              <Heading align={align} testID={`align-${align}`}>
                {align} Aligned Heading
              </Heading>
            </View>
          ))}
        </View>
      </View>

      {/* Special Effects Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Effects</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Glow Effect</Text>
            <Heading enableGlow={true} glowColor="#2E86DE" testID="glow-heading">
              Glowing Heading
            </Heading>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Text Shadow</Text>
            <Heading 
              textShadow={{
                color: 'rgba(46, 134, 222, 0.5)',
                offset: { width: 2, height: 2 },
                radius: 4
              }}
              testID="shadow-heading"
            >
              Shadow Heading
            </Heading>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Uppercase</Text>
            <Heading uppercase={true} testID="uppercase-heading">
              Uppercase Heading
            </Heading>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Capitalize</Text>
            <Heading capitalize={true} testID="capitalize-heading">
              capitalize heading
            </Heading>
          </View>
        </View>
      </View>

      {/* Custom Styling Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Color</Text>
            <Heading customColor="#FF6B6B" testID="custom-color-heading">
              Custom Color Heading
            </Heading>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Size</Text>
            <Heading customSize={36} testID="custom-size-heading">
              Custom Size Heading
            </Heading>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Style</Text>
            <Heading 
              style={{ 
                fontStyle: 'italic',
                textDecorationLine: 'underline',
                textDecorationColor: '#2E86DE'
              }}
              testID="custom-style-heading"
            >
              Custom Style Heading
            </Heading>
          </View>
        </View>
      </View>

      {/* Performance Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Test</Text>
        <View style={styles.performanceTest}>
          {Array.from({ length: 10 }, (_, index) => (
            <Heading 
              key={index} 
              level={levels[index % levels.length]}
              animation="fade"
              animated={true}
              testID={`performance-${index}`}
            >
              Performance Test {index + 1}
            </Heading>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Corp Astro Heading Component Test Complete
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08080F',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#B8B8C0',
    textAlign: 'center',
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
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
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeButton: {
    backgroundColor: '#2E86DE',
    borderColor: '#2E86DE',
  },
  buttonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2E86DE',
    marginTop: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  previewContainer: {
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  showcase: {
    gap: 16,
  },
  showcaseItem: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  showcaseLabel: {
    fontSize: 12,
    color: '#B8B8C0',
    marginBottom: 8,
    fontWeight: '500',
  },
  performanceTest: {
    gap: 8,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
  },
});

export default HeadingTest;
