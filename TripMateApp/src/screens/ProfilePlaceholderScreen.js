import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import colors from '../theme/colors';

export default function ProfilePlaceholderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Profile
      </Text>

      <Text style={styles.text}>
        Profile functionality will be integrated
        by the authentication team member.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
  },

  text: {
    marginTop: 10,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});