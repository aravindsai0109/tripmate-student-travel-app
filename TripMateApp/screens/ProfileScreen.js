import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import colors from '../src/theme/colors';

export default function ProfileScreen({ onBack, onOpenSettings,}) {
  const {
    user,
    updateDisplayName,
  } = useAuth();

  const [name, setName] = useState(
    user?.displayName || ''
  );

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(user?.displayName || '');
  }, [user?.displayName]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert(
        'Invalid name',
        'Please enter your full name.'
      );

      return;
    }

    try {
      setSaving(true);

      await updateDisplayName(name);

      Alert.alert(
        'Profile updated',
        'Your profile name has been updated successfully.'
      );
    } catch (error) {
      console.log(
        'Profile update error:',
        error
      );

      Alert.alert(
        'Update failed',
        'Unable to update your profile. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
    <TouchableOpacity
      style={styles.backButton}
      onPress={onBack}
      activeOpacity={0.7}
    >
      <Ionicons
        name="chevron-back"
        size={36}
        color={colors.textPrimary || '#111827'}
      />
    </TouchableOpacity>

      <Text style={styles.heading}>
        My Profile
      </Text>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user?.displayName
            ? user.displayName
                .charAt(0)
                .toUpperCase()
            : 'U'}
        </Text>
      </View>

      <Text style={styles.label}>
        Full Name
      </Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your full name"
        autoCapitalize="words"
      />

      <Text style={styles.label}>
        Email Address
      </Text>

      <View style={styles.readOnlyBox}>
        <Text style={styles.readOnlyText}>
          {user?.email || ''}
        </Text>
      </View>

      <Text style={styles.helperText}>
        Email is read-only in the current
        authentication implementation.
      </Text>

      <Text style={styles.label}>
        User ID
      </Text>

      <View style={styles.readOnlyBox}>
        <Text style={styles.uidText}>
          {user?.uid || ''}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          saving && styles.disabledButton,
        ]}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving
            ? 'Saving...'
            : 'Save Profile'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={onOpenSettings}
      >
        <Text style={styles.settingsButtonText}>
          Settings
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 40,
    backgroundColor: colors.background,
  },

  backButton: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    marginLeft: -6,
},

  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary || '#111827',
    marginBottom: 24,
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: colors.primary || '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary || '#111827',
    marginBottom: 8,
    marginTop: 14,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: colors.textPrimary || '#111827',
  },

  readOnlyBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },

  readOnlyText: {
    fontSize: 15,
    color: colors.textPrimary || '#111827',
  },

  uidText: {
    fontSize: 12,
    color: colors.textSecondary || '#6B7280',
  },

  helperText: {
    color: colors.textSecondary || '#6B7280',
    fontSize: 12,
    marginTop: 6,
  },

  saveButton: {
    backgroundColor: colors.primary || '#3B82F6',
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 30,
  },

  saveButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },

  settingsButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 12,
  },

  settingsButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: colors.textPrimary || '#111827',
  },
});