import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import colors from '../theme/colors';

export default function BookingScreen({
  route,
  navigation,
}) {
  const { trip } = route.params;

  const serviceFee = 5;
  const total = trip.price + serviceFee;

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="chevron-back"
            size={25}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Reservation
        </Text>

        <View style={{ width: 25 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.tripCard}>
          <Image
            source={{ uri: trip.image }}
            style={styles.thumbnail}
          />

          <View style={styles.tripInfo}>
            <Text style={styles.tripTitle}>
              {trip.title}
            </Text>

            <Text style={styles.destination}>
              {trip.destination}
            </Text>

            <Text style={styles.price}>
              From ${trip.price} / person
            </Text>
          </View>
        </View>

        <ReservationRow
          icon="calendar-outline"
          label="Trip Date"
          value={trip.date}
        />

        <ReservationRow
          icon="location-outline"
          label="Meeting Point"
          value={trip.meetingPoint}
        />

        <ReservationRow
          icon="people-outline"
          label="Guests"
          value="1 Student"
        />

        <Text style={styles.sectionTitle}>
          Price Summary
        </Text>

        <View style={styles.summaryCard}>
          <SummaryRow
            label="Trip price"
            value={`$${trip.price}`}
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

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() =>
            Alert.alert(
              'Frontend completed',
              'RSVP database integration will be connected by the backend team member.'
            )
          }
        >
          <Text style={styles.confirmText}>
            Confirm RSVP
          </Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Demo interface only. Actual RSVP
          persistence will be integrated with
          Firebase.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function ReservationRow({
  icon,
  label,
  value,
}) {
  return (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Ionicons
          name={icon}
          size={20}
          color={colors.primary}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>
          {label}
        </Text>

        <Text style={styles.rowValue}>
          {value}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={19}
        color={colors.textSecondary}
      />
    </View>
  );
}

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
    backgroundColor: colors.background,
  },

  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },

  container: {
    paddingHorizontal: 20,
  },

  tripCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    marginTop: 10,
  },

  thumbnail: {
    width: 92,
    height: 82,
    borderRadius: 15,
  },

  tripInfo: {
    flex: 1,
    marginLeft: 13,
    justifyContent: 'center',
  },

  tripTitle: {
    fontWeight: '800',
    fontSize: 15,
    color: colors.text,
  },

  destination: {
    marginTop: 5,
    color: colors.textSecondary,
    fontSize: 12,
  },

  price: {
    marginTop: 7,
    color: colors.primary,
    fontWeight: '700',
  },

  row: {
    minHeight: 69,
    marginTop: 13,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  rowLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },

  rowValue: {
    marginTop: 3,
    color: colors.text,
    fontWeight: '700',
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },

  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },

  summaryLabel: {
    color: colors.textSecondary,
  },

  summaryValue: {
    color: colors.text,
  },

  bold: {
    fontWeight: '800',
    fontSize: 16,
    color: colors.text,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },

  confirmButton: {
    backgroundColor: colors.primary,
    marginTop: 25,
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: 'center',
  },

  confirmText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },

  note: {
    marginTop: 10,
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
});