import React from 'react';

import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../theme/colors';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri:
          'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.smallText}>
          EXPLORE. CONNECT. DISCOVER.
        </Text>

        <Text style={styles.title}>
          Travel With{'\n'}Confidence
        </Text>

        <Text style={styles.description}>
          Discover student adventures, weekend trips
          and unforgettable destinations with your
          community.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },

  content: {
    paddingHorizontal: 28,
    paddingBottom: 52,
  },

  smallText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    marginBottom: 10,
  },

  title: {
    color: colors.white,
    fontSize: 44,
    lineHeight: 48,
    fontWeight: '800',
  },

  description: {
    color: '#F3F4F6',
    marginTop: 14,
    fontSize: 15,
    lineHeight: 23,
  },

  button: {
    backgroundColor: colors.primary,
    marginTop: 28,
    paddingVertical: 17,
    alignItems: 'center',
    borderRadius: 18,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});