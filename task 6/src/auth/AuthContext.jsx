import { useEffect, useState } from 'react';
import {
  getAuthErrorMessage,
  setLocalPersistence,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  signUpWithEmail,
  subscribeToAuthState,
} from './authService';
import { AuthContext } from './authContext';
import { isFirebaseConfigured } from './firebase';

const FIREBASE_SETUP_MESSAGE =
  'Firebase is not configured. Copy .env.example to .env.local and add your Firebase web app settings.';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return undefined;
    }

    let active = true;
    let unsubscribe;

    const watchAuthState = () => {
      if (!active) return;
      unsubscribe = subscribeToAuthState(
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        },
        (error) => {
          setAuthError(getAuthErrorMessage(error));
          setLoading(false);
        },
      );
    };

    setLocalPersistence().then(watchAuthState, (error) => {
      if (!active) return;
      setAuthError(getAuthErrorMessage(error));
      watchAuthState();
    });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  async function runAuthAction(action) {
    setAuthError('');
    try {
      return await action();
    } catch (error) {
      setAuthError(
        isFirebaseConfigured
          ? getAuthErrorMessage(error)
          : FIREBASE_SETUP_MESSAGE,
      );
      return null;
    }
  }

  const value = {
    user,
    loading,
    authError,
    clearAuthError: () => setAuthError(''),
    signUp: (email, password) => runAuthAction(
      () => signUpWithEmail(email, password),
    ),
    login: (email, password) => runAuthAction(
      () => signInWithEmail(email, password),
    ),
    googleLogin: () => runAuthAction(signInWithGoogle),
    logout: () => runAuthAction(signOutUser),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
