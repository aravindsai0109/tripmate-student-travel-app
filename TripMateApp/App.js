import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { AuthProvider, useAuth } from './context/AuthContext';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function AppContent() {
  const { user, loading, logout } = useAuth();

  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Checking authentication...
        </Text>
      </View>
    );
  }

  if (user) {
    return (
      <View style={styles.center}>
        <Text style={styles.heading}>
          TripMate
        </Text>

        <Text style={styles.success}>
          Authentication successful
        </Text>

        <Text style={styles.label}>
          Signed in as:
        </Text>

        <Text style={styles.userText}>
          {user.displayName || 'TripMate User'}
        </Text>

        <Text style={styles.email}>
          {user.email}
        </Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showRegister) {
    return (
      <RegisterScreen
        onGoToLogin={() => setShowRegister(false)}
      />
    );
  }

  return (
    <LoginScreen
      onGoToRegister={() => setShowRegister(true)}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },

  loadingText: {
    marginTop: 12,
  },

  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  success: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  label: {
    color: '#666',
  },

  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
  },

  email: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 30,
  },

  logoutButton: {
    backgroundColor: '#222222',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },

  logoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});