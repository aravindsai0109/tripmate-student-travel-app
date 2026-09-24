import {
  doc,
  runTransaction,
  serverTimestamp,
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