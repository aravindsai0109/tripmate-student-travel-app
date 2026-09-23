import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

const STORAGE_KEY = 'tripmate_saved_trips';

export function FavoritesProvider({
  children,
}) {
  const [savedTrips, setSavedTrips] =
    useState([]);

  const [loaded, setLoaded] =
    useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (loaded) {
      saveFavorites();
    }
  }, [savedTrips, loaded]);

  const loadFavorites = async () => {
    try {
      const stored =
        await AsyncStorage.getItem(
          STORAGE_KEY
        );

      if (stored) {
        setSavedTrips(
          JSON.parse(stored)
        );
      }
    } catch (error) {
      console.log(
        'Error loading favourites:',
        error
      );
    } finally {
      setLoaded(true);
    }
  };

  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedTrips)
      );
    } catch (error) {
      console.log(
        'Error saving favourites:',
        error
      );
    }
  };

  const isSaved = (tripId) => {
    return savedTrips.some(
      (item) =>
        String(item.id) ===
        String(tripId)
    );
  };

  const toggleSavedTrip = (trip) => {
    setSavedTrips(
      (currentTrips) => {
        const alreadySaved =
          currentTrips.some(
            (item) =>
              String(item.id) ===
              String(trip.id)
          );

        if (alreadySaved) {
          return currentTrips.filter(
            (item) =>
              String(item.id) !==
              String(trip.id)
          );
        }

        return [
          ...currentTrips,
          trip,
        ];
      }
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        savedTrips,
        isSaved,
        toggleSavedTrip,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context =
    useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites must be used inside FavoritesProvider'
    );
  }

  return context;
}