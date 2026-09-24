import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  Ionicons,
} from '@expo/vector-icons';

import colors from '../theme/colors';

import { auth } from '../../firebaseConfig';

import {
  createRSVP,
} from '../services/rsvpService';

export default function BookingScreen({
  route,
  navigation,
}) {
  const { trip } = route.params;

  const [guestCount, setGuestCount] =
    useState(1);

  const [submitting, setSubmitting] =
    useState(false);

  const serviceFee = 5;

  const tripSubtotal =
    trip.price * guestCount;

  const total =
    tripSubtotal + serviceFee;

  const increaseGuests = () => {
    if (guestCount < trip.capacity) {
      setGuestCount(
        (current) => current + 1
      );
    } else {
      Alert.alert(
        'Trip capacity reached',
        `This trip has a maximum capacity of ${trip.capacity} students.`
      );
    }
  };

  const decreaseGuests = () => {
    if (guestCount > 1) {
      setGuestCount(
        (current) => current - 1
      );
    }
  };

  const handleConfirmRSVP = async () => {
    if (submitting) {
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      Alert.alert(
        'Login required',
        'Please log in before reserving a trip.'
      );

      return;
    }

    try {
      setSubmitting(true);

      const result = await createRSVP({
        userId: user.uid,
        tripId: trip.id,
        guestCount,
        serviceFee,
      });

      Alert.alert(
        'Reservation Confirmed',
        `${result.guestCount} ${
          result.guestCount === 1
            ? 'student'
            : 'students'
        } reserved for ${trip.title}.\n\n` +
          `Total: $${result.totalPrice}`,
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error(
        'RSVP error:',
        error
      );

      Alert.alert(
        'Reservation failed',
        error.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Reservation
          </Text>

          <View style={{ width: 42 }} />
        </View>

        <View style={styles.container}>
          {/* SELECTED TRIP */}

          <View style={styles.tripCard}>
            <Image
              source={{
                uri: trip.image,
              }}
              style={styles.thumbnail}
            />

            <View style={styles.tripInfo}>
              <Text
                style={styles.tripTitle}
                numberOfLines={2}
              >
                {trip.title}
              </Text>

              <Text
                style={styles.destination}
              >
                {trip.destination}
              </Text>

              <Text style={styles.price}>
                From ${trip.price} / person
              </Text>
            </View>
          </View>

          {/* FIXED DATE */}

          <InfoRow
            icon="calendar-outline"
            label="Trip Date"
            value={trip.date}
          />

          {/* FIXED MEETING POINT */}

          <InfoRow
            icon="location-outline"
            label="Meeting Point"
            value={trip.meetingPoint}
          />

          {/* GUEST SELECTOR */}

          <View style={styles.guestCard}>
            <View style={styles.iconBox}>
              <Ionicons
                name="people-outline"
                size={22}
                color={colors.primary}
              />
            </View>

            <View style={styles.guestInfo}>
              <Text style={styles.rowLabel}>
                Guests
              </Text>

              <Text style={styles.rowValue}>
                {guestCount}{' '}
                {guestCount === 1
                  ? 'Student'
                  : 'Students'}
              </Text>
            </View>

            <View
              style={
                styles.guestControls
              }
            >
              <TouchableOpacity
                style={[
                  styles.guestButton,
                  guestCount === 1 &&
                    styles.disabledButton,
                ]}
                onPress={decreaseGuests}
                disabled={
                  guestCount === 1
                }
              >
                <Ionicons
                  name="remove"
                  size={20}
                  color={
                    guestCount === 1
                      ? '#9CA3AF'
                      : colors.primary
                  }
                />
              </TouchableOpacity>

              <Text
                style={
                  styles.guestNumber
                }
              >
                {guestCount}
              </Text>

              <TouchableOpacity
                style={
                  styles.guestButton
                }
                onPress={increaseGuests}
              >
                <Ionicons
                  name="add"
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* CAPACITY INFORMATION */}

          <Text style={styles.capacityText}>
            Maximum capacity:{' '}
            {trip.capacity} students
          </Text>

          {/* PRICE SUMMARY */}

          <Text style={styles.sectionTitle}>
            Price Summary
          </Text>

          <View style={styles.summaryCard}>
            <SummaryRow
              label={`Trip price × ${guestCount}`}
              value={`$${tripSubtotal}`}
            />

            <SummaryRow
              label="Service fee"
              value={`$${serviceFee}`}
            />

            <View style={styles.divider} />

            <SummaryRow
              label="Total"
              value={`$${total}`}
              bold
            />
          </View>

          {/* CONFIRM */}

          <TouchableOpacity
            style={[
              styles.confirmButton,
              submitting && styles.disabledConfirmButton,
            ]}
            onPress={handleConfirmRSVP}
            disabled={submitting}
          >
            <Text style={styles.confirmText}>
              {submitting
                ? 'Confirming...'
                : 'Confirm RSVP'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.note}>
            Your reservation will be securely saved
            to your TripMate account.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


/* FIXED INFORMATION ROW */

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Ionicons
          name={icon}
          size={22}
          color={colors.primary}
        />
      </View>

      <View style={styles.rowContent}>
        <Text style={styles.rowLabel}>
          {label}
        </Text>

        <Text style={styles.rowValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}


/* PRICE ROW */

function SummaryRow({
  label,
  value,
  bold,
}) {
  return (
    <View style={styles.summaryRow}>
      <Text
        style={[
          styles.summaryLabel,
          bold && styles.bold,
        ]}
      >
        {label}
      </Text>

      <Text
        style={[
          styles.summaryValue,
          bold && styles.bold,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor:
      colors.background,
  },

  header: {
    height: 65,

    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },

  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  tripCard: {
    backgroundColor:
      colors.white,

    borderRadius: 22,

    padding: 12,

    flexDirection: 'row',

    marginTop: 10,
    marginBottom: 10,
  },

  thumbnail: {
    width: 95,
    height: 90,

    borderRadius: 16,
  },

  tripInfo: {
    flex: 1,

    marginLeft: 14,

    justifyContent: 'center',
  },

  tripTitle: {
    fontWeight: '800',
    fontSize: 16,

    color: colors.text,
  },

  destination: {
    marginTop: 6,

    color:
      colors.textSecondary,

    fontSize: 12,
  },

  price: {
    marginTop: 7,

    color: colors.primary,

    fontSize: 13,
    fontWeight: '700',
  },

  row: {
    minHeight: 82,

    marginTop: 13,

    paddingHorizontal: 15,

    backgroundColor:
      colors.white,

    borderRadius: 20,

    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 45,
    height: 45,

    borderRadius: 14,

    backgroundColor:
      colors.primaryLight,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 13,
  },

  rowContent: {
    flex: 1,
  },

  rowLabel: {
    color:
      colors.textSecondary,

    fontSize: 12,

    fontWeight: '600',
  },

  rowValue: {
    marginTop: 4,

    color: colors.text,

    fontSize: 16,
    fontWeight: '800',
  },

  guestCard: {
    minHeight: 92,

    marginTop: 13,

    paddingHorizontal: 15,

    backgroundColor:
      colors.white,

    borderRadius: 20,

    flexDirection: 'row',
    alignItems: 'center',
  },

  guestInfo: {
    flex: 1,
  },

  guestControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  guestButton: {
    width: 38,
    height: 38,

    borderRadius: 12,

    backgroundColor:
      colors.primaryLight,

    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledButton: {
    backgroundColor: '#F3F4F6',
  },

  guestNumber: {
    minWidth: 35,

    textAlign: 'center',

    fontSize: 18,
    fontWeight: '800',

    color: colors.text,
  },

  capacityText: {
    marginTop: 9,
    marginLeft: 5,

    fontSize: 11,

    color:
      colors.textSecondary,
  },

  sectionTitle: {
    marginTop: 27,
    marginBottom: 11,

    fontSize: 20,
    fontWeight: '800',

    color: colors.text,
  },

  summaryCard: {
    backgroundColor:
      colors.white,

    borderRadius: 20,

    padding: 19,
  },

  summaryRow: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    paddingVertical: 8,
  },

  summaryLabel: {
    color:
      colors.textSecondary,

    fontSize: 14,
  },

  summaryValue: {
    color: colors.text,

    fontSize: 14,
  },

  divider: {
    height: 1,

    backgroundColor:
      colors.border,

    marginVertical: 10,
  },

  bold: {
    fontWeight: '800',

    fontSize: 17,

    color: colors.text,
  },

  confirmButton: {
    backgroundColor:
      colors.primary,

    marginTop: 27,

    borderRadius: 18,

    paddingVertical: 18,

    alignItems: 'center',
  },

  confirmText: {
    color: colors.white,

    fontSize: 16,
    fontWeight: '800',
  },

  note: {
    marginTop: 12,

    paddingHorizontal: 12,

    textAlign: 'center',

    color:
      colors.textSecondary,

    fontSize: 11,

    lineHeight: 17,
  },
  disabledConfirmButton: {
  opacity: 0.6,
  },
});