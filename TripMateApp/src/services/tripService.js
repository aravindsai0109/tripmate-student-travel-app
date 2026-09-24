import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
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

const validateTripData = (trip) => {
  const requiredTextFields = [
    'title',
    'destination',
    'category',
    'date',
    'duration',
    'meetingPoint',
    'difficulty',
    'image',
    'description',
  ];

  for (const field of requiredTextFields) {
    if (
      !trip[field] ||
      !String(trip[field]).trim()
    ) {
      throw new Error(
        `${field} is required.`
      );
    }
  }

  const price = Number(trip.price);
  const capacity = Number(trip.capacity);
  const rating = Number(trip.rating);

  if (
    !Number.isFinite(price) ||
    price <= 0
  ) {
    throw new Error(
      'Price must be greater than 0.'
    );
  }

  if (
    !Number.isInteger(capacity) ||
    capacity <= 0
  ) {
    throw new Error(
      'Capacity must be a whole number greater than 0.'
    );
  }

  if (
    !Number.isFinite(rating) ||
    rating < 0 ||
    rating > 5
  ) {
    throw new Error(
      'Rating must be between 0 and 5.'
    );
  }

  if (
    !String(trip.image)
      .trim()
      .startsWith('http')
  ) {
    throw new Error(
      'Image must be a valid web URL.'
    );
  }

  return {
    title: String(trip.title).trim(),
    destination:
      String(trip.destination).trim(),
    category:
      String(trip.category).trim(),
    date: String(trip.date).trim(),
    duration:
      String(trip.duration).trim(),
    meetingPoint:
      String(trip.meetingPoint).trim(),
    price,
    capacity,
    rating,
    reviews:
      String(trip.reviews || '0').trim(),
    difficulty:
      String(trip.difficulty).trim(),
    image:
      String(trip.image).trim(),
    description:
      String(trip.description).trim(),
  };
};

export const createTrip = async (
  tripData
) => {
  const cleanTrip =
    validateTripData(tripData);

  const tripId =
    Date.now().toString();

  const tripRef = doc(
    db,
    'trips',
    tripId
  );

  await setDoc(tripRef, {
    ...cleanTrip,

    reservedSpots: 0,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return {
    id: tripId,
    ...cleanTrip,
    reservedSpots: 0,
  };
};

export const updateTrip = async (
  tripId,
  tripData
) => {
  if (!tripId) {
    throw new Error(
      'Trip ID is missing.'
    );
  }

  const cleanTrip =
    validateTripData(tripData);

  const tripRef = doc(
    db,
    'trips',
    String(tripId)
  );

  const snapshot =
    await getDoc(tripRef);

  if (!snapshot.exists()) {
    throw new Error(
      'Trip does not exist.'
    );
  }

  const currentData =
    snapshot.data();

  const reservedSpots =
    Number(
      currentData.reservedSpots
    ) || 0;

  if (
    cleanTrip.capacity <
    reservedSpots
  ) {
    throw new Error(
      `Capacity cannot be lower than the ${reservedSpots} already reserved spots.`
    );
  }

  await updateDoc(tripRef, {
    ...cleanTrip,
    updatedAt: serverTimestamp(),
  });

  return {
    id: String(tripId),
    ...cleanTrip,
  };
};

export const deleteTrip = async (
  tripId
) => {
  if (!tripId) {
    throw new Error(
      'Trip ID is missing.'
    );
  }

  const tripRef = doc(
    db,
    'trips',
    String(tripId)
  );

  const snapshot =
    await getDoc(tripRef);

  if (!snapshot.exists()) {
    throw new Error(
      'Trip does not exist.'
    );
  }

  const tripData =
    snapshot.data();

  const reservedSpots =
    Number(
      tripData.reservedSpots
    ) || 0;

  if (reservedSpots > 0) {
    throw new Error(
      'This trip has active reservations and cannot be deleted.'
    );
  }

  await deleteDoc(tripRef);
};