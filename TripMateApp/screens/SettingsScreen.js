import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useAuth } from '../context/AuthContext';

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
    padding: 24,
    backgroundColor: '#ffffff',
  },

  backButton: {
    marginTop: 18,
    marginBottom: 20,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
  },

  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: '600',
  },

  itemSubtitle: {
    fontSize: 13,
    color: '#777777',
    marginTop: 4,
  },

  arrow: {
    fontSize: 26,
    color: '#777777',
  },

  infoBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
    marginTop: 6,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  infoText: {
    color: '#666666',
    marginTop: 7,
    lineHeight: 20,
  },

  logoutButton: {
    borderWidth: 1,
    borderColor: '#222222',
    padding: 15,
    borderRadius: 10,
    marginTop: 35,
  },

  logoutText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});