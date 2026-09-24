import {
  initializeApp,
  getApps,
  getApp,
} from 'firebase/app';

import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import {
  getFirestore,
} from 'firebase/firestore';

import ReactNativeAsyncStorage
  from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  // KEEP THE EXISTING VALUES FROM SAMIKSHA'S firebaseConfig
  apiKey: 'KEEP_EXISTING_VALUE',
  authDomain: 'KEEP_EXISTING_VALUE',
  projectId: 'KEEP_EXISTING_VALUE',
  storageBucket: 'KEEP_EXISTING_VALUE',
  messagingSenderId: 'KEEP_EXISTING_VALUE',
  appId: 'KEEP_EXISTING_VALUE',
};

const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(
      ReactNativeAsyncStorage
    ),
  });
} catch (error) {
  auth = getAuth(app);
}

const db = getFirestore(app);

export {
  app,
  auth,
  db,
};