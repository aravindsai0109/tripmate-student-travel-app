import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDjyC8Q1dgkxDBM9gqP93q1f-2ivlfY_Y4",
  authDomain: "tripmate-student-travel-app.firebaseapp.com",
  projectId: "tripmate-student-travel-app",
  storageBucket: "tripmate-student-travel-app.firebasestorage.app",
  messagingSenderId: "874309850640",
  appId: "1:874309850640:web:928e2ba57a0c82cad69c95"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };