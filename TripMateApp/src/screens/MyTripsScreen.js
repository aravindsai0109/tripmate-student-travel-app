import React, {
  useCallback,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  useFocusEffect,
} from '@react-navigation/native';

import colors from '../theme/colors';

import {
  auth,
} from '../../firebaseConfig';

import {
  getUserRSVPs,
  cancelRSVP,
} from '../services/rsvpService';

import {
  getTripById,
} from '../services/tripService';

export default function MyTripsScreen({
  navigation,
}) {
  const [joinedTrips, setJoinedTrips] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [loadError, setLoadError] =
    useState('');

  const [cancellingId, setCancellingId] =
    useState(null);

  const loadMyTrips = useCallback(
    async () => {
      const user = auth.currentUser;

      if (!user) {
        setJoinedTrips([]);
        setLoading(false);
        setLoadError(
          'Please log in to view your trips.'
        );

        return;
      }

      try {
        setLoading(true);
        setLoadError('');

        const rsvps =
          await getUserRSVPs(user.uid);

        const combinedTrips =
          await Promise.all(
            rsvps.map(async (rsvp) => {
              const trip =
                await getTripById(
                  rsvp.tripId
                );

              if (!trip) {
                return null;
              }

              return {
                ...trip,
                rsvpId: rsvp.id,
                guestCount:
                  rsvp.guestCount,
                totalPrice:
                  rsvp.totalPrice,
                status:
                  rsvp.status,
                createdAt:
                  rsvp.createdAt,
              };
            })
          );

        setJoinedTrips(
          combinedTrips.filter(Boolean)
        );
      } catch (error) {
        console.error(
          'My Trips load error:',
          error
        );

        setLoadError(
          'Unable to load your reserved trips.'
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useFocusEffect(
    useCallback(() => {
      loadMyTrips();
    }, [loadMyTrips])
  );

  const confirmCancellation = (item) => {
    Alert.alert(
      'Cancel Reservation',
      `Are you sure you want to cancel your reservation for ${item.title}?`,
      [
        {
          text: 'Keep Reservation',
          style: 'cancel',
        },
        {
          text: 'Cancel RSVP',
          style: 'destructive',
          onPress: () =>
            handleCancel(item),
        },
      ]
    );
  };

  const handleCancel = async (item) => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert(
        'Login required',
        'Please log in again.'
      );

      return;
    }

    try {
      setCancellingId(item.rsvpId);

      await cancelRSVP({
        rsvpId: item.rsvpId,
        userId: user.uid,
      });

      Alert.alert(
        'Reservation Cancelled',
        `Your reservation for ${item.title} has been cancelled.`
      );

      await loadMyTrips();
    } catch (error) {
      console.error(
        'Cancellation error:',
        error
      );

      Alert.alert(
        'Cancellation failed',
        error.message ||
          'Unable to cancel this reservation.'
      );
    } finally {
      setCancellingId(null);
    }
  };

  const renderTrip = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <View style={styles.cardContent}>
        <Text
          style={styles.tripTitle}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <View style={styles.detailRow}>
          <Ionicons
            name="location-outline"
            size={15}
            color={colors.textSecondary}
          />

          <Text style={styles.detailText}>
            {item.destination}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons
            name="calendar-outline"
            size={15}
            color={colors.textSecondary}
          />

          <Text style={styles.detailText}>
            {item.date}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons
            name="people-outline"
            size={15}
            color={colors.textSecondary}
          />

          <Text style={styles.detailText}>
            {item.guestCount}{' '}
            {item.guestCount === 1
              ? 'Student'
              : 'Students'}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.total}>
            Total: ${item.totalPrice}
          </Text>

          <TouchableOpacity
            style={[
              styles.cancelButton,
              cancellingId ===
                item.rsvpId &&
                styles.disabledButton,
            ]}
            disabled={
              cancellingId ===
              item.rsvpId
            }
            onPress={() =>
              confirmCancellation(item)
            }
          >
            <Text
              style={styles.cancelText}
            >
              {cancellingId ===
              item.rsvpId
                ? 'Cancelling...'
                : 'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.page}>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

          <Text style={styles.loadingText}>
            Loading your trips...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>
          My Trips
        </Text>
      </View>

      {loadError ? (
        <View style={styles.center}>
          <Ionicons
            name="alert-circle-outline"
            size={40}
            color={colors.textSecondary}
          />

          <Text style={styles.emptyTitle}>
            Unable to load trips
          </Text>

          <Text style={styles.emptyText}>
            {loadError}
          </Text>
        </View>
      ) : (
        <FlatList
          data={joinedTrips}
          keyExtractor={(item) =>
            item.rsvpId
          }
          renderItem={renderTrip}
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            joinedTrips.length === 0
              ? styles.emptyList
              : styles.list
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Ionicons
                name="airplane-outline"
                size={46}
                color={
                  colors.textSecondary
                }
              />

              <Text
                style={styles.emptyTitle}
              >
                No trips yet
              </Text>

              <Text
                style={styles.emptyText}
              >
                Trips you reserve will
                appear here.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor:
      colors.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  emptyList: {
    flexGrow: 1,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 12,
    color: colors.textSecondary,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },

  emptyText: {
    marginTop: 7,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 20,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 18,
  },

  image: {
    width: '100%',
    height: 165,
  },

  cardContent: {
    padding: 16,
  },

  tripTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 9,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  detailText: {
    marginLeft: 6,
    color: colors.textSecondary,
    fontSize: 13,
  },

  bottomRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  total: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 15,
  },

  cancelButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
  },

  cancelText: {
    color: '#DC2626',
    fontWeight: '700',
  },

  disabledButton: {
    opacity: 0.6,
  },
});