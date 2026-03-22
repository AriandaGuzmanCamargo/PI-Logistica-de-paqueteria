import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { DarkModeProvider, useDarkMode } from './src/repartidor/context/DarkModeContext';

function AppShell() {
  const { isDarkMode } = useDarkMode();

  return (
    <View style={styles.root}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>

      {isDarkMode ? <View pointerEvents="none" style={styles.darkOverlay} /> : null}
    </View>
  );
}

export default function App() {
  return (
    <DarkModeProvider>
      <AppShell />
    </DarkModeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 14, 28, 0.45)',
  },
});
