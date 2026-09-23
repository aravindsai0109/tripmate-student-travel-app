import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import colors from '../theme/colors';

export default function MyTripsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Trips
      </Text>

      <Text style={styles.text}>
        Your confirmed trips will appear here
        after RSVP integration.
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
    color: colors.textSecondary,
    textAlign: 'center',
  },
});