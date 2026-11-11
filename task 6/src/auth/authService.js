import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';

function getAuthInstance() {
  if (!auth) {
    throw new Error(
      'Firebase is not configured. Copy .env.example to .env.local and add your Firebase web app settings.',
    );
  }
  return auth;
}

export function setLocalPersistence() {
  return setPersistence(getAuthInstance(), browserLocalPersistence);
}

export function subscribeToAuthState(onUser, onError) {
  return onAuthStateChanged(getAuthInstance(), onUser, onError);
}

export function signUpWithEmail(email, password) {
  return createUserWithEmailAndPassword(getAuthInstance(), email, password);
}

export function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(getAuthInstance(), email, password);
}

export function signInWithGoogle() {
  return signInWithPopup(getAuthInstance(), new GoogleAuthProvider());
}

export function signOutUser() {
  return signOut(getAuthInstance());
}

export function getAuthErrorMessage(error) {
  const messages = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/network-request-failed': 'Network error. Check your connection and try again.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled in Firebase.',
    'auth/popup-closed-by-user': 'The Google sign-in window was closed before finishing.',
    'auth/unauthorized-domain': 'This domain is not allowed in Firebase Authentication.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account was found for this email.',
    'auth/weak-password': 'Choose a password with at least 6 characters.',
    'auth/wrong-password': 'Email or password is incorrect.',
  };

  return messages[error?.code] || error?.message || 'Authentication failed. Try again.';
}
