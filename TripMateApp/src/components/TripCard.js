import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function TripCard({
  trip,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <ImageBackground
        source={{ uri: trip.image }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.darkOverlay} />

        <TouchableOpacity style={styles.heartButton}>
          <Ionicons
            name="heart-outline"
            size={20}
            color={colors.white}
          />
        </TouchableOpacity>

        <View style={styles.rating}>
          <Ionicons
            name="star"
            size={13}
            color="#FBBF24"
          />

          <Text style={styles.ratingText}>
            {trip.rating}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {trip.title}
          </Text>

          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={15}
              color={colors.white}
            />

            <Text style={styles.location}>
              {trip.destination}
            </Text>
          </View>

          <Text style={styles.price}>
            From ${trip.price}
            <Text style={styles.perPerson}>
              {' '} / person
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 245,
    height: 320,
    marginRight: 16,
    borderRadius: 26,
    overflow: 'hidden',
  },

  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  imageStyle: {
    borderRadius: 26,
  },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },

  heartButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rating: {
    position: 'absolute',
    left: 15,
    top: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '700',
  },

  content: {
    padding: 18,
  },

  title: {
    color: colors.white,
    fontSize: 21,
    fontWeight: '800',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  location: {
    color: colors.white,
    marginLeft: 4,
    fontSize: 13,
  },

  price: {
    marginTop: 10,
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  perPerson: {
    fontWeight: '400',
    fontSize: 12,
  },
});