import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Text,
} from 'react-native';
import BodyText, { BodyTextRef, BodyTextSize, BodyTextWeight, BodyTextAlign, BodyTextColor, BodyTextAnimation, BodyTextVariant } from '../BodyText';

/**
 * Corp Astro BodyText Component Test
 * 
 * This component provides comprehensive testing for the BodyText component,
 * demonstrating all features, variants, and interactions.
 */
const BodyTextTest: React.FC = () => {
  const [variant, setVariant] = useState<BodyTextVariant>('body1');
  const [size, setSize] = useState<BodyTextSize>('medium');
  const [weight, setWeight] = useState<BodyTextWeight>('regular');
  const [align, setAlign] = useState<BodyTextAlign>('left');
  const [color, setColor] = useState<BodyTextColor>('primary');
  const [animation, setAnimation] = useState<BodyTextAnimation>('none');
  const [animated, setAnimated] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [enableGlow, setEnableGlow] = useState(false);
  const [truncate, setTruncate] = useState(false);
  const [dropCap, setDropCap] = useState(false);
  const [justified, setJustified] = useState(false);
  
  const bodyTextRef = useRef<BodyTextRef>(null);

  const variants: BodyTextVariant[] = ['body1', 'body2', 'paragraph', 'caption', 'overline'];
  const sizes: BodyTextSize[] = ['small', 'medium', 'large', 'xlarge'];
  const weights: BodyTextWeight[] = ['light', 'regular', 'medium', 'semibold', 'bold'];
  const alignments: BodyTextAlign[] = ['left', 'center', 'right', 'justify'];
  const colors: BodyTextColor[] = ['primary', 'secondary', 'accent', 'muted', 'inverse', 'error', 'warning', 'success'];
  const animations: BodyTextAnimation[] = ['none', 'fade', 'slide', 'scale', 'glow', 'shimmer'];

  const handleAnimate = () => {
    bodyTextRef.current?.animate(1, 500);
  };

  const handleMeasure = async () => {
    try {
      const measurements = await bodyTextRef.current?.measure();
      console.log('BodyText measurements:', measurements);
    } catch (error) {
      console.error('Error measuring body text:', error);
    }
  };

  const sampleText = "This is a sample body text that demonstrates the typography capabilities of the Corp Astro UI Library. It features Inter font, multiple variants, and comprehensive styling options.";
  const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Corp Astro BodyText Test</Text>
        <Text style={styles.subtitle}>Comprehensive testing for the BodyText component</Text>
      </View>

      {/* Interactive Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Controls</Text>
        
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
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Drop Cap:</Text>
            <Switch value={dropCap} onValueChange={setDropCap} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Justified:</Text>
            <Switch value={justified} onValueChange={setJustified} />
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
          <BodyText
            ref={bodyTextRef}
            variant={variant}
            size={size}
            weight={weight}
            align={align}
            color={color}
            animation={animation}
            animated={animated}
            uppercase={uppercase}
            enableGlow={enableGlow}
            truncate={truncate}
            dropCap={dropCap}
            justified={justified}
            testID="interactive-body-text"
          >
            {truncate ? longText : sampleText}
          </BodyText>
        </View>
      </View>

      {/* Variants Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text Variants</Text>
        <View style={styles.showcase}>
          {variants.map((variant) => (
            <View key={variant} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{variant}</Text>
              <BodyText variant={variant} testID={`variant-${variant}`}>
                This is {variant} text variant demonstrating the typography hierarchy.
              </BodyText>
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
              <BodyText size={size} testID={`size-${size}`}>
                This is {size} size body text for readable content.
              </BodyText>
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
              <BodyText weight={weight} testID={`weight-${weight}`}>
                This is {weight} weight body text for emphasis control.
              </BodyText>
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
              <BodyText color={color} testID={`color-${color}`}>
                This is {color} colored body text for semantic meaning.
              </BodyText>
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
              <BodyText 
                animation={animation} 
                animated={true} 
                animationLoop={true}
                testID={`animation-${animation}`}
              >
                This text demonstrates {animation} animation effect.
              </BodyText>
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
              <BodyText align={align} testID={`align-${align}`}>
                This text demonstrates {align} alignment for layout control and reading flow.
              </BodyText>
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
            <BodyText enableGlow={true} glowColor="#2E86DE" testID="glow-body-text">
              This text has a subtle glow effect for emphasis.
            </BodyText>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Text Shadow</Text>
            <BodyText 
              textShadow={{
                color: 'rgba(46, 134, 222, 0.3)',
                offset: { width: 1, height: 1 },
                radius: 2
              }}
              testID="shadow-body-text"
            >
              This text has a custom shadow effect for depth.
            </BodyText>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Uppercase</Text>
            <BodyText uppercase={true} testID="uppercase-body-text">
              This text is transformed to uppercase for emphasis.
            </BodyText>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Capitalize</Text>
            <BodyText capitalize={true} testID="capitalize-body-text">
              this text is capitalized for proper sentence structure.
            </BodyText>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Justified Text</Text>
            <BodyText justified={true} testID="justified-body-text">
              This is a longer paragraph of text that demonstrates justified alignment. The text is evenly distributed across the width of the container, creating clean left and right margins that improve readability in longer content blocks.
            </BodyText>
          </View>
        </View>
      </View>

      {/* Paragraph Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paragraph Showcase</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Standard Paragraph</Text>
            <BodyText variant="paragraph" testID="paragraph-standard">
              This is a standard paragraph demonstrating readable body text with proper line height and spacing. The Inter font provides excellent readability across different screen sizes and resolutions.
            </BodyText>
            <BodyText variant="paragraph" testID="paragraph-second">
              This is a second paragraph showing proper spacing between paragraphs. The typography system ensures consistent vertical rhythm throughout the content.
            </BodyText>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Paragraph with Spacing</Text>
            <BodyText variant="paragraph" paragraphSpacing={8} testID="paragraph-spacing-1">
              This paragraph has additional spacing after it.
            </BodyText>
            <BodyText variant="paragraph" paragraphSpacing={8} testID="paragraph-spacing-2">
              This paragraph also has additional spacing, creating better visual separation between content blocks.
            </BodyText>
          </View>
        </View>
      </View>

      {/* Custom Styling Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Color</Text>
            <BodyText customColor="#FF6B6B" testID="custom-color-body-text">
              This text uses a custom color for brand-specific styling.
            </BodyText>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Size</Text>
            <BodyText customSize={19} testID="custom-size-body-text">
              This text uses a custom font size for specific design needs.
            </BodyText>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Line Height</Text>
            <BodyText customLineHeight={32} testID="custom-line-height-body-text">
              This text has custom line height for improved readability in longer content that needs more breathing room between lines.
            </BodyText>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Style</Text>
            <BodyText 
              style={{ 
                fontStyle: 'italic',
                textDecorationLine: 'underline',
                textDecorationColor: '#2E86DE'
              }}
              testID="custom-style-body-text"
            >
              This text has custom styling applied through the style prop.
            </BodyText>
          </View>
        </View>
      </View>

      {/* Truncation Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Truncation and Line Control</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Truncated Text</Text>
            <BodyText truncate={true} testID="truncated-body-text">
              This is a very long text that should be truncated when the truncate prop is enabled, showing only the beginning with ellipsis.
            </BodyText>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>2-Line Limit</Text>
            <BodyText numberOfLines={2} testID="two-line-body-text">
              This is a longer paragraph that will be limited to exactly two lines of text, demonstrating the numberOfLines prop for controlled content display in constrained layouts.
            </BodyText>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>3-Line Limit</Text>
            <BodyText numberOfLines={3} testID="three-line-body-text">
              This is an even longer paragraph that will be limited to exactly three lines of text, showing how the numberOfLines prop can be used for different content length requirements while maintaining consistent layout structure.
            </BodyText>
          </View>
        </View>
      </View>

      {/* Performance Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Test</Text>
        <View style={styles.performanceTest}>
          {Array.from({ length: 15 }, (_, index) => (
            <BodyText 
              key={index} 
              variant={variants[index % variants.length]}
              animation="fade"
              animated={true}
              testID={`performance-${index}`}
            >
              Performance test paragraph {index + 1}. This demonstrates multiple body text components rendering efficiently.
            </BodyText>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Corp Astro BodyText Component Test Complete
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

export default BodyTextTest;
