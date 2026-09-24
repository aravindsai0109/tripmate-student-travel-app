import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  Ionicons,
} from '@expo/vector-icons';

import TripCard from '../components/TripCard';
import colors from '../theme/colors';

import {
  useFavorites,
} from '../context/FavoritesContext';

export default function SavedScreen({
  navigation,
}) {
  const {
    savedTrips,
    isSaved,
    toggleSavedTrip,
  } = useFavorites();

  return (
    <SafeAreaView style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>
            Saved Trips
          </Text>

          <Text style={styles.subtitle}>
            Your favourite destinations
          </Text>
        </View>
      </View>

      {/* EMPTY STATE */}
      {savedTrips.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="heart-outline"
              size={42}
              color={colors.primary}
            />
          </View>

          <Text style={styles.emptyTitle}>
            No saved destinations yet
          </Text>

          <Text style={styles.emptyText}>
            Tap the heart icon on a destination
            to save it here.
          </Text>
        </View>
      ) : (
        <>
          {/* SAVED COUNT */}
          <View style={styles.countContainer}>
            <Text style={styles.countText}>
              {savedTrips.length}{' '}
              {savedTrips.length === 1
                ? 'saved destination'
                : 'saved destinations'}
            </Text>
          </View>

          {/* TWO-COLUMN GRID */}
          <FlatList
            data={savedTrips}
            keyExtractor={(item) => item.id}
            numColumns={2}

            showsVerticalScrollIndicator={false}

            contentContainerStyle={
              styles.listContent
            }

            columnWrapperStyle={
              styles.columnWrapper
            }

            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <TripCard
                  trip={item}
                  variant="grid"
                  saved={isSaved(item.id)}
                  onToggleSaved={
                    toggleSavedTrip
                  }
                  onPress={() =>
                    navigation.navigate(
                      'TripDetails',
                      {
                        trip: item,
                      }
                    )
                  }
                />
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,

    // IMPORTANT:
    // DO NOT put paddingHorizontal here.
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },

  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 13,
    color: colors.textSecondary,
  },

  countContainer: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },

  countText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },

  cardWrapper: {
    marginBottom: 18,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 35,
    paddingBottom: 90,
  },

  emptyIcon: {
    width: 90,
    height: 90,
    borderRadius: 30,

    backgroundColor: colors.primaryLight,

    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTitle: {
    marginTop: 20,

    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
  },

  emptyText: {
    marginTop: 8,

    maxWidth: 270,

    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});