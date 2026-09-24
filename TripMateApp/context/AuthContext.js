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

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import {
  auth,
  db,
} from '../firebaseConfig';

const AuthContext = createContext();

const formatUser = (
  firebaseUser,
  role = 'student'
) => {
  if (!firebaseUser) {
    return null;
  }

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    emailVerified: firebaseUser.emailVerified,
    role,
  };
};

const getUserWithRole = async (
  firebaseUser
) => {
  if (!firebaseUser) {
    return null;
  }

  const userRef = doc(
    db,
    'users',
    firebaseUser.uid
  );

  const userSnapshot =
    await getDoc(userRef);

  let role = 'student';

  if (userSnapshot.exists()) {
    role =
      userSnapshot.data().role ||
      'student';
  } else {
    await setDoc(
      userRef,
      {
        displayName:
          firebaseUser.displayName || '',
        email:
          firebaseUser.email || '',
        role: 'student',
        createdAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );
  }

  return formatUser(
    firebaseUser,
    role
  );
};

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          try {
            if (firebaseUser) {
              const formattedUser =
                await getUserWithRole(
                  firebaseUser
                );

              setUser(formattedUser);
            } else {
              setUser(null);
            }
          } catch (error) {
            console.error(
              'Auth state error:',
              error
            );

            setUser(
              firebaseUser
                ? formatUser(
                    firebaseUser
                  )
                : null
            );
          } finally {
            setLoading(false);
          }
        }
      );

    return unsubscribe;
  }, []);

  const register = async (
    name,
    email,
    password
  ) => {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

    await updateProfile(
      userCredential.user,
      {
        displayName: name.trim(),
      }
    );

    await setDoc(
      doc(
        db,
        'users',
        userCredential.user.uid
      ),
      {
        displayName: name.trim(),
        email: email.trim(),
        role: 'student',
        createdAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );

    await userCredential.user.reload();

    const formattedUser =
      await getUserWithRole(
        auth.currentUser
      );

    setUser(formattedUser);

    return userCredential;
  };

  const login = async (
    email,
    password
  ) => {
    return await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateDisplayName = async (
    newName
  ) => {
    if (!auth.currentUser) {
      throw new Error(
        'No authenticated user.'
      );
    }

    const trimmedName =
      newName.trim();

    if (!trimmedName) {
      throw new Error(
        'Name cannot be empty.'
      );
    }

    await updateProfile(
      auth.currentUser,
      {
        displayName: trimmedName,
      }
    );

    await setDoc(
      doc(
        db,
        'users',
        auth.currentUser.uid
      ),
      {
        displayName: trimmedName,
      },
      {
        merge: true,
      }
    );

    await auth.currentUser.reload();

    const formattedUser =
      await getUserWithRole(
        auth.currentUser
      );

    setUser(formattedUser);
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