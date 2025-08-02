/**
 * Corp Astro UI Library - Theme Provider
 * 
 * React context provider for Corp Astro theme system.
 * Manages theme state and provides theme access throughout the application.
 * 
 * @module ThemeProvider
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Theme provider setup and usage
 * - Developer Handoff Guide: Theme provider implementation
 * - Design Tokens: Theme context requirements
 */

import * as React from 'react';
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { corpAstroDarkTheme, CorpAstroTheme } from './DarkTheme';

// ============================================================================
// THEME CONTEXT TYPES
// ============================================================================

/**
 * Theme context interface
 */
export interface ThemeContextType {
  theme: CorpAstroTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: CorpAstroTheme) => void;
}

/**
 * Theme provider props interface
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: CorpAstroTheme;
  onThemeChange?: (theme: CorpAstroTheme) => void;
}

// ============================================================================
// THEME CONTEXT CREATION
// ============================================================================

/**
 * Theme context for Corp Astro
 * Provides theme access throughout the application
 */
export const ThemeContext = createContext<ThemeContextType | null>(null);

// ============================================================================
// THEME PROVIDER COMPONENT
// ============================================================================

/**
 * Corp Astro Theme Provider Component
 * 
 * Wraps the application and provides theme context to all child components.
 * Manages theme state and provides utilities for theme manipulation.
 * 
 * @param children - React children to wrap with theme context
 * @param initialTheme - Optional initial theme (defaults to dark theme)
 * @param onThemeChange - Optional callback for theme changes
 * 
 * @example
 * ```tsx
 * import { ThemeProvider } from '@/foundations/themes/ThemeProvider';
 * import { corpAstroDarkTheme } from '@/foundations/themes/DarkTheme';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider theme={corpAstroDarkTheme}>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 * 
 * @validated-against UI Docs/Developer Handoff Guide .md lines 519-547
 * @validated-against UI Docs/Design Sytem.md lines 2924-2938
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = corpAstroDarkTheme,
  onThemeChange,
}) => {
  // Theme state management
  const [currentTheme, setCurrentTheme] = useState<CorpAstroTheme>(initialTheme);
  const [isDark, setIsDark] = useState<boolean>(true); // Corp Astro is primarily dark themed
  
  // Theme toggle handler
  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
    // Note: Currently only dark theme is available
    // Future implementation could include light theme switching
    if (onThemeChange) {
      onThemeChange(currentTheme);
    }
  }, [currentTheme, onThemeChange]);
  
  // Theme setter with validation
  const setTheme = useCallback((newTheme: CorpAstroTheme) => {
    if (!newTheme) {
      console.error('Invalid theme provided to setTheme');
      return;
    }
    
    setCurrentTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  }, [onThemeChange]);
  
  // Memoized context value for performance optimization
  const contextValue = useMemo<ThemeContextType>(() => ({
    theme: currentTheme,
    isDark,
    toggleTheme,
    setTheme,
  }), [currentTheme, isDark, toggleTheme, setTheme]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// THEME HOOK
// ============================================================================

/**
 * Custom hook for accessing Corp Astro theme
 * 
 * Provides easy access to the current theme and theme utilities.
 * Must be used within a ThemeProvider component.
 * 
 * @returns Theme context with current theme and utilities
 * @throws Error if used outside ThemeProvider
 * 
 * @example
 * ```tsx
 * import { useTheme } from '@/foundations/themes/ThemeProvider';
 * 
 * function MyComponent() {
 *   const { theme, isDark, toggleTheme } = useTheme();
 *   
 *   return (
 *     <View style={{ backgroundColor: theme.colors.cosmos.deep }}>
 *       <Text style={{ color: theme.colors.brand.primary }}>
 *         Corp Astro
 *       </Text>
 *     </View>
 *   );
 * }
 * ```
 * 
 * @validated-against UI Docs/Developer Handoff Guide .md lines 540-550
 * @validated-against UI Docs/Design Sytem.md lines 2942-2958
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Make sure to wrap your app with <ThemeProvider>.'
    );
  }
  
  return context;
};

// ============================================================================
// THEME UTILITIES
// ============================================================================

/**
 * Higher-order component for theme access
 * Provides theme as props to wrapped component
 * 
 * @param Component - Component to wrap with theme access
 * @returns Component with theme props
 */
export const withTheme = <P extends object>(
  Component: React.ComponentType<P & { theme: CorpAstroTheme }>
): React.FC<P> => {
  return (props: P) => {
    const { theme } = useTheme();
    return <Component {...props} theme={theme} />;
  };
};

/**
 * Hook for creating theme-aware styles
 * 
 * @param stylesFn - Function that receives theme and returns styles
 * @returns Memoized styles
 */
export const useThemedStyles = <T extends any>(
  stylesFn: (theme: CorpAstroTheme) => T
): T => {
  const { theme } = useTheme();
  return useMemo(() => stylesFn(theme), [theme, stylesFn]);
};

/**
 * Hook for accessing specific theme section
 * 
 * @param selector - Function to select specific theme section
 * @returns Selected theme section
 */
export const useThemeSelector = <T extends any>(
  selector: (theme: CorpAstroTheme) => T
): T => {
  const { theme } = useTheme();
  return useMemo(() => selector(theme), [theme, selector]);
};

// ============================================================================
// THEME VALIDATION
// ============================================================================

/**
 * Validate theme provider setup
 * Ensures proper theme provider configuration
 */
export const validateThemeProvider = (): boolean => {
  try {
    const context = useContext(ThemeContext);
    return context !== null;
  } catch {
    return false;
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export default ThemeProvider;
