import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  AuthProvider,
  useAuth,
} from './context/AuthContext';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

function AppContent() {
  const {
    user,
    loading,
    logout,
  } = useAuth();

  const [showRegister, setShowRegister] =
    useState(false);

  const [currentScreen, setCurrentScreen] =
    useState('home');

  useEffect(() => {
    if (!user) {
      setCurrentScreen('home');
    }
  }, [user]);

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

  if (!user) {
    if (showRegister) {
      return (
        <RegisterScreen
          onGoToLogin={() =>
            setShowRegister(false)
          }
        />
      );
    }

    return (
      <LoginScreen
        onGoToRegister={() =>
          setShowRegister(true)
        }
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfileScreen
        onBack={() =>
          setCurrentScreen('home')
        }
      />
    );
  }

  if (currentScreen === 'settings') {
    return (
      <SettingsScreen
        onBack={() =>
          setCurrentScreen('home')
        }
        onOpenProfile={() =>
          setCurrentScreen('profile')
        }
      />
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.heading}>
        TripMate
      </Text>

      <Text style={styles.success}>
        Authentication successful
      </Text>

      <Text style={styles.label}>
        Welcome
      </Text>

      <Text style={styles.userName}>
        {user.displayName || 'TripMate User'}
      </Text>

      <Text style={styles.email}>
        {user.email}
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() =>
          setCurrentScreen('profile')
        }
      >
        <Text style={styles.primaryButtonText}>
          My Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() =>
          setCurrentScreen('settings')
        }
      >
        <Text style={styles.secondaryButtonText}>
          Settings
        </Text>
      </TouchableOpacity>

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
    marginBottom: 20,
  },

  success: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },

  label: {
    color: '#666666',
  },

  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 6,
  },

  email: {
    fontSize: 15,
    color: '#666666',
    marginTop: 5,
    marginBottom: 30,
  },

  primaryButton: {
    width: '100%',
    backgroundColor: '#222222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  secondaryButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#222222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  secondaryButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  logoutButton: {
    marginTop: 15,
    padding: 12,
  },

  logoutText: {
    fontWeight: '600',
  },
});