import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from 'firebase/firestore';


import { db } from '../../firebaseConfig';

/**
 * Create an RSVP safely.
 *
 * Uses a transaction so:
 * 1. The same user cannot RSVP twice.
 * 2. Capacity cannot be exceeded.
 * 3. reservedSpots and RSVP are updated together.
 */
export const createRSVP = async ({
  userId,
  tripId,
  guestCount,
  serviceFee,
}) => {
  if (!userId) {
    throw new Error(
      'You must be logged in to reserve a trip.'
    );
  }

  if (!tripId) {
    throw new Error('Trip information is missing.');
  }

  if (
    !Number.isInteger(guestCount) ||
    guestCount < 1
  ) {
    throw new Error(
      'Guest count must be at least 1.'
    );
  }

  const tripRef = doc(
    db,
    'trips',
    String(tripId)
  );

  // Deterministic ID prevents duplicate RSVP
  // records for the same user + trip.
  const rsvpId =
    `${userId}_${String(tripId)}`;

  const rsvpRef = doc(
    db,
    'rsvps',
    rsvpId
  );

  return runTransaction(
    db,
    async (transaction) => {
      const tripSnapshot =
        await transaction.get(tripRef);

      if (!tripSnapshot.exists()) {
        throw new Error(
          'This trip no longer exists.'
        );
      }

      const existingRSVP =
        await transaction.get(rsvpRef);

      if (existingRSVP.exists()) {
        throw new Error(
          'You have already reserved this trip.'
        );
      }

      const tripData =
        tripSnapshot.data();

      const capacity =
        Number(tripData.capacity) || 0;

      const reservedSpots =
        Number(tripData.reservedSpots) || 0;

      const availableSpots =
        capacity - reservedSpots;

      if (guestCount > availableSpots) {
        throw new Error(
          availableSpots <= 0
            ? 'This trip is fully booked.'
            : `Only ${availableSpots} spot${
                availableSpots === 1 ? '' : 's'
              } remaining.`
        );
      }

      const tripPrice =
        Number(tripData.price) || 0;

      const subtotal =
        tripPrice * guestCount;

      const totalPrice =
        subtotal + serviceFee;

      transaction.set(rsvpRef, {
        userId,
        tripId: String(tripId),
        guestCount,
        tripPrice,
        serviceFee,
        totalPrice,
        status: 'confirmed',
        createdAt: serverTimestamp(),
      });

      transaction.update(tripRef, {
        reservedSpots:
          reservedSpots + guestCount,
      });

      return {
        rsvpId,
        guestCount,
        totalPrice,
      };
    }
  );
};

/**
 * Get all confirmed RSVPs belonging to one user.
 */
export const getUserRSVPs = async (userId) => {
  if (!userId) {
    return [];
  }

  try {
    const rsvpQuery = query(
      collection(db, 'rsvps'),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(rsvpQuery);

    return snapshot.docs.map((rsvpDoc) => ({
      id: rsvpDoc.id,
      ...rsvpDoc.data(),
    }));
  } catch (error) {
    console.error(
      'Error loading user RSVPs:',
      error
    );

    throw error;
  }
};

/**
 * Cancel an RSVP and return its reserved
 * places back to the trip.
 */
export const cancelRSVP = async ({
  rsvpId,
  userId,
}) => {
  if (!rsvpId || !userId) {
    throw new Error(
      'Reservation information is missing.'
    );
  }

  const rsvpRef = doc(
    db,
    'rsvps',
    rsvpId
  );

  return runTransaction(
    db,
    async (transaction) => {
      const rsvpSnapshot =
        await transaction.get(rsvpRef);

      if (!rsvpSnapshot.exists()) {
        throw new Error(
          'This reservation no longer exists.'
        );
      }

      const rsvpData =
        rsvpSnapshot.data();

      if (rsvpData.userId !== userId) {
        throw new Error(
          'You cannot cancel another user’s reservation.'
        );
      }

      const tripRef = doc(
        db,
        'trips',
        String(rsvpData.tripId)
      );

      const tripSnapshot =
        await transaction.get(tripRef);

      if (!tripSnapshot.exists()) {
        throw new Error(
          'The trip linked to this reservation no longer exists.'
        );
      }

      const tripData =
        tripSnapshot.data();

      const currentReserved =
        Number(tripData.reservedSpots) || 0;

      const guestCount =
        Number(rsvpData.guestCount) || 0;

      const newReservedSpots =
        Math.max(
          0,
          currentReserved - guestCount
        );

      transaction.update(tripRef, {
        reservedSpots: newReservedSpots,
      });

      transaction.delete(rsvpRef);

      return {
        tripId: rsvpData.tripId,
        guestCount,
      };
    }
  );
};