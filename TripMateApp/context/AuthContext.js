import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

import { auth } from '../firebaseConfig';

const AuthContext = createContext();

const formatUser = (firebaseUser) => {
  if (!firebaseUser) {
    return null;
  }

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    emailVerified: firebaseUser.emailVerified,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(formatUser(firebaseUser));
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const register = async (name, email, password) => {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

    await updateProfile(userCredential.user, {
      displayName: name.trim(),
    });

    await userCredential.user.reload();

    setUser(formatUser(auth.currentUser));

    return userCredential;
  };

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateDisplayName = async (newName) => {
    if (!auth.currentUser) {
      throw new Error('No authenticated user.');
    }

    const trimmedName = newName.trim();

    if (!trimmedName) {
      throw new Error('Name cannot be empty.');
    }

    await updateProfile(auth.currentUser, {
      displayName: trimmedName,
    });

    await auth.currentUser.reload();

    setUser(formatUser(auth.currentUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateDisplayName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};