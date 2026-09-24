import React, { useState, useMemo } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import trips from '../data/trips';
import TripCard from '../components/TripCard';
import colors from '../theme/colors';

import { useFavorites } from '../context/FavoritesContext';

export default function AllTripsScreen({
  navigation,
}) {
  const [search, setSearch] = useState('');

  const {
    isSaved,
    toggleSavedTrip,
  } = useFavorites();

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) =>
      trip.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      trip.destination
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      trip.category
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          All Destinations
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.textSecondary}
        />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search all destinations"
          style={styles.input}
        />
      </View>

    <FlatList
    data={filteredTrips}
    keyExtractor={(item) => item.id}

    numColumns={2}

    showsVerticalScrollIndicator={false}

    columnWrapperStyle={{
        justifyContent: 'space-between',
    }}

    contentContainerStyle={{
        paddingHorizontal: 20,
        paddingBottom: 30,
    }}

    renderItem={({ item }) => (
        <View style={{ marginBottom: 16 }}>
        <TripCard
            trip={item}
            variant="grid"
            saved={isSaved(item.id)}
            onToggleSaved={toggleSavedTrip}
            onPress={() =>
            navigation.navigate(
                'TripDetails',
                { trip: item }
            )
            }
        />
        </View>
    )}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    height: 58,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },

  searchBox: {
    marginHorizontal: 20,
    marginVertical: 12,
    height: 54,
    borderRadius: 17,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  list: {
    padding: 20,
    alignItems: 'center',
  },

  cardWrapper: {
    marginBottom: 20,
  },
});