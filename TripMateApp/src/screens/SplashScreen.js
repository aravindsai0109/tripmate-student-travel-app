import React, {
  useEffect,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function SplashScreen({
  navigation,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Ionicons
          name="airplane"
          size={43}
          color={colors.primary}
        />
      </View>

      <Text style={styles.logoText}>
        TripMate
      </Text>

      <View style={styles.dots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoBox: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '800',
    marginTop: 16,
  },

  dots: {
    flexDirection: 'row',
    marginTop: 18,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginHorizontal: 4,
  },
});