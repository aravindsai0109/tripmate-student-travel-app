import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  View,
  useWindowDimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function TripCard({
  trip,
  onPress,
  saved = false,
  onToggleSaved,
  variant = 'large',
}) {
  const { width } = useWindowDimensions();

  const isGrid = variant === 'grid';

  const gridWidth = (width - 52) / 2;

  const isFavorite = saved === true;


  return (
    <TouchableOpacity
      style={[
        styles.card,
        isGrid
          ? {
              width: gridWidth,
              height: 255,
              marginRight: 0,
              borderRadius: 20,
            }
          : styles.largeCard,
      ]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <ImageBackground
        source={{ uri: trip.image }}
        style={[
          styles.image,
          isGrid && styles.gridImage,
        ]}
        imageStyle={[
          styles.imageStyle,
          isGrid && styles.gridImageStyle,
        ]}
      >
        {!isGrid && (
          <View style={styles.darkOverlay} />
        )}

        <TouchableOpacity
          style={[
            styles.heartButton,
            isGrid && styles.gridHeartButton,
          ]}
          activeOpacity={0.8}
          onPress={(event) => {
            event.stopPropagation();

            if (onToggleSaved) {
              onToggleSaved(trip);
            }
          }}
        >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={22}
          color={
            isFavorite
              ? '#FF3040'
              : isGrid
              ? '#374151'
              : '#FFFFFF'
          }
        />
        </TouchableOpacity>

        {!isGrid && (
          <>
            <View style={styles.ratingBadge}>
              <Ionicons
                name="star"
                size={13}
                color="#F59E0B"
              />

              <Text style={styles.ratingBadgeText}>
                {trip.rating}
              </Text>
            </View>

            <View style={styles.largeContent}>
              <Text style={styles.largeTitle}>
                {trip.title}
              </Text>

              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={15}
                  color="#FFFFFF"
                />

                <Text style={styles.largeLocation}>
                  {trip.destination}
                </Text>
              </View>

              <Text style={styles.largePrice}>
                From ${trip.price}
                <Text style={styles.perPerson}>
                  {' '} / person
                </Text>
              </Text>
            </View>
          </>
        )}

        {isGrid && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {trip.category}
            </Text>
          </View>
        )}
      </ImageBackground>

      {isGrid && (
        <View style={styles.gridContent}>
          <Text
            style={styles.gridTitle}
            numberOfLines={2}
          >
            {trip.title}
          </Text>

          <View style={styles.gridLocationRow}>
            <Ionicons
              name="location-outline"
              size={13}
              color={colors.textSecondary}
            />

            <Text
              style={styles.gridLocation}
              numberOfLines={1}
            >
              {trip.destination}
            </Text>
          </View>

          <View style={styles.gridBottomRow}>
            <View style={styles.gridRating}>
              <Ionicons
                name="star"
                size={13}
                color="#F59E0B"
              />

              <Text style={styles.gridRatingText}>
                {trip.rating}
              </Text>
            </View>

            <Text style={styles.gridPrice}>
              ${trip.price}
            </Text>
          </View>

          <Text style={styles.gridPerson}>
            per person
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  largeCard: {
    width: 245,
    height: 320,
    marginRight: 16,
    borderRadius: 26,
  },

  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  imageStyle: {
    borderRadius: 26,
  },

  gridImage: {
    height: 145,
    flex: 0,
  },

  gridImageStyle: {
    borderRadius: 0,
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

    backgroundColor: 'rgba(0,0,0,0.28)',

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 10,
  },

  gridHeartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,

    right: 9,
    top: 9,

    backgroundColor: 'rgba(255,255,255,0.95)',
  },

  ratingBadge: {
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

  ratingBadgeText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '700',
  },

  largeContent: {
    padding: 18,
  },

  largeTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  largeLocation: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontSize: 13,
  },

  largePrice: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  perPerson: {
    fontWeight: '400',
    fontSize: 12,
  },

  categoryBadge: {
    position: 'absolute',
    left: 9,
    bottom: 9,

    backgroundColor: 'rgba(255,255,255,0.93)',

    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 10,
  },

  categoryText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.text,
  },

  gridContent: {
    padding: 11,
  },

  gridTitle: {
    height: 39,

    fontSize: 14,
    lineHeight: 19,

    fontWeight: '800',
    color: colors.text,
  },

  gridLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 5,
  },

  gridLocation: {
    flex: 1,

    marginLeft: 3,

    fontSize: 10,
    color: colors.textSecondary,
  },

  gridBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 8,
  },

  gridRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  gridRatingText: {
    marginLeft: 3,

    fontSize: 11,
    fontWeight: '700',

    color: colors.text,
  },

  gridPrice: {
    fontSize: 15,
    fontWeight: '800',

    color: colors.primary,
  },

  gridPerson: {
    textAlign: 'right',

    fontSize: 8,
    color: colors.textSecondary,
  },
});