import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../../firebaseConfig';

const MAX_COMMENT_LENGTH = 500;

/**
 * Return the Firestore comments collection
 * for a specific TripMate trip.
 */
const getCommentsCollection = (
  tripId
) => {
  return collection(
    db,
    'trips',
    String(tripId),
    'comments'
  );
};

/**
 * Listen to comments for one trip in real time.
 *
 * Firestore structure:
 *
 * trips
 *   -> tripId
 *      -> comments
 *         -> commentId
 */
export const subscribeToTripComments = (
  tripId,
  onComments,
  onError
) => {
  if (!tripId) {
    onComments([]);

    return () => {};
  }

  const commentsQuery = query(
    getCommentsCollection(tripId),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(
    commentsQuery,
    (snapshot) => {
      const comments =
        snapshot.docs.map(
          (commentDoc) => ({
            id: commentDoc.id,
            ...commentDoc.data(),
          })
        );

      onComments(comments);
    },
    (error) => {
      console.error(
        'Real-time comments error:',
        error
      );

      if (onError) {
        onError(error);
      }
    }
  );

  return unsubscribe;
};

/**
 * Add a new comment to a trip.
 */
export const addTripComment = async ({
  tripId,
  user,
  text,
}) => {
  if (!tripId) {
    throw new Error(
      'Trip ID is missing.'
    );
  }

  if (!user?.uid) {
    throw new Error(
      'You must be signed in to comment.'
    );
  }

  const cleanText =
    String(text || '').trim();

  if (!cleanText) {
    throw new Error(
      'Comment cannot be empty.'
    );
  }

  if (
    cleanText.length >
    MAX_COMMENT_LENGTH
  ) {
    throw new Error(
      `Comment cannot exceed ${MAX_COMMENT_LENGTH} characters.`
    );
  }

  const userName =
    String(
      user.displayName || ''
    ).trim() ||
    'Student';

  const commentRef =
    await addDoc(
      getCommentsCollection(
        tripId
      ),
      {
        tripId:
          String(tripId),

        userId:
          user.uid,

        userName,

        text:
          cleanText,

        createdAt:
          serverTimestamp(),
      }
    );

  return commentRef.id;
};

export {
  MAX_COMMENT_LENGTH,
};