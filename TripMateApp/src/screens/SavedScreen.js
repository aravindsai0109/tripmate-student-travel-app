import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import colors from '../theme/colors';

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Saved Trips
      </Text>

      <Text style={styles.text}>
        Favourite destinations will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
  },

  text: {
    marginTop: 10,
    color: colors.textSecondary,
  },
});