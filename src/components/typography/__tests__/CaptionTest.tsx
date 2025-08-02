import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Text,
} from 'react-native';
import Caption, { CaptionRef, CaptionSize, CaptionWeight, CaptionAlign, CaptionColor, CaptionAnimation, CaptionVariant } from '../Caption';

/**
 * Corp Astro Caption Component Test
 * 
 * This component provides comprehensive testing for the Caption component,
 * demonstrating all features, variants, and interactions.
 */
const CaptionTest: React.FC = () => {
  const [variant, setVariant] = useState<CaptionVariant>('default');
  const [size, setSize] = useState<CaptionSize>('medium');
  const [weight, setWeight] = useState<CaptionWeight>('regular');
  const [align, setAlign] = useState<CaptionAlign>('left');
  const [color, setColor] = useState<CaptionColor>('muted');
  const [animation, setAnimation] = useState<CaptionAnimation>('none');
  const [animated, setAnimated] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [enableGlow, setEnableGlow] = useState(false);
  const [truncate, setTruncate] = useState(false);
  const [muted, setMuted] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  
  const captionRef = useRef<CaptionRef>(null);

  const variants: CaptionVariant[] = ['default', 'subtitle', 'label', 'helper', 'timestamp', 'metadata'];
  const sizes: CaptionSize[] = ['small', 'medium', 'large'];
  const weights: CaptionWeight[] = ['light', 'regular', 'medium', 'semibold', 'bold'];
  const alignments: CaptionAlign[] = ['left', 'center', 'right', 'justify'];
  const colors: CaptionColor[] = ['primary', 'secondary', 'accent', 'muted', 'inverse', 'error', 'warning', 'success'];
  const animations: CaptionAnimation[] = ['none', 'fade', 'slide', 'scale', 'glow', 'shimmer'];

  const handleAnimate = () => {
    captionRef.current?.animate(1, 500);
  };

  const handleMeasure = async () => {
    try {
      const measurements = await captionRef.current?.measure();
      console.log('Caption measurements:', measurements);
    } catch (error) {
      console.error('Error measuring caption:', error);
    }
  };

  const longText = 'This is a very long caption text that should be truncated when the truncate prop is enabled to test the text overflow behavior';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Corp Astro Caption Test</Text>
        <Text style={styles.subtitle}>Comprehensive testing for the Caption component</Text>
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
            <Text style={styles.controlLabel}>Muted:</Text>
            <Switch value={muted} onValueChange={setMuted} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Dimmed:</Text>
            <Switch value={dimmed} onValueChange={setDimmed} />
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
          <Caption
            ref={captionRef}
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
            muted={muted}
            dimmed={dimmed}
            testID="interactive-caption"
          >
            {truncate ? longText : 'Interactive Caption'}
          </Caption>
        </View>
      </View>

      {/* Variant Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Caption Variants</Text>
        <View style={styles.showcase}>
          {variants.map((variant) => (
            <View key={variant} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{variant}</Text>
              <Caption variant={variant} testID={`variant-${variant}`}>
                This is a {variant} caption demonstrating the typography hierarchy.
              </Caption>
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
              <Caption size={size} testID={`size-${size}`}>
                This is {size} size caption for secondary content.
              </Caption>
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
              <Caption weight={weight} testID={`weight-${weight}`}>
                This is {weight} weight caption for emphasis control.
              </Caption>
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
              <Caption color={color} testID={`color-${color}`}>
                This is {color} color caption for different semantic meanings.
              </Caption>
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
              <Caption 
                animation={animation} 
                animated={true} 
                animationLoop={true}
                testID={`animation-${animation}`}
              >
                {animation} animation caption
              </Caption>
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
              <Caption align={align} testID={`align-${align}`}>
                This caption is {align} aligned to demonstrate text alignment options.
              </Caption>
            </View>
          ))}
        </View>
      </View>

      {/* Opacity and State Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opacity and State Showcase</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Default</Text>
            <Caption testID="default-opacity">
              Default caption with standard opacity
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Muted</Text>
            <Caption muted={true} testID="muted-caption">
              Muted caption with reduced opacity
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Dimmed</Text>
            <Caption dimmed={true} testID="dimmed-caption">
              Dimmed caption with very low opacity
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Opacity</Text>
            <Caption opacity={0.3} testID="custom-opacity-caption">
              Custom opacity caption (0.3)
            </Caption>
          </View>
        </View>
      </View>

      {/* Special Effects Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Effects</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Glow Effect</Text>
            <Caption enableGlow={true} glowColor="#2E86DE" testID="glow-caption">
              Glowing caption with blue glow
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Text Shadow</Text>
            <Caption 
              textShadow={{
                color: 'rgba(46, 134, 222, 0.2)',
                offset: { width: 1, height: 1 },
                radius: 1
              }}
              testID="shadow-caption"
            >
              Caption with subtle text shadow
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Uppercase</Text>
            <Caption uppercase={true} testID="uppercase-caption">
              Uppercase caption text
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Capitalize</Text>
            <Caption capitalize={true} testID="capitalize-caption">
              capitalize caption text
            </Caption>
          </View>
        </View>
      </View>

      {/* Usage Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Usage Examples</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Image Caption</Text>
            <View style={styles.mockImage}>
              <Text style={styles.mockImageText}>Image Placeholder</Text>
            </View>
            <Caption variant="default" align="center" testID="image-caption">
              Beautiful landscape captured in the Swiss Alps
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Timestamp</Text>
            <Caption variant="timestamp" testID="timestamp-caption">
              2 minutes ago
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Helper Text</Text>
            <Caption variant="helper" color="muted" testID="helper-caption">
              Enter your email address to receive notifications
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Metadata</Text>
            <Caption variant="metadata" uppercase={true} testID="metadata-caption">
              Category: Technology
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Subtitle</Text>
            <Caption variant="subtitle" testID="subtitle-caption">
              Supporting text that provides additional context
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Label</Text>
            <Caption variant="label" uppercase={true} testID="label-caption">
              Status: Active
            </Caption>
          </View>
        </View>
      </View>

      {/* Custom Styling Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Color</Text>
            <Caption customColor="#FF6B6B" testID="custom-color-caption">
              Custom color caption
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Size</Text>
            <Caption customSize={16} testID="custom-size-caption">
              Custom size caption
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Line Height</Text>
            <Caption customLineHeight={24} testID="custom-line-height-caption">
              Custom line height caption with more spacing between lines
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Style</Text>
            <Caption 
              style={{ 
                fontStyle: 'italic',
                textDecorationLine: 'underline',
                textDecorationColor: '#2E86DE'
              }}
              testID="custom-style-caption"
            >
              Custom style caption
            </Caption>
          </View>
        </View>
      </View>

      {/* Truncation Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Truncation Examples</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Normal Text</Text>
            <Caption testID="normal-text-caption">
              This is a normal caption that will wrap to multiple lines if needed.
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Truncated</Text>
            <Caption truncate={true} testID="truncated-caption">
              {longText}
            </Caption>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Two Lines</Text>
            <Caption numberOfLines={2} testID="two-lines-caption">
              {longText}
            </Caption>
          </View>
        </View>
      </View>

      {/* Performance Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Test</Text>
        <View style={styles.performanceTest}>
          {Array.from({ length: 30 }, (_, index) => (
            <Caption 
              key={index} 
              variant={variants[index % variants.length]}
              animation="fade"
              animated={true}
              testID={`performance-${index}`}
            >
              Performance caption {index + 1}
            </Caption>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Corp Astro Caption Component Test Complete
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
  mockImage: {
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  mockImageText: {
    color: '#6C757D',
    fontSize: 14,
  },
  performanceTest: {
    gap: 4,
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

export default CaptionTest;
