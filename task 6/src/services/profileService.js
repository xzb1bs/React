async function getFirestoreTools() {
  const [{ doc, getDoc, getFirestore, setDoc }, { firebaseApp }] = await Promise.all([
    import('firebase/firestore'),
    import('../auth/firebase'),
  ]);

  if (!firebaseApp) {
    throw new Error('Firebase is not configured. Check your Firebase settings.');
  }

  return {
    doc,
    getDoc,
    setDoc,
    profileCollection: getFirestore(firebaseApp),
  };
}

export async function getUserProfile(userId) {
  const { doc, getDoc, profileCollection } = await getFirestoreTools();
  const snapshot = await getDoc(doc(profileCollection, 'users', userId));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function saveUserProfile(userId, profile) {
  const age = Number(profile.age);

  if (
    !profile.firstName.trim()
    || !profile.lastName.trim()
    || !profile.gender
    || !Number.isInteger(age)
    || age < 1
    || age > 120
  ) {
    throw new Error('Enter a first name, last name, gender, and a valid age (1–120).');
  }

  const savedProfile = {
    firstName: profile.firstName.trim(),
    lastName: profile.lastName.trim(),
    gender: profile.gender,
    age,
  };

  const { doc, setDoc, profileCollection } = await getFirestoreTools();
  await setDoc(doc(profileCollection, 'users', userId), savedProfile);
  return savedProfile;
}

export function getProfileErrorMessage(error) {
  const code = error?.code?.replace(/^firestore\//, '');
  const messages = {
    'permission-denied': 'You do not have permission to access this profile.',
    'unavailable': 'Could not reach Firebase. Check your internet connection and try again.',
  };

  return messages[code] || error?.message || 'Could not load the profile.';
}
