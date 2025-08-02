/**
 * Corp Astro UI Library - Theme Context
 * 
 * Core theme context definition and utilities for the Corp Astro theme system.
 * Provides the fundamental context structure that powers theme access throughout the application.
 * 
 * @module ThemeContext
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Theme context structure and usage (lines 2924-2958)
 * - Developer Handoff Guide: Theme context implementation patterns
 * - Design Tokens: Theme context requirements and specifications
 */

import * as React from 'react';
import { createContext, useContext } from 'react';
import { CorpAstroTheme } from './DarkTheme';

// ============================================================================
// THEME CONTEXT INTERFACE
// ============================================================================

/**
 * Theme context interface
 * Defines the structure of the theme context available throughout the application.
 * 
 * @interface ThemeContextType
 * @validated-against UI Docs/Design Sytem.md lines 2924-2958
 */
export interface ThemeContextType {
  /** Current active theme object */
  theme: CorpAstroTheme;
  /** Whether the current theme is dark mode */
  isDark: boolean;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
  /** Function to set a specific theme */
  setTheme: (theme: CorpAstroTheme) => void;
  /** Theme metadata */
  metadata: {
    /** Theme name identifier */
    name: string;
    /** Theme version */
    version: string;
    /** Theme creation timestamp */
    created: Date;
    /** Theme last modified timestamp */
    lastModified: Date;
  };
}

/**
 * Theme context configuration interface
 * Defines configuration options for theme context setup.
 * 
 * @interface ThemeContextConfig
 */
export interface ThemeContextConfig {
  /** Enable theme persistence to storage */
  persistTheme?: boolean;
  /** Storage key for theme persistence */
  storageKey?: string;
  /** Enable theme transition animations */
  enableTransitions?: boolean;
  /** Theme transition duration in milliseconds */
  transitionDuration?: number;
  /** Callback for theme change events */
  onThemeChange?: (theme: CorpAstroTheme) => void;
  /** Callback for theme validation */
  onThemeValidation?: (theme: CorpAstroTheme) => boolean;
}

// ============================================================================
// THEME CONTEXT CREATION
// ============================================================================

/**
 * Corp Astro Theme Context
 * 
 * The core React context that provides theme access throughout the application.
 * This context is created with null as the default value to ensure proper
 * error handling when used outside of a ThemeProvider.
 * 
 * @example
 * ```tsx
 * import { ThemeContext } from '@/foundations/themes/ThemeContext';
 * 
 * function MyComponent() {
 *   const context = useContext(ThemeContext);
 *   
 *   if (!context) {
 *     throw new Error('Component must be wrapped in ThemeProvider');
 *   }
 *   
 *   return <View style={{ backgroundColor: context.theme.colors.cosmos.deep }} />;
 * }
 * ```
 * 
 * @validated-against UI Docs/Design Sytem.md lines 2924-2958
 */
export const ThemeContext = createContext<ThemeContextType | null>(null);

// ============================================================================
// THEME CONTEXT HOOKS
// ============================================================================

/**
 * Custom hook for accessing Corp Astro theme context
 * 
 * Provides safe access to the theme context with proper error handling.
 * This hook ensures that components are properly wrapped in a ThemeProvider
 * and provides TypeScript type safety.
 * 
 * @returns Theme context with current theme and utilities
 * @throws Error if used outside ThemeProvider
 * 
 * @example
 * ```tsx
 * import { useThemeContext } from '@/foundations/themes/ThemeContext';
 * 
 * function MyComponent() {
 *   const { theme, isDark, toggleTheme } = useThemeContext();
 *   
 *   return (
 *     <TouchableOpacity onPress={toggleTheme}>
 *       <Text style={{ color: theme.colors.text.primary }}>
 *         Current theme: {isDark ? 'Dark' : 'Light'}
 *       </Text>
 *     </TouchableOpacity>
 *   );
 * }
 * ```
 * 
 * @validated-against UI Docs/Design Sytem.md lines 2940-2958
 */
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error(
      'useThemeContext must be used within a ThemeProvider. ' +
      'Make sure to wrap your app with <ThemeProvider>.'
    );
  }
  
  return context;
};

/**
 * Hook for accessing only the theme object
 * 
 * Optimized hook that returns only the theme object without additional utilities.
 * Useful for components that only need theme values for styling.
 * 
 * @returns Current theme object
 * 
 * @example
 * ```tsx
 * import { useThemeValues } from '@/foundations/themes/ThemeContext';
 * 
 * function StyledComponent() {
 *   const theme = useThemeValues();
 *   
 *   return (
 *     <View style={{
 *       backgroundColor: theme.colors.cosmos.deep,
 *       padding: theme.spacing.md,
 *       borderRadius: theme.borderRadius.lg,
 *     }}>
 *       <Text style={{ color: theme.colors.text.primary }}>
 *         Styled with theme values
 *       </Text>
 *     </View>
 *   );
 * }
 * ```
 */
export const useThemeValues = (): CorpAstroTheme => {
  const { theme } = useThemeContext();
  return theme;
};

/**
 * Hook for accessing theme metadata
 * 
 * Returns theme metadata including name, version, and timestamps.
 * Useful for debugging and development tools.
 * 
 * @returns Theme metadata object
 */
export const useThemeMetadata = (): ThemeContextType['metadata'] => {
  const { metadata } = useThemeContext();
  return metadata;
};

// ============================================================================
// THEME CONTEXT UTILITIES
// ============================================================================

/**
 * Theme context validator
 * 
 * Validates that the theme context is properly configured and accessible.
 * Useful for debugging theme setup issues.
 * 
 * @returns Validation result object
 */
export const validateThemeContext = (): {
  isValid: boolean;
  error?: string;
  context?: ThemeContextType;
} => {
  try {
    const context = useContext(ThemeContext);
    
    if (!context) {
      return {
        isValid: false,
        error: 'Theme context is not available. Ensure ThemeProvider is wrapped around the app.',
      };
    }
    
    if (!context.theme) {
      return {
        isValid: false,
        error: 'Theme object is not available in context.',
      };
    }
    
    return {
      isValid: true,
      context,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Unknown theme context error',
    };
  }
};

/**
 * Theme context provider props interface
 * 
 * Defines the props interface for theme context providers.
 * Used for creating custom theme providers with specific configurations.
 */
export interface ThemeContextProviderProps {
  /** Theme context value */
  value: ThemeContextType;
  /** Child components */
  children: React.ReactNode;
  /** Optional configuration */
  config?: ThemeContextConfig;
}

/**
 * Theme context consumer component
 * 
 * Render prop component for accessing theme context in class components
 * or when hooks are not available.
 * 
 * @example
 * ```tsx
 * import { ThemeContextConsumer } from '@/foundations/themes/ThemeContext';
 * 
 * function MyClassComponent() {
 *   return (
 *     <ThemeContextConsumer>
 *       {({ theme, isDark }) => (
 *         <div style={{ backgroundColor: theme.colors.cosmos.deep }}>
 *           Theme: {isDark ? 'Dark' : 'Light'}
 *         </div>
 *       )}
 *     </ThemeContextConsumer>
 *   );
 * }
 * ```
 */
export const ThemeContextConsumer: React.FC<{
  children: (context: ThemeContextType) => React.ReactNode;
}> = ({ children }) => {
  const context = useThemeContext();
  return <>{children(context)}</>;
};

// ============================================================================
// THEME CONTEXT TYPES
// ============================================================================

/**
 * Theme context state interface
 * Internal state interface for theme context management.
 */
export interface ThemeContextState {
  /** Current theme */
  currentTheme: CorpAstroTheme;
  /** Dark mode state */
  isDarkMode: boolean;
  /** Theme loading state */
  isLoading: boolean;
  /** Theme error state */
  error: string | null;
  /** Theme initialization state */
  isInitialized: boolean;
}

/**
 * Theme context actions interface
 * Actions available for theme context manipulation.
 */
export interface ThemeContextActions {
  /** Set theme action */
  setTheme: (theme: CorpAstroTheme) => void;
  /** Toggle theme action */
  toggleTheme: () => void;
  /** Reset theme action */
  resetTheme: () => void;
  /** Update theme metadata action */
  updateMetadata: (metadata: Partial<ThemeContextType['metadata']>) => void;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default ThemeContext;
