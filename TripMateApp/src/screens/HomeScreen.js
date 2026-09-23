import React, {
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import colors from '../theme/colors';
import trips from '../data/trips';

import TripCard from '../components/TripCard';
import CategoryChip from '../components/CategoryChip';

const categories = [
  'All',
  'Beach',
  'Mountain',
  'City',
  'Camping',
];

export default function HomeScreen({
  navigation,
}) {
  const [activeCategory, setActiveCategory] =
    useState('All');

  const [search, setSearch] =
    useState('');

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const categoryMatch =
        activeCategory === 'All' ||
        trip.category === activeCategory;

      const searchMatch =
        trip.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        trip.destination
          .toLowerCase()
          .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.locationLabel}>
                Current location
              </Text>

              <View style={styles.locationRow}>
                <Ionicons
                  name="location"
                  size={17}
                  color={colors.primary}
                />

                <Text style={styles.location}>
                  Sydney, Australia
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.notificationButton}
            >
              <Ionicons
                name="notifications-outline"
                size={23}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.heading}>
            Where will you travel
            {'\n'}today?
          </Text>

          <View style={styles.searchBox}>
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.textSecondary}
            />

            <TextInput
              placeholder="Search destinations"
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />

            <TouchableOpacity
              style={styles.filterButton}
            >
              <Ionicons
                name="options-outline"
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categories}
          >
            {categories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                active={
                  activeCategory === category
                }
                onPress={() =>
                  setActiveCategory(category)
                }
              />
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Popular Destinations
            </Text>

            <TouchableOpacity>
              <Text style={styles.seeAll}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={filteredTrips}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TripCard
                trip={item}
                onPress={() =>
                  navigation.navigate(
                    'TripDetails',
                    { trip: item }
                  )
                }
              />
            )}
          />

          <View style={styles.exploreBox}>
            <View>
              <Text style={styles.exploreTitle}>
                Weekend Escape
              </Text>

              <Text style={styles.exploreText}>
                Discover student-friendly
                trips for your next break.
              </Text>
            </View>

            <View style={styles.exploreIcon}>
              <Ionicons
                name="airplane"
                size={28}
                color={colors.primary}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  locationLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  location: {
    marginLeft: 5,
    fontWeight: '700',
    color: colors.text,
  },

  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '800',
    color: colors.text,
    marginTop: 27,
  },

  searchBox: {
    height: 58,
    backgroundColor: colors.white,
    borderRadius: 18,
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 17,
  },

  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 15,
    color: colors.text,
  },

  filterButton: {
    width: 44,
    height: 44,
    marginRight: 7,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categories: {
    marginTop: 20,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },

  seeAll: {
    color: colors.primary,
    fontWeight: '700',
  },

  exploreBox: {
    marginTop: 28,
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  exploreTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },

  exploreText: {
    color: colors.textSecondary,
    marginTop: 6,
    width: 220,
    lineHeight: 20,
  },

  exploreIcon: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});