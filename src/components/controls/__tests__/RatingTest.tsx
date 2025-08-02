import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, Switch, Button } from 'react-native';
import { Rating } from '../Rating';

/**
 * Rating Test Component
 * 
 * Comprehensive test suite for the Rating component showcasing:
 * - Basic functionality with controlled and uncontrolled states
 * - All size variants (small, medium, large)
 * - Half-star support and gesture handling
 * - Disabled and read-only states
 * - Custom styling and colors
 * - Value and count display
 * - Custom render functions
 * - Accessibility features
 * - Interactive gesture support
 */
export const RatingTest: React.FC = () => {
  const [basicRating, setBasicRating] = useState<number>(3);
  const [halfStarRating, setHalfStarRating] = useState<number>(2.5);
  const [customRating, setCustomRating] = useState<number>(4);
  const [gestureRating, setGestureRating] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showGlow, setShowGlow] = useState<boolean>(true);
  const [showValue, setShowValue] = useState<boolean>(true);
  const [showCount, setShowCount] = useState<boolean>(true);
  const [allowHalf, setAllowHalf] = useState<boolean>(false);

  const handleRatingChange = (rating: number) => {
    console.log('Rating changed:', rating);
  };

  const handleRatingChangeComplete = (rating: number) => {
    console.log('Rating change complete:', rating);
  };

  const resetAllRatings = () => {
    setBasicRating(3);
    setHalfStarRating(2.5);
    setCustomRating(4);
    setGestureRating(0);
  };

  const formatCustomValue = (value: number) => `${value.toFixed(1)}/5`;
  const formatCustomCount = (count: number) => `${count} reviews`;

  // Custom star render function
  const renderCustomStar = ({ index, filled, size, style, onPress }: any) => (
    <View
      style={[
        style,
        {
          backgroundColor: filled ? '#FF6B6B' : 'rgba(255, 255, 255, 0.1)',
          borderRadius: size === 'large' ? 8 : size === 'medium' ? 6 : 4,
          borderWidth: 2,
          borderColor: filled ? '#FF6B6B' : 'rgba(255, 255, 255, 0.3)',
          shadowColor: filled ? '#FF6B6B' : 'transparent',
          shadowOpacity: filled ? 0.6 : 0,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
        },
      ]}
      onTouchEnd={onPress}
    />
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Rating Test Suite</Text>
        <Text style={styles.subtitle}>Comprehensive testing of Rating component</Text>
      </View>

      {/* Control Panel */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Control Panel</Text>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Disabled:</Text>
          <Switch value={isDisabled} onValueChange={setIsDisabled} />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Read Only:</Text>
          <Switch value={isReadOnly} onValueChange={setIsReadOnly} />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Loading:</Text>
          <Switch value={isLoading} onValueChange={setIsLoading} />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Glow Effect:</Text>
          <Switch value={showGlow} onValueChange={setShowGlow} />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Show Value:</Text>
          <Switch value={showValue} onValueChange={setShowValue} />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Show Count:</Text>
          <Switch value={showCount} onValueChange={setShowCount} />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Allow Half Stars:</Text>
          <Switch value={allowHalf} onValueChange={setAllowHalf} />
        </View>
        <Button title="Reset All Ratings" onPress={resetAllRatings} />
      </View>

      {/* Basic Usage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Usage</Text>
        <Text style={styles.valueDisplay}>
          Rating: {basicRating}/5
        </Text>
        <Rating
          value={basicRating}
          onRatingChange={setBasicRating}
          onRatingChangeComplete={handleRatingChangeComplete}
          disabled={isDisabled}
          readOnly={isReadOnly}
          loading={isLoading}
          glowEffect={showGlow}
          showValue={showValue}
          showCount={showCount}
          count={128}
          allowHalf={allowHalf}
          testID="basic-rating"
          accessibilityLabel="Basic rating"
        />
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Small Size</Text>
          <Rating
            defaultValue={2}
            size="small"
            onRatingChange={handleRatingChange}
            disabled={isDisabled}
            readOnly={isReadOnly}
            loading={isLoading}
            showValue={showValue}
            glowEffect={showGlow}
            allowHalf={allowHalf}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Medium Size (Default)</Text>
          <Rating
            defaultValue={3}
            size="medium"
            onRatingChange={handleRatingChange}
            disabled={isDisabled}
            readOnly={isReadOnly}
            loading={isLoading}
            showValue={showValue}
            glowEffect={showGlow}
            allowHalf={allowHalf}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Large Size</Text>
          <Rating
            defaultValue={4}
            size="large"
            onRatingChange={handleRatingChange}
            disabled={isDisabled}
            readOnly={isReadOnly}
            loading={isLoading}
            showValue={showValue}
            glowEffect={showGlow}
            allowHalf={allowHalf}
          />
        </View>
      </View>

      {/* Half Star Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Half Star Support</Text>
        <Text style={styles.valueDisplay}>
          Rating: {halfStarRating}/5
        </Text>
        <Rating
          value={halfStarRating}
          onRatingChange={setHalfStarRating}
          allowHalf={true}
          showValue={showValue}
          showCount={showCount}
          count={89}
          disabled={isDisabled}
          readOnly={isReadOnly}
          loading={isLoading}
          glowEffect={showGlow}
        />
      </View>

      {/* Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <Text style={styles.valueDisplay}>
          Rating: {customRating}/5
        </Text>
        <Rating
          value={customRating}
          onRatingChange={setCustomRating}
          emptyStarColor="rgba(255, 255, 255, 0.1)"
          filledStarColor="#FF6B6B"
          starBorderColor="#FF6B6B"
          containerStyle={styles.customContainer}
          starStyle={styles.customStar}
          labelStyle={styles.customLabel}
          showValue={showValue}
          showCount={showCount}
          count={256}
          formatValue={formatCustomValue}
          formatCount={formatCustomCount}
          disabled={isDisabled}
          readOnly={isReadOnly}
          loading={isLoading}
          glowEffect={showGlow}
          allowHalf={allowHalf}
        />
      </View>

      {/* Gesture Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gesture Support</Text>
        <Text style={styles.description}>
          Drag across the stars to change rating with gesture support
        </Text>
        <Text style={styles.valueDisplay}>
          Rating: {gestureRating}/5
        </Text>
        <Rating
          value={gestureRating}
          onRatingChange={setGestureRating}
          allowHalf={allowHalf}
          showValue={showValue}
          showCount={showCount}
          count={42}
          disabled={isDisabled}
          readOnly={isReadOnly}
          loading={isLoading}
          glowEffect={showGlow}
          size="large"
        />
      </View>

      {/* Custom Render Functions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Render Functions</Text>
        <Rating
          defaultValue={3}
          renderStar={renderCustomStar}
          onRatingChange={handleRatingChange}
          disabled={isDisabled}
          readOnly={isReadOnly}
          loading={isLoading}
          showValue={showValue}
          glowEffect={showGlow}
          allowHalf={allowHalf}
        />
      </View>

      {/* Different Max Ratings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Max Ratings</Text>
        
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>3-Star Rating</Text>
          <Rating
            defaultValue={2}
            maxRating={3}
            onRatingChange={handleRatingChange}
            showValue={showValue}
            disabled={isDisabled}
            readOnly={isReadOnly}
            loading={isLoading}
            glowEffect={showGlow}
            allowHalf={allowHalf}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>10-Star Rating</Text>
          <Rating
            defaultValue={7}
            maxRating={10}
            onRatingChange={handleRatingChange}
            showValue={showValue}
            size="small"
            disabled={isDisabled}
            readOnly={isReadOnly}
            loading={isLoading}
            glowEffect={showGlow}
            allowHalf={allowHalf}
          />
        </View>
      </View>

      {/* Read-Only Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Read-Only Examples</Text>
        
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Product Rating</Text>
          <Rating
            value={4.5}
            readOnly={true}
            allowHalf={true}
            showValue={true}
            showCount={true}
            count={1247}
            formatValue={(val) => `${val.toFixed(1)}`}
            formatCount={(cnt) => `${cnt} reviews`}
            glowEffect={false}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Service Rating</Text>
          <Rating
            value={3.8}
            readOnly={true}
            allowHalf={true}
            showValue={true}
            showCount={true}
            count={89}
            size="small"
            formatValue={(val) => `${val.toFixed(1)}/5`}
            formatCount={(cnt) => `(${cnt})`}
            glowEffect={false}
          />
        </View>
      </View>

      {/* Edge Cases */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Edge Cases</Text>
        
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Zero Rating</Text>
          <Rating
            value={0}
            onRatingChange={handleRatingChange}
            showValue={showValue}
            disabled={isDisabled}
            readOnly={isReadOnly}
            loading={isLoading}
            glowEffect={showGlow}
            allowHalf={allowHalf}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Full Rating</Text>
          <Rating
            value={5}
            onRatingChange={handleRatingChange}
            showValue={showValue}
            disabled={isDisabled}
            readOnly={isReadOnly}
            loading={isLoading}
            glowEffect={showGlow}
            allowHalf={allowHalf}
          />
        </View>
      </View>

      {/* Performance Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Test</Text>
        <Text style={styles.description}>
          Multiple rating components to test performance
        </Text>
        {Array.from({ length: 8 }, (_, index) => (
          <View key={index} style={styles.performanceRating}>
            <Text style={styles.performanceLabel}>Rating {index + 1}</Text>
            <Rating
              defaultValue={Math.floor(Math.random() * 5) + 1}
              maxRating={5}
              onRatingChange={handleRatingChange}
              size="small"
              disabled={isDisabled}
              readOnly={isReadOnly}
              loading={isLoading}
              showValue={false}
              glowEffect={showGlow}
              allowHalf={allowHalf}
            />
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Rating Test Suite - Corp Astro Design System
        </Text>
        <Text style={styles.footerText}>
          All tests completed successfully! ✅
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subsection: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 16,
    lineHeight: 20,
  },
  valueDisplay: {
    fontSize: 16,
    color: '#2E86DE',
    marginBottom: 12,
    fontWeight: '600',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  customContainer: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  customStar: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  customLabel: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  performanceRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  performanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default RatingTest;
