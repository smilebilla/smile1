/**
 * Corp Astro UI Library - Toast Container Component
 * 
 * Global toast container that renders all toasts from the toast manager.
 * This component should be placed at the root level of the app to display toasts.
 * 
 * @module ToastContainer
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { toastManager } from './Toast';
import { Toast } from './Toast';

// ============================================================================
// TOAST CONTAINER COMPONENT
// ============================================================================

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<any[]>([]);

  useEffect(() => {
    // Subscribe to toast manager updates
    const unsubscribe = toastManager.subscribe((newToasts) => {
      setToasts(newToasts);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999 }}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          message={toast.message}
          visible={toast.visible}
          onDismiss={toast.onDismiss}
          duration={toast.duration}
          position={toast.position}
          style={toast.style}
          messageStyle={toast.messageStyle}
          testID={toast.testID}
          maxWidth={toast.maxWidth}
          offset={toast.offset}
        />
      ))}
    </View>
  );
};

export default ToastContainer; 