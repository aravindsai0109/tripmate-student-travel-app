import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import colors from '../src/theme/colors';

export default function SettingsScreen({
  onBack,
  onOpenProfile,
}) {
  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from TripMate?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.log(
                'Logout error:',
                error
              );

              Alert.alert(
                'Logout failed',
                'Unable to logout. Please try again.'
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backText}>
          ← Back
        </Text>
      </TouchableOpacity>

      <Text style={styles.heading}>
        Settings
      </Text>

      <Text style={styles.sectionTitle}>
        Account
      </Text>

      <TouchableOpacity
        style={styles.settingItem}
        onPress={onOpenProfile}
      >
        <View>
          <Text style={styles.itemTitle}>
            Edit Profile
          </Text>

          <Text style={styles.itemSubtitle}>
            Update your TripMate profile name
          </Text>
        </View>

        <Text style={styles.arrow}>
          ›
        </Text>
      </TouchableOpacity>

      <View style={styles.settingItem}>
        <View>
          <Text style={styles.itemTitle}>
            Email
          </Text>

          <Text style={styles.itemSubtitle}>
            {user?.email || ''}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Security
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>
          Firebase Authentication
        </Text>

        <Text style={styles.infoText}>
          Your TripMate session is protected
          using Firebase Authentication with
          persistent sign-in.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 55,
    backgroundColor: colors.background,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary || '#3B82F6',
  },

  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary || '#111827',
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary || '#6B7280',
    marginTop: 15,
    marginBottom: 10,
    textTransform: 'uppercase',
  },

  settingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 17,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary || '#111827',
  },

  itemSubtitle: {
    fontSize: 13,
    color: colors.textSecondary || '#6B7280',
    marginTop: 4,
  },

  arrow: {
    fontSize: 26,
    color: colors.primary || '#3B82F6',
  },

  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 17,
    marginTop: 5,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary || '#111827',
  },

  infoText: {
    color: colors.textSecondary || '#6B7280',
    marginTop: 7,
    lineHeight: 20,
  },

  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 30,
  },

  logoutText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});