import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';

import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </AuthProvider>
  );
}