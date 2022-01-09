import { signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { fb } from 'service';

export const handleGoogleSingIn = async lng => {
  try {
    const {
      user: { uid, photoURL: avatarUrl, displayName: userName },
    } = await signInWithPopup(fb.auth.auth, fb.auth.provider);

    const docSnap = await getUserConfigSnapShot(uid);

    if (!docSnap.exists()) {
      const request = { darkMode: false, lng: lng, userName, avatarUrl };
      await setDoc(doc(fb.firestore, 'userConfig', uid), request);
    }
  } catch (e) {
    console.log(e);
  }
};

export const handleSignInWithEmail = async credentials => {
  try {
    const { email, password } = credentials;
    await signInWithEmailAndPassword(fb.auth.auth, email, password);
  } catch (e) {
    console.log(e);
  }
};

export const handleSignUpWithEmail = async (credentials, lng) => {
  try {
    const { email, password, name } = credentials;
    const request = { darkMode: false, lng: lng, userName: name, avatarUrl: '' };

    const { user } = await createUserWithEmailAndPassword(fb.auth.auth, email, password);
    await setDoc(doc(fb.firestore, 'userConfig', user.uid), request);
  } catch (e) {
    console.log(e);
  }
};

export const firebaseSignOut = async () => {
  try {
    await signOut(fb.auth.auth);
  } catch (e) {
    console.log(e);
  }
};

export const updateUserConfig = async (uid, request) => {
  try {
    await updateDoc(doc(fb.firestore, 'userConfig', uid), request);
  } catch (e) {
    console.log(e);
  }
};
export const getUserConfigSnapShot = async uid => {
  try {
    const docSnap = await getDoc(doc(fb.firestore, 'userConfig', uid));
    return docSnap;
  } catch (e) {
    console.log(e);
  }
};
