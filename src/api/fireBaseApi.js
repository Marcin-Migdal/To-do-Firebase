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
    console.log(e.code);
  }
};

export const handleSignInWithEmail = async (credentials, handleSignInError) => {
  try {
    const { email, password } = credentials;
    await signInWithEmailAndPassword(fb.auth.auth, email, password);
  } catch (e) {
    if (e.code === 'auth/user-not-found') {
      handleSignInError('email', 'Email not found');
      return;
    } else if (e.code === 'auth/wrong-password') {
      handleSignInError('password', 'Wrong password');
      return;
    }

    handleSignInError('internal', 'Error ocurred, please try again');
  }
};

export const handleSignUpWithEmail = async (credentials, lng, handleSignUpError) => {
  try {
    const { email, password, userName } = credentials;
    const request = { darkMode: false, lng: lng, userName, avatarUrl: '' };

    const { user } = await createUserWithEmailAndPassword(fb.auth.auth, email, password);
    await setDoc(doc(fb.firestore, 'userConfig', user.uid), request);
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      handleSignUpError('email', 'Email already in use');
      return;
    }

    handleSignUpError('internal', 'Error ocurred, please try again');
  }
};

export const firebaseSignOut = async () => {
  try {
    await signOut(fb.auth.auth);
  } catch (e) {
    console.log(e.code);
  }
};

export const updateUserConfig = async (uid, request) => {
  try {
    await updateDoc(doc(fb.firestore, 'userConfig', uid), request);
  } catch (e) {
    console.log(e.code);
  }
};
export const getUserConfigSnapShot = async uid => {
  try {
    const docSnap = await getDoc(doc(fb.firestore, 'userConfig', uid));
    return docSnap;
  } catch (e) {
    console.log(e.code);
  }
};
