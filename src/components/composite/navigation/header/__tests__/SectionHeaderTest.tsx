/**
 * Corp Astro UI Library - Section Header Component Test
 * 
 * Comprehensive test suite for the SectionHeader component demonstrating
 * all features, variants, and functionality. This test component validates
 * the proper implementation of section organization, collapsible behavior, and theming.
 * 
 * @module SectionHeaderTest
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SectionHeader } from '../SectionHeader';
import type { 
  SectionHeaderVariant, 
  SectionHeaderSize, 
  SectionHeaderAnimation,
  SectionHeaderAction,
  SectionHeaderBreadcrumb,
} from '../SectionHeader';

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * SectionHeader Test Suite
 * 
 * Comprehensive test component showcasing all SectionHeader features.
 * Demonstrates variants, animations, collapsible behavior, and interactive functionality.
 */
export const SectionHeaderTest: React.FC = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [currentVariant, setCurrentVariant] = useState<SectionHeaderVariant>('default');
  const [currentSize, setCurrentSize] = useState<SectionHeaderSize>('medium');
  const [currentAnimation, setCurrentAnimation] = useState<SectionHeaderAnimation>('fade');
  const [title, setTitle] = useState('Section Header');
  const [subtitle, setSubtitle] = useState('Organize your content');
  const [description, setDescription] = useState('This is a comprehensive section header component with multiple features and customization options.');
  const [icon, setIcon] = useState('📋');
  const [animationDuration, setAnimationDuration] = useState(300);
  const [isAnimated, setIsAnimated] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasActions, setHasActions] = useState(true);
  const [hasBreadcrumbs, setHasBreadcrumbs] = useState(true);
  const [hasDescription, setHasDescription] = useState(true);
  const [hasIcon, setHasIcon] = useState(true);

  // ============================================================================
  // CONFIGURATION DATA
  // ============================================================================

  const actions: SectionHeaderAction[] = hasActions ? [
    {
      id: 'edit',
      icon: '✏️',
      onPress: () => Alert.alert('Edit', 'Edit action pressed'),
      accessibilityLabel: 'Edit section',
      testID: 'section-edit-button',
    },
    {
      id: 'share',
      icon: '🔗',
      onPress: () => Alert.alert('Share', 'Share action pressed'),
      accessibilityLabel: 'Share section',
      testID: 'section-share-button',
    },
    {
      id: 'more',
      icon: '⋯',
      onPress: () => Alert.alert('More', 'More actions pressed'),
      accessibilityLabel: 'More actions',
      testID: 'section-more-button',
    },
  ] : [];

  const breadcrumbs: SectionHeaderBreadcrumb[] = hasBreadcrumbs ? [
    {
      id: 'home',
      text: 'Home',
      onPress: () => Alert.alert('Navigation', 'Home pressed'),
    },
    {
      id: 'components',
      text: 'Components',
      onPress: () => Alert.alert('Navigation', 'Components pressed'),
    },
    {
      id: 'headers',
      text: 'Headers',
      onPress: () => Alert.alert('Navigation', 'Headers pressed'),
    },
    {
      id: 'section',
      text: 'Section Header',
      isActive: true,
    },
  ] : [];

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleVariantChange = (variant: SectionHeaderVariant) => {
    setCurrentVariant(variant);
  };

  const handleSizeChange = (size: SectionHeaderSize) => {
    setCurrentSize(size);
  };

  const handleAnimationChange = (animation: SectionHeaderAnimation) => {
    setCurrentAnimation(animation);
  };

  const handleCollapseToggle = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    Alert.alert('Collapse', `Section ${collapsed ? 'collapsed' : 'expanded'}`);
  };

  const handleSectionPress = () => {
    Alert.alert('Section Press', 'Section header was pressed');
  };

  const handleSectionLongPress = () => {
    Alert.alert('Section Long Press', 'Section header was long pressed');
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render variant selector
   */
  const renderVariantSelector = () => {
    const variants: SectionHeaderVariant[] = ['default', 'prominent', 'minimal', 'bordered', 'floating'];
    
    return (
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorTitle}>Variant</Text>
        <View style={styles.selectorButtons}>
          {variants.map((variant) => (
            <TouchableOpacity
              key={variant}
              style={[
                styles.selectorButton,
                currentVariant === variant && styles.selectorButtonActive,
              ]}
              onPress={() => handleVariantChange(variant)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  currentVariant === variant && styles.selectorButtonTextActive,
                ]}
              >
                {variant}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  /**
   * Render size selector
   */
  const renderSizeSelector = () => {
    const sizes: SectionHeaderSize[] = ['small', 'medium', 'large', 'xlarge'];
    
    return (
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorTitle}>Size</Text>
        <View style={styles.selectorButtons}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.selectorButton,
                currentSize === size && styles.selectorButtonActive,
              ]}
              onPress={() => handleSizeChange(size)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  currentSize === size && styles.selectorButtonTextActive,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  /**
   * Render animation selector
   */
  const renderAnimationSelector = () => {
    const animations: SectionHeaderAnimation[] = ['fade', 'slide', 'scale', 'bounce', 'none'];
    
    return (
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorTitle}>Animation</Text>
        <View style={styles.selectorButtons}>
          {animations.map((animation) => (
            <TouchableOpacity
              key={animation}
              style={[
                styles.selectorButton,
                currentAnimation === animation && styles.selectorButtonActive,
              ]}
              onPress={() => handleAnimationChange(animation)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  currentAnimation === animation && styles.selectorButtonTextActive,
                ]}
              >
                {animation}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  /**
   * Render configuration controls
   */
  const renderControls = () => (
    <View style={styles.controlsContainer}>
      <Text style={styles.controlsTitle}>Configuration</Text>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Animated</Text>
        <Switch
          value={isAnimated}
          onValueChange={setIsAnimated}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={isAnimated ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Shadow</Text>
        <Switch
          value={hasShadow}
          onValueChange={setHasShadow}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={hasShadow ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Collapsible</Text>
        <Switch
          value={isCollapsible}
          onValueChange={setIsCollapsible}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={isCollapsible ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Actions</Text>
        <Switch
          value={hasActions}
          onValueChange={setHasActions}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={hasActions ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Breadcrumbs</Text>
        <Switch
          value={hasBreadcrumbs}
          onValueChange={setHasBreadcrumbs}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={hasBreadcrumbs ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Description</Text>
        <Switch
          value={hasDescription}
          onValueChange={setHasDescription}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={hasDescription ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Icon</Text>
        <Switch
          value={hasIcon}
          onValueChange={setHasIcon}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={hasIcon ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>
          Animation Duration: {animationDuration}ms
        </Text>
      </View>
    </View>
  );

  /**
   * Render usage examples
   */
  const renderUsageExamples = () => (
    <View style={styles.usageContainer}>
      <Text style={styles.usageTitle}>Usage Examples</Text>
      
      <View style={styles.usageExample}>
        <Text style={styles.usageExampleTitle}>Basic Section Header</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`<SectionHeader
  title="Content Section"
  subtitle="Organize your content"
  variant="default"
  size="medium"
/>`}
          </Text>
        </View>
      </View>
      
      <View style={styles.usageExample}>
        <Text style={styles.usageExampleTitle}>Section with Actions</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`<SectionHeader
  title="User Profile"
  subtitle="Manage your profile"
  icon="👤"
  actions={[
    {
      id: 'edit',
      icon: '✏️',
      onPress: () => editProfile(),
    },
    {
      id: 'share',
      icon: '🔗',
      onPress: () => shareProfile(),
    },
  ]}
/>`}
          </Text>
        </View>
      </View>
      
      <View style={styles.usageExample}>
        <Text style={styles.usageExampleTitle}>Collapsible Section</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`<SectionHeader
  title="Advanced Settings"
  description="Configure advanced options"
  variant="prominent"
  collapsible={true}
  collapsed={isCollapsed}
  onCollapseToggle={setIsCollapsed}
/>`}
          </Text>
        </View>
      </View>
      
      <View style={styles.usageExample}>
        <Text style={styles.usageExampleTitle}>Section with Breadcrumbs</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`<SectionHeader
  title="Product Details"
  breadcrumbs={[
    { id: 'home', text: 'Home', onPress: goHome },
    { id: 'products', text: 'Products', onPress: goProducts },
    { id: 'current', text: 'Product Details', isActive: true },
  ]}
/>`}
          </Text>
        </View>
      </View>
    </View>
  );

  /**
   * Render configuration display
   */
  const renderCurrentConfig = () => (
    <View style={styles.configContainer}>
      <Text style={styles.configTitle}>Current Configuration</Text>
      <View style={styles.configGrid}>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Variant</Text>
          <Text style={styles.configValue}>{currentVariant}</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Size</Text>
          <Text style={styles.configValue}>{currentSize}</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Animation</Text>
          <Text style={styles.configValue}>{currentAnimation}</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Collapsible</Text>
          <Text style={styles.configValue}>{isCollapsible ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Collapsed</Text>
          <Text style={styles.configValue}>{isCollapsed ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Actions</Text>
          <Text style={styles.configValue}>{actions.length}</Text>
        </View>
      </View>
    </View>
  );

  /**
   * Render example sections
   */
  const renderExampleSections = () => (
    <View style={styles.examplesContainer}>
      <Text style={styles.examplesTitle}>Example Sections</Text>
      
      <SectionHeader
        title="General Settings"
        subtitle="Application preferences"
        description="Configure general application settings and preferences"
        icon="⚙️"
        variant="default"
        size="medium"
        actions={[
          {
            id: 'reset',
            icon: '🔄',
            onPress: () => Alert.alert('Reset', 'Reset settings'),
          },
        ]}
      />
      
      <SectionHeader
        title="Security & Privacy"
        subtitle="Protect your data"
        icon="🔒"
        variant="prominent"
        size="medium"
        collapsible={true}
        actions={[
          {
            id: 'audit',
            icon: '🔍',
            onPress: () => Alert.alert('Audit', 'Security audit'),
          },
        ]}
      />
      
      <SectionHeader
        title="Quick Actions"
        variant="minimal"
        size="small"
        actions={[
          {
            id: 'add',
            icon: '➕',
            onPress: () => Alert.alert('Add', 'Add item'),
          },
          {
            id: 'filter',
            icon: '🔍',
            onPress: () => Alert.alert('Filter', 'Filter items'),
          },
        ]}
      />
      
      <SectionHeader
        title="Recent Activity"
        subtitle="Latest updates"
        variant="bordered"
        size="medium"
        breadcrumbs={[
          { id: 'dashboard', text: 'Dashboard' },
          { id: 'activity', text: 'Activity', isActive: true },
        ]}
      />
      
      <SectionHeader
        title="Floating Section"
        subtitle="Enhanced visual style"
        description="This section demonstrates the floating variant with enhanced visual styling"
        icon="🌟"
        variant="floating"
        size="large"
        shadow={true}
        actions={[
          {
            id: 'star',
            icon: '⭐',
            onPress: () => Alert.alert('Star', 'Starred section'),
          },
        ]}
      />
    </View>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader
        title="Section Header Test"
        subtitle="Interactive component testing"
        description={hasDescription ? description : undefined}
        icon={hasIcon ? icon : undefined}
        variant={currentVariant}
        size={currentSize}
        actions={actions}
        breadcrumbs={breadcrumbs}
        collapsible={isCollapsible}
        collapsed={isCollapsed}
        onCollapseToggle={handleCollapseToggle}
        shadow={hasShadow}
        animation={currentAnimation}
        animationDuration={animationDuration}
        animated={isAnimated}
        onPress={handleSectionPress}
        onLongPress={handleSectionLongPress}
        testID="section-header-test"
      />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderVariantSelector()}
        {renderSizeSelector()}
        {renderAnimationSelector()}
        {renderControls()}
        {renderCurrentConfig()}
        {renderExampleSections()}
        {renderUsageExamples()}
      </ScrollView>
    </SafeAreaView>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    padding: 20,
  },
  
  selectorContainer: {
    marginBottom: 24,
  },
  
  selectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  
  selectorButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  selectorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  
  selectorButtonActive: {
    backgroundColor: '#0066cc',
    borderColor: '#0066cc',
  },
  
  selectorButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#cccccc',
    textTransform: 'capitalize',
  },
  
  selectorButtonTextActive: {
    color: '#ffffff',
  },
  
  controlsContainer: {
    marginBottom: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  
  controlsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  controlLabel: {
    fontSize: 16,
    color: '#cccccc',
  },
  
  configContainer: {
    marginBottom: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  
  configTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  
  configGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  
  configItem: {
    flex: 1,
    minWidth: '45%',
  },
  
  configLabel: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 4,
  },
  
  configValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  
  examplesContainer: {
    marginBottom: 24,
  },
  
  examplesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  
  usageContainer: {
    marginBottom: 24,
  },
  
  usageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  
  usageExample: {
    marginBottom: 20,
  },
  
  usageExampleTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#cccccc',
    marginBottom: 8,
  },
  
  codeBlock: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
  },
  
  codeText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#e6e6e6',
    lineHeight: 20,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default SectionHeaderTest;
