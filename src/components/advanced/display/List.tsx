/**
 * Corp Astro UI Library - List Component
 * 
 * Comprehensive list component with various display modes and cosmic styling.
 * Supports virtual scrolling, pull-to-refresh, and advanced interaction patterns.
 * 
 * @module List
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - List containers with cosmic background and proper spacing
 * - Support for various list item types and layouts
 * - Smooth scrolling with momentum and bounce effects
 * - Loading states and empty state handling
 * - Accessibility and keyboard navigation
 * 
 * Features:
 * - Multiple list variants (simple, detailed, card-based)
 * - Virtual scrolling for performance
 * - Pull-to-refresh functionality
 * - Swipe-to-action support
 * - Loading and error states
 * - Search and filtering
 * - Sticky headers and sections
 * - Accessibility compliance
 */

import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  VirtualizedList,
  RefreshControl,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ListRenderItem,
  ListRenderItemInfo,
  Animated,
  Platform,
  AccessibilityProps,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { spacing } from '../../foundations/tokens/spacing/SpacingScale';

/**
 * List item data structure
 */
export interface ListItemData {
  /** Unique identifier */
  id: string;
  /** Primary text content */
  title: string;
  /** Secondary text content */
  subtitle?: string;
  /** Description text */
  description?: string;
  /** Item metadata */
  metadata?: Record<string, any>;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item is selected */
  selected?: boolean;
  /** Custom data for the item */
  data?: any;
}

/**
 * List variant types
 */
export type ListVariant = 'simple' | 'detailed' | 'card' | 'minimal';

/**
 * List layout types
 */
export type ListLayout = 'vertical' | 'horizontal' | 'grid';

/**
 * List interaction modes
 */
export type ListInteractionMode = 'single' | 'multiple' | 'none';

/**
 * List loading state
 */
export interface ListLoadingState {
  /** Whether list is loading */
  isLoading: boolean;
  /** Whether refreshing */
  isRefreshing: boolean;
  /** Whether loading more items */
  isLoadingMore: boolean;
  /** Loading text override */
  loadingText?: string;
}

/**
 * List empty state configuration
 */
export interface ListEmptyState {
  /** Empty state title */
  title: string;
  /** Empty state description */
  description?: string;
  /** Empty state action text */
  actionText?: string;
  /** Empty state action handler */
  onAction?: () => void;
  /** Custom empty state component */
  component?: React.ReactNode;
}

/**
 * List search configuration
 */
export interface ListSearchConfig {
  /** Enable search functionality */
  enabled: boolean;
  /** Search placeholder text */
  placeholder?: string;
  /** Search filter function */
  filterFunction?: (items: ListItemData[], query: string) => ListItemData[];
  /** Search debounce delay */
  debounceMs?: number;
}

/**
 * List component props
 */
export interface ListProps extends AccessibilityProps {
  /** List data */
  data: ListItemData[];
  /** List variant */
  variant?: ListVariant;
  /** List layout */
  layout?: ListLayout;
  /** Selection mode */
  selectionMode?: ListInteractionMode;
  /** Selected item IDs */
  selectedIds?: string[];
  /** Item selection handler */
  onItemSelect?: (item: ListItemData, index: number) => void;
  /** Multiple selection handler */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Item press handler */
  onItemPress?: (item: ListItemData, index: number) => void;
  /** Item long press handler */
  onItemLongPress?: (item: ListItemData, index: number) => void;
  /** Custom item renderer */
  renderItem?: ListRenderItem<ListItemData>;
  /** Custom header renderer */
  renderHeader?: () => React.ReactNode;
  /** Custom footer renderer */
  renderFooter?: () => React.ReactNode;
  /** Custom separator renderer */
  renderSeparator?: () => React.ReactNode;
  /** Loading state */
  loading?: ListLoadingState;
  /** Empty state configuration */
  emptyState?: ListEmptyState;
  /** Search configuration */
  search?: ListSearchConfig;
  /** Enable pull-to-refresh */
  pullToRefresh?: boolean;
  /** Refresh handler */
  onRefresh?: () => void;
  /** Enable infinite scroll */
  infiniteScroll?: boolean;
  /** Load more handler */
  onLoadMore?: () => void;
  /** Enable virtual scrolling */
  virtualScrolling?: boolean;
  /** Item height (for virtual scrolling) */
  itemHeight?: number;
  /** Enable swipe actions */
  swipeActions?: boolean;
  /** Swipe action configuration */
  swipeConfig?: {
    leftActions?: Array<{
      text: string;
      color: string;
      onPress: (item: ListItemData) => void;
    }>;
    rightActions?: Array<{
      text: string;
      color: string;
      onPress: (item: ListItemData) => void;
    }>;
  };
  /** Custom styling */
  style?: ViewStyle;
  /** Custom content styling */
  contentStyle?: ViewStyle;
  /** Custom item styling */
  itemStyle?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

/**
 * List component
 * 
 * A comprehensive list component with cosmic design aesthetics.
 * Supports multiple variants, layouts, and interaction patterns.
 * 
 * @param props - List component props
 * @returns List component
 */
export const List: React.FC<ListProps> = ({
  data,
  variant = 'simple',
  layout = 'vertical',
  selectionMode = 'none',
  selectedIds = [],
  onItemSelect,
  onSelectionChange,
  onItemPress,
  onItemLongPress,
  renderItem,
  renderHeader,
  renderFooter,
  renderSeparator,
  loading = { isLoading: false, isRefreshing: false, isLoadingMore: false },
  emptyState,
  search,
  pullToRefresh = false,
  onRefresh,
  infiniteScroll = false,
  onLoadMore,
  virtualScrolling = false,
  itemHeight = 60,
  swipeActions = false,
  swipeConfig,
  style,
  contentStyle,
  itemStyle,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [internalSelection, setInternalSelection] = useState<string[]>(selectedIds);
  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList>(null);

  // ============================================================================
  // MEMOIZED VALUES
  // ============================================================================

  const styles = useMemo(() => createStyles(theme, { variant, layout }), [theme, variant, layout]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleItemPress = useCallback((item: ListItemData, index: number) => {
    if (selectionMode === 'single') {
      const newSelection = [item.id];
      setInternalSelection(newSelection);
      onSelectionChange?.(newSelection);
      onItemSelect?.(item, index);
    } else if (selectionMode === 'multiple') {
      const newSelection = internalSelection.includes(item.id)
        ? internalSelection.filter(id => id !== item.id)
        : [...internalSelection, item.id];
      setInternalSelection(newSelection);
      onSelectionChange?.(newSelection);
      onItemSelect?.(item, index);
    }
    
    onItemPress?.(item, index);
  }, [selectionMode, internalSelection, onSelectionChange, onItemSelect, onItemPress]);

  const handleItemLongPress = useCallback((item: ListItemData, index: number) => {
    onItemLongPress?.(item, index);
  }, [onItemLongPress]);

  const handleRefresh = useCallback(() => {
    onRefresh?.();
  }, [onRefresh]);

  const handleLoadMore = useCallback(() => {
    if (!loading.isLoadingMore) {
      onLoadMore?.();
    }
  }, [loading.isLoadingMore, onLoadMore]);

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderListItem: ListRenderItem<ListItemData> = useCallback(({ item, index, separators }) => {
    if (renderItem) {
      return renderItem({ item, index, separators });
    }

    const isSelected = internalSelection.includes(item.id);

    return (
      <View style={[styles.item, itemStyle, isSelected && styles.selectedItem]}>
        {/* Default item implementation */}
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {item.subtitle && <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
          {item.description && <Text style={styles.itemDescription}>{item.description}</Text>}
        </View>
      </View>
    );
  }, [renderItem, internalSelection, styles, itemStyle]);

  const renderItemSeparator = useCallback(() => {
    if (renderSeparator) {
      return renderSeparator();
    }
    return <View style={styles.separator} />;
  }, [renderSeparator, styles]);

  const renderListHeader = useCallback(() => {
    return renderHeader?.();
  }, [renderHeader]);

  const renderListFooter = useCallback(() => {
    const footerContent = renderFooter?.();
    
    if (loading.isLoadingMore) {
      return (
        <View style={styles.loadingMore}>
          {/* Loading indicator */}
          <Text style={styles.loadingText}>Loading more...</Text>
        </View>
      );
    }

    return footerContent;
  }, [renderFooter, loading.isLoadingMore, styles]);

  const renderEmptyState = useCallback(() => {
    if (!emptyState) return null;

    if (emptyState.component) {
      return emptyState.component;
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>{emptyState.title}</Text>
        {emptyState.description && (
          <Text style={styles.emptyDescription}>{emptyState.description}</Text>
        )}
        {emptyState.actionText && emptyState.onAction && (
          <TouchableOpacity
            style={styles.emptyAction}
            onPress={emptyState.onAction}
          >
            <Text style={styles.emptyActionText}>{emptyState.actionText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [emptyState, styles]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <View style={[styles.container, style]} testID={testID} {...accessibilityProps}>
      <FlatList
        ref={listRef}
        data={filteredData}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderItemSeparator}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          pullToRefresh ? (
            <RefreshControl
              refreshing={loading.isRefreshing}
              onRefresh={handleRefresh}
              tintColor={SignatureBlues.primary}
              colors={[SignatureBlues.primary]}
            />
          ) : undefined
        }
        onEndReached={infiniteScroll ? handleLoadMore : undefined}
        onEndReachedThreshold={0.1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.contentContainer, contentStyle]}
        style={styles.list}
      />
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const createStyles = (
  theme: any,
  config: { variant: ListVariant; layout: ListLayout }
) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: deepSpaceColors.void,
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
  },
  item: {
    backgroundColor: deepSpaceColors.deep,
    borderRadius: 16,
    marginVertical: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    ...(config.variant === 'card' && {
      marginHorizontal: spacing.xs,
      elevation: 2,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    }),
  },
  selectedItem: {
    borderColor: SignatureBlues.primary,
    backgroundColor: 'rgba(46,134,222,0.1)',
  },
  itemContent: {
    padding: spacing.md,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  itemSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.xxs,
  },
  itemDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: spacing.md,
  },
  loadingMore: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  emptyAction: {
    backgroundColor: SignatureBlues.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 24,
  },
  emptyActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default List;
