import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import { useFavorites } from '../context/FavoritesContext';

import CommentSection from '../components/CommentSection';

import colors from '../theme/colors';

export default function TripDetailsScreen({
  route,
  navigation,
}) {
  const { trip } = route.params;

  const handleShare = async () => {
  try {
    await Share.share({
      title: trip.title,
      message:
        `Check out ${trip.title} on TripMate!\n\n` +
        `Destination: ${trip.destination}\n` +
        `Date: ${trip.date}\n` +
        `Price: $${trip.price} per person\n\n` +
        `Explore student adventures with TripMate.`,
    });
  } catch (error) {
    console.log('Share error:', error);
  }
};

  const {
  isSaved,
  toggleSavedTrip,
} = useFavorites();

const saved = isSaved(trip.id);

  return (
    <View style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={{ uri: trip.image }}
          style={styles.hero}
        >
          <View style={styles.heroOverlay} />

          <View style={styles.topControls}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() =>
                navigation.goBack()
              }
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color={colors.white}
              />
            </TouchableOpacity>

            <View style={styles.rightControls}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => toggleSavedTrip(trip)}
            >
              <Ionicons
                name={saved ? 'heart' : 'heart-outline'}
                size={21}
                color={saved ? '#EF4444' : colors.white}
              />
            </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.circleButton,
                  { marginLeft: 10 },
                ]}
                onPress={handleShare}
              >
                <Ionicons
                  name="share-outline"
                  size={21}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                {trip.title}
              </Text>

              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={16}
                  color={colors.textSecondary}
                />

                <Text style={styles.location}>
                  {trip.destination}
                </Text>
              </View>
            </View>

            <View style={styles.rating}>
              <Ionicons
                name="star"
                size={14}
                color="#F59E0B"
              />

              <Text style={styles.ratingText}>
                {trip.rating}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            About This Trip
          </Text>

          <Text style={styles.description}>
            {trip.description}
          </Text>

          <View style={styles.featureRow}>
            <Feature
              icon="calendar-outline"
              title={trip.date}
              subtitle="Date"
            />

            <Feature
              icon="time-outline"
              title={trip.duration}
              subtitle="Duration"
            />

            <Feature
              icon="people-outline"
              title={`${trip.capacity}`}
              subtitle="Students"
            />
          </View>

          <Text style={styles.sectionTitle}>
            Trip Information
          </Text>

          <View style={styles.infoCard}>
            <InfoRow
              icon="location-outline"
              label="Meeting point"
              value={trip.meetingPoint}
            />

            <InfoRow
              icon="walk-outline"
              label="Difficulty"
              value={trip.difficulty}
            />

            <InfoRow
              icon="cash-outline"
              label="Price"
              value={`$${trip.price} / person`}
              last
            />
          </View>

          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() =>
              navigation.navigate(
                'Booking',
                { trip }
              )
            }
          >
            <Text style={styles.reserveText}>
              Reserve Your Spot
            </Text>
          </TouchableOpacity>

          <CommentSection
            tripId={trip.id}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function Feature({
  icon,
  title,
  subtitle,
}) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureIcon}>
        <Ionicons
          name={icon}
          size={21}
          color={colors.primary}
        />
      </View>

      <Text
        style={styles.featureTitle}
        numberOfLines={1}
      >
        {title}
      </Text>

      <Text style={styles.featureSubtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
  last,
}) {
  return (
    <View
      style={[
        styles.infoRow,
        last && { borderBottomWidth: 0 },
      ]}
    >
      <Ionicons
        name={icon}
        size={20}
        color={colors.primary}
      />

      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>
          {label}
        </Text>

        <Text style={styles.infoValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },

  hero: {
    height: 360,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },

  topControls: {
    marginTop: 55,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rightControls: {
    flexDirection: 'row',
  },

  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.30)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    backgroundColor: colors.background,
    marginTop: -28,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 22,
    paddingBottom: 40,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: colors.text,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  location: {
    marginLeft: 5,
    color: colors.textSecondary,
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 15,
  },

  ratingText: {
    marginLeft: 4,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    marginTop: 25,
    marginBottom: 10,
    color: colors.text,
  },

  description: {
    color: colors.textSecondary,
    lineHeight: 22,
  },

  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },

  feature: {
    width: '31%',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 15,
    borderRadius: 18,
  },

  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  featureTitle: {
    marginTop: 8,
    fontWeight: '700',
    fontSize: 12,
    color: colors.text,
  },

  featureSubtitle: {
    marginTop: 3,
    fontSize: 11,
    color: colors.textSecondary,
  },

  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 18,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  infoText: {
    marginLeft: 13,
  },

  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  infoValue: {
    marginTop: 2,
    fontWeight: '700',
    color: colors.text,
  },

  reserveButton: {
    backgroundColor: colors.primary,
    marginTop: 28,
    paddingVertical: 17,
    borderRadius: 18,
    alignItems: 'center',
  },

  reserveText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});