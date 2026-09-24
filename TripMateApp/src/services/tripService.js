import {
  collection,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';

import { db } from '../../firebaseConfig';

/**
 * Load all TripMate trips from Cloud Firestore.
 */
export const getTrips = async () => {
  try {
    const snapshot = await getDocs(
      collection(db, 'trips')
    );

    const trips = snapshot.docs.map((tripDoc) => ({
      id: tripDoc.id,
      ...tripDoc.data(),
    }));

    // Keep the same order as the existing local dataset.
    trips.sort(
      (a, b) => Number(a.id) - Number(b.id)
    );

    return trips;
  } catch (error) {
    console.error(
      'Error loading trips from Firestore:',
      error
    );

    throw error;
  }
};

/**
 * Load one trip using its Firestore document ID.
 */
export const getTripById = async (tripId) => {
  try {
    const tripRef = doc(
      db,
      'trips',
      String(tripId)
    );

    const snapshot = await getDoc(tripRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error(
      'Error loading trip from Firestore:',
      error
    );

    throw error;
  }
};