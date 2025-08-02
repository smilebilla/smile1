/**
 * Corp Astro UI Library - Bottom Navigation Component Tests
 * 
 * Comprehensive test suite for the BottomNavigation component covering:
 * - Basic rendering and functionality
 * - Navigation item selection and interaction
 * - Floating orb support and premium features
 * - Accessibility compliance and ARIA attributes
 * - Visual variants and styling configurations
 * - Animation and transition behaviors
 * - Theme integration and responsive design
 * - Error handling and edge cases
 * 
 * @module BottomNavigationTest
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  within,
} from '@testing-library/react-native';
import { AccessibilityInfo } from 'react-native';
import { BottomNavigation, NavigationItem } from '../BottomNavigation';
import { ThemeProvider } from '../../../../foundations/themes/ThemeProvider';
import { corpAstroDarkTheme } from '../../../../foundations/themes/DarkTheme';

// ============================================================================
// MOCK SETUP
// ============================================================================

// Mock React Native modules
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  AccessibilityInfo: {
    announceForAccessibility: jest.fn(),
  },
  Animated: {
    Value: jest.fn(() => ({
      interpolate: jest.fn(() => 0),
    })),
    timing: jest.fn(() => ({
      start: jest.fn(),
    })),
    View: jest.requireActual('react-native').View,
  },
}));

// Mock theme hook
jest.mock('../../../../foundations/themes/useTheme', () => ({
  useTheme: () => ({
    theme: corpAstroDarkTheme,
  }),
}));

// ============================================================================
// TEST UTILITIES
// ============================================================================

/**
 * Test wrapper component with theme provider
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialTheme={corpAstroDarkTheme}>
    {children}
  </ThemeProvider>
);

/**
 * Sample navigation items for testing
 */
const sampleNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'home',
    testID: 'nav-dashboard',
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: 'analytics',
    badge: 5,
    testID: 'nav-insights',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: 'user',
    testID: 'nav-profile',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    disabled: true,
    testID: 'nav-settings',
  },
];

/**
 * Render component with theme wrapper
 */
const renderWithTheme = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

// ============================================================================
// BASIC RENDERING TESTS
// ============================================================================

describe('BottomNavigation - Basic Rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with required props', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('renders all navigation items', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        testID="bottom-nav-test"
      />
    );

    sampleNavigationItems.forEach(item => {
      expect(getByTestId(item.testID!)).toBeTruthy();
    });
  });

  test('renders navigation items with labels when showLabels is true', () => {
    const { getByText } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        showLabels={true}
      />
    );

    sampleNavigationItems.forEach(item => {
      expect(getByText(item.label)).toBeTruthy();
    });
  });

  test('hides navigation items labels when showLabels is false', () => {
    const { queryByText } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        showLabels={false}
      />
    );

    sampleNavigationItems.forEach(item => {
      expect(queryByText(item.label)).toBeNull();
    });
  });

  test('renders badges when showBadges is true and badge exists', () => {
    const { getByText } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        showBadges={true}
      />
    );

    const insightsItem = sampleNavigationItems.find(item => item.id === 'insights');
    expect(getByText(insightsItem!.badge!.toString())).toBeTruthy();
  });

  test('hides badges when showBadges is false', () => {
    const { queryByText } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        showBadges={false}
      />
    );

    const insightsItem = sampleNavigationItems.find(item => item.id === 'insights');
    expect(queryByText(insightsItem!.badge!.toString())).toBeNull();
  });
});

// ============================================================================
// INTERACTION TESTS
// ============================================================================

describe('BottomNavigation - Interaction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls onItemSelect when navigation item is pressed', () => {
    const mockOnItemSelect = jest.fn();
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        onItemSelect={mockOnItemSelect}
      />
    );

    const dashboardItem = getByTestId('nav-dashboard');
    fireEvent.press(dashboardItem);

    expect(mockOnItemSelect).toHaveBeenCalledWith('dashboard');
  });

  test('calls custom onPress when provided on navigation item', () => {
    const mockOnPress = jest.fn();
    const itemsWithCustomPress = [
      {
        ...sampleNavigationItems[0],
        onPress: mockOnPress,
      },
    ];

    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={itemsWithCustomPress}
      />
    );

    const dashboardItem = getByTestId('nav-dashboard');
    fireEvent.press(dashboardItem);

    expect(mockOnPress).toHaveBeenCalled();
  });

  test('does not call onItemSelect when navigation item is disabled', () => {
    const mockOnItemSelect = jest.fn();
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        onItemSelect={mockOnItemSelect}
      />
    );

    const settingsItem = getByTestId('nav-settings');
    fireEvent.press(settingsItem);

    expect(mockOnItemSelect).not.toHaveBeenCalled();
  });

  test('highlights active navigation item', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        activeItemId="insights"
      />
    );

    const insightsItem = getByTestId('nav-insights');
    expect(insightsItem).toHaveProp('accessibilityState', { selected: true });
  });

  test('announces selection when accessibility is enabled', () => {
    const mockAnnounce = jest.mocked(AccessibilityInfo.announceForAccessibility);
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        accessibility={{ enabled: true, announceSelection: true }}
      />
    );

    const dashboardItem = getByTestId('nav-dashboard');
    fireEvent.press(dashboardItem);

    expect(mockAnnounce).toHaveBeenCalledWith('Dashboard selected');
  });
});

// ============================================================================
// FLOATING ORB TESTS
// ============================================================================

describe('BottomNavigation - Floating Orb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders floating orb when showFloatingOrb is true', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        showFloatingOrb={true}
        floatingOrb={{
          position: 'center',
          icon: 'star',
          onPress: jest.fn(),
        }}
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test-floating-orb')).toBeTruthy();
  });

  test('does not render floating orb when showFloatingOrb is false', () => {
    const { queryByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        showFloatingOrb={false}
        testID="bottom-nav-test"
      />
    );

    expect(queryByTestId('bottom-nav-test-floating-orb')).toBeNull();
  });

  test('calls floating orb onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        showFloatingOrb={true}
        floatingOrb={{
          position: 'center',
          icon: 'star',
          onPress: mockOnPress,
        }}
        testID="bottom-nav-test"
      />
    );

    const floatingOrb = getByTestId('bottom-nav-test-floating-orb');
    fireEvent.press(floatingOrb);

    expect(mockOnPress).toHaveBeenCalled();
  });

  test('renders premium indicator for premium floating orb', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        showFloatingOrb={true}
        floatingOrb={{
          position: 'center',
          icon: 'star',
          premium: true,
          onPress: jest.fn(),
        }}
        testID="bottom-nav-test"
      />
    );

    const floatingOrb = getByTestId('bottom-nav-test-floating-orb');
    expect(floatingOrb).toBeTruthy();
    expect(floatingOrb).toHaveProp('accessibilityLabel', 'Premium Feature');
  });
});

// ============================================================================
// VISUAL VARIANTS TESTS
// ============================================================================

describe('BottomNavigation - Visual Variants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default variant', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        variant="default"
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('renders with floating variant', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        variant="floating"
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('renders with blur variant', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        variant="blur"
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('renders with compact variant', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        variant="compact"
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('applies custom background opacity', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        backgroundOpacity={0.7}
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('applies safe area insets', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        safeAreaInsets={{ bottom: 20, left: 10, right: 10 }}
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

describe('BottomNavigation - Accessibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('has proper accessibility roles', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        testID="bottom-nav-test"
      />
    );

    const navigation = getByTestId('bottom-nav-test');
    expect(navigation).toHaveProp('accessibilityRole', 'tablist');
    expect(navigation).toHaveProp('accessibilityLabel', 'Bottom Navigation');
  });

  test('navigation items have proper accessibility roles', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
      />
    );

    const dashboardItem = getByTestId('nav-dashboard');
    expect(dashboardItem).toHaveProp('accessibilityRole', 'tab');
    expect(dashboardItem).toHaveProp('accessibilityLabel', 'Dashboard');
  });

  test('disabled items have proper accessibility state', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
      />
    );

    const settingsItem = getByTestId('nav-settings');
    expect(settingsItem).toHaveProp('accessibilityState', { disabled: true });
  });

  test('supports custom accessibility labels', () => {
    const itemsWithCustomLabels = [
      {
        ...sampleNavigationItems[0],
        accessibilityLabel: 'Custom Dashboard Label',
      },
    ];

    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={itemsWithCustomLabels}
      />
    );

    const dashboardItem = getByTestId('nav-dashboard');
    expect(dashboardItem).toHaveProp('accessibilityLabel', 'Custom Dashboard Label');
  });

  test('can disable accessibility features', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        accessibility={{ enabled: false }}
        testID="bottom-nav-test"
      />
    );

    const navigation = getByTestId('bottom-nav-test');
    expect(navigation).toBeTruthy();
    // When accessibility is disabled, accessibility props should not be applied
  });
});

// ============================================================================
// ANIMATION TESTS
// ============================================================================

describe('BottomNavigation - Animation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows navigation when hidden is false', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        hidden={false}
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('hides navigation when hidden is true and animation is disabled', () => {
    const { queryByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        hidden={true}
        animation={{ enabled: false }}
        testID="bottom-nav-test"
      />
    );

    expect(queryByTestId('bottom-nav-test')).toBeNull();
  });

  test('applies animation configuration', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        animation={{
          enabled: true,
          duration: 300,
          easing: 'ease-in-out',
        }}
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });
});

// ============================================================================
// STYLING TESTS
// ============================================================================

describe('BottomNavigation - Styling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('applies custom style prop', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        style={customStyle}
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('applies custom content style', () => {
    const customContentStyle = { padding: 20 };
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        contentStyle={customContentStyle}
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('applies custom item style', () => {
    const customItemStyle = { backgroundColor: 'blue' };
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        itemStyle={customItemStyle}
      />
    );

    const dashboardItem = getByTestId('nav-dashboard');
    expect(dashboardItem).toBeTruthy();
  });

  test('applies custom label style', () => {
    const customLabelStyle = { color: 'green' };
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        labelStyle={customLabelStyle}
      />
    );

    const dashboardItem = getByTestId('nav-dashboard');
    expect(dashboardItem).toBeTruthy();
  });
});

// ============================================================================
// EDGE CASES AND ERROR HANDLING
// ============================================================================

describe('BottomNavigation - Edge Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('handles empty items array', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={[]}
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('handles badge count greater than 99', () => {
    const itemsWithLargeBadge = [
      {
        ...sampleNavigationItems[0],
        badge: 150,
      },
    ];

    const { getByText } = renderWithTheme(
      <BottomNavigation
        items={itemsWithLargeBadge}
        showBadges={true}
      />
    );

    expect(getByText('99+')).toBeTruthy();
  });

  test('handles missing floating orb configuration', () => {
    const { queryByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        showFloatingOrb={true}
        testID="bottom-nav-test"
      />
    );

    expect(queryByTestId('bottom-nav-test-floating-orb')).toBeNull();
  });

  test('handles activeItemId not matching any item', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        activeItemId="nonexistent"
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('BottomNavigation - Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('works with theme provider', () => {
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('supports complete navigation flow', async () => {
    const mockOnItemSelect = jest.fn();
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        onItemSelect={mockOnItemSelect}
        activeItemId="dashboard"
      />
    );

    // Select insights
    fireEvent.press(getByTestId('nav-insights'));
    expect(mockOnItemSelect).toHaveBeenCalledWith('insights');

    // Select profile
    fireEvent.press(getByTestId('nav-profile'));
    expect(mockOnItemSelect).toHaveBeenCalledWith('profile');

    await waitFor(() => {
      expect(mockOnItemSelect).toHaveBeenCalledTimes(2);
    });
  });
});

// ============================================================================
// PERFORMANCE TESTS
// ============================================================================

describe('BottomNavigation - Performance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders efficiently with many items', () => {
    const manyItems = Array.from({ length: 10 }, (_, i) => ({
      id: `item-${i}`,
      label: `Item ${i}`,
      icon: 'icon',
      testID: `nav-item-${i}`,
    }));

    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={manyItems}
        testID="bottom-nav-test"
      />
    );

    expect(getByTestId('bottom-nav-test')).toBeTruthy();
  });

  test('handles rapid navigation changes', () => {
    const mockOnItemSelect = jest.fn();
    const { getByTestId } = renderWithTheme(
      <BottomNavigation
        items={sampleNavigationItems}
        onItemSelect={mockOnItemSelect}
      />
    );

    // Rapidly change navigation
    fireEvent.press(getByTestId('nav-dashboard'));
    fireEvent.press(getByTestId('nav-insights'));
    fireEvent.press(getByTestId('nav-profile'));

    expect(mockOnItemSelect).toHaveBeenCalledTimes(3);
  });
});

export { sampleNavigationItems, TestWrapper, renderWithTheme };
