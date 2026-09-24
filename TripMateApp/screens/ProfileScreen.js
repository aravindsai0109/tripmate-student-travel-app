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

import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ onBack }) {
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
      >
        <Text style={styles.backText}>
          ← Back
        </Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 24,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },

  avatarText: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },

  readOnlyBox: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#f4f4f4',
  },

  readOnlyText: {
    fontSize: 16,
  },

  uidText: {
    fontSize: 13,
  },

  helperText: {
    color: '#777777',
    fontSize: 12,
    marginTop: 6,
  },

  saveButton: {
    backgroundColor: '#222222',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },

  disabledButton: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});