import React, {
  useEffect,
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
  Modal,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import colors from '../theme/colors';
import { getTrips } from '../services/tripService';

import TripCard from '../components/TripCard';
import CategoryChip from '../components/CategoryChip';

import { useFavorites } from '../context/FavoritesContext';

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
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [activeCategory, setActiveCategory] =
    useState('All');

  const [search, setSearch] =
    useState('');

  const [filterVisible, setFilterVisible] =
    useState(false);

  const [priceFilter, setPriceFilter] =
    useState('All');

  const {
    isSaved,
    toggleSavedTrip,
  } = useFavorites();

  useEffect(() => {
  const loadTrips = async () => {
    try {
      setLoading(true);
      setLoadError('');

      const firestoreTrips = await getTrips();

      setTrips(firestoreTrips);
    } catch (error) {
      console.error(
        'Failed to load trips:',
        error
      );

      setLoadError(
        'Unable to load trips. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  loadTrips();
}, []);

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

      let priceMatch = true;

      if (priceFilter === 'Under $50') {
        priceMatch = trip.price < 50;
      }

      if (priceFilter === '$50 - $75') {
        priceMatch =
          trip.price >= 50 &&
          trip.price <= 75;
      }

      if (priceFilter === 'Above $75') {
        priceMatch = trip.price > 75;
      }

      return (
        categoryMatch &&
        searchMatch &&
        priceMatch
      );
    });
}, [
  trips,
  activeCategory,
  search,
  priceFilter,
]);

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
              onPress={() =>
                navigation.navigate(
                  'Notifications'
                )
              }
            >
              <Ionicons
                name="notifications-outline"
                size={23}
                color={colors.text}
              />

              <View style={styles.notificationDot} />
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
              onPress={() =>
                setFilterVisible(true)
              }
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

          {priceFilter !== 'All' && (
            <View style={styles.activeFilterRow}>
              <Text style={styles.activeFilterText}>
                Price filter: {priceFilter}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setPriceFilter('All')
                }
              >
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Popular Destinations
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  'AllTrips'
                )
              }
            >
              <Text style={styles.seeAll}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.noResults}>
              <Ionicons
                name="cloud-download-outline"
                size={32}
                color={colors.primary}
              />

              <Text style={styles.noResultsTitle}>
                Loading destinations...
              </Text>
            </View>
          ) : loadError ? (
            <View style={styles.noResults}>
              <Ionicons
                name="alert-circle-outline"
                size={32}
                color={colors.textSecondary}
              />

              <Text style={styles.noResultsTitle}>
                Unable to load destinations
              </Text>

              <Text style={styles.noResultsText}>
                {loadError}
              </Text>
            </View>
          ) : filteredTrips.length > 0 ? (
            <FlatList
              horizontal
              data={filteredTrips}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TripCard
                  trip={item}
                  saved={isSaved(item.id)}
                  onToggleSaved={toggleSavedTrip}
                  onPress={() =>
                    navigation.navigate(
                      'TripDetails',
                      { trip: item }
                    )
                  }
                />
              )}
            />
          ) : (
            <View style={styles.noResults}>
              <Ionicons
                name="search-outline"
                size={32}
                color={colors.textSecondary}
              />

              <Text style={styles.noResultsTitle}>
                No destinations found
              </Text>

              <Text style={styles.noResultsText}>
                Try another search or filter.
              </Text>
            </View>
          )}

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

      <Modal
        visible={filterVisible}
        animationType="slide"
        transparent
        onRequestClose={() =>
          setFilterVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Filter Trips
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setFilterVisible(false)
                }
              >
                <Ionicons
                  name="close"
                  size={25}
                  color={colors.text}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.filterLabel}>
              Price Range
            </Text>

            {[
              'All',
              'Under $50',
              '$50 - $75',
              'Above $75',
            ].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.filterOption,
                  priceFilter === option &&
                    styles.selectedFilterOption,
                ]}
                onPress={() =>
                  setPriceFilter(option)
                }
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    priceFilter === option &&
                      styles.selectedFilterText,
                  ]}
                >
                  {option}
                </Text>

                {priceFilter === option && (
                  <Ionicons
                    name="checkmark-circle"
                    size={21}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() =>
                setFilterVisible(false)
              }
            >
              <Text style={styles.applyButtonText}>
                Apply Filter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  notificationDot: {
    position: 'absolute',
    right: 8,
    top: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: colors.white,
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

  activeFilterRow: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  activeFilterText: {
    color: colors.primaryDark,
    fontWeight: '700',
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

  noResults: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noResultsTitle: {
    fontWeight: '800',
    fontSize: 17,
    marginTop: 12,
  },

  noResultsText: {
    color: colors.textSecondary,
    marginTop: 5,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },

  filterModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 35,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },

  filterLabel: {
    marginTop: 25,
    marginBottom: 10,
    color: colors.textSecondary,
    fontWeight: '700',
  },

  filterOption: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  selectedFilterOption: {
    backgroundColor: colors.primaryLight,
  },

  filterOptionText: {
    color: colors.text,
  },

  selectedFilterText: {
    color: colors.primaryDark,
    fontWeight: '800',
  },

  applyButton: {
    marginTop: 18,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 17,
    alignItems: 'center',
  },

  applyButtonText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 16,
  },
});