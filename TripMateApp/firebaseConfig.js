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
  apiKey: "AIzaSyDjyC8Q1dgkxDBM9gqP93q1f-2ivlfY_Y4",
  authDomain: "tripmate-student-travel-app.firebaseapp.com",
  projectId: "tripmate-student-travel-app",
  storageBucket: "tripmate-student-travel-app.firebasestorage.app",
  messagingSenderId: "874309850640",
  appId: "1:874309850640:web:928e2ba57a0c82cad69c95"
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