import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import colors from '../src/theme/colors';

export default function LoginScreen({ onGoToRegister }) {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert(
        'Missing information',
        'Please enter both your email and password.'
      );
      return;
    }

    try {
      setSubmitting(true);

      await login(email, password);
    } catch (error) {
        console.log('LOGIN ERROR CODE:', error.code);
        console.log('LOGIN ERROR MESSAGE:', error.message);

        Alert.alert(
          'Login Failed',
          `${error.code}\n${error.message}`
        );
      } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TripMate</Text>

      <Text style={styles.title}>Welcome Back</Text>

      <Text style={styles.subtitle}>
        Login to continue exploring student trips.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#9CA3AF"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[
          styles.button,
          submitting && styles.disabledButton,
        ]}
        onPress={handleLogin}
        disabled={submitting}
      >
        <Text style={styles.buttonText}>
          {submitting ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoToRegister}>
        <Text style={styles.link}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    backgroundColor: colors.background,
  },

  logo: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.textPrimary || '#111827',
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.textPrimary || '#111827',
  },

  subtitle: {
    textAlign: 'center',
    color: colors.textSecondary || '#6B7280',
    marginTop: 8,
    marginBottom: 30,
    fontSize: 15,
    lineHeight: 22,
  },

  input: {
    backgroundColor: colors.white || '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 14,
    fontSize: 16,
    color: colors.textPrimary || '#111827',
  },

  button: {
    backgroundColor: colors.primary || '#3B82F6',
    paddingVertical: 17,
    borderRadius: 18,
    marginTop: 8,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },

  link: {
    textAlign: 'center',
    marginTop: 22,
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary || '#3B82F6',
  },
});