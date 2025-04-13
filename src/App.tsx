import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import BootSplash from 'react-native-bootsplash';
import ErrorBoundary from './components/ErrorBoundary';

// Root component of the app
export default function App() {
  useEffect(() => {
    const init = async () => {
    };

    // Hide the native splash screen once startup tasks are complete
    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    // Wrap the entire app in an error boundary to catch unexpected runtime errors
    <ErrorBoundary>
      <AppNavigator />
    </ErrorBoundary>
  );
}
