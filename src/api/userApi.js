import { signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, writeBatch, getDocs, query, collection, where } from 'firebase/firestore';
import { fb } from 'service';

export const googleSingIn = async lng => {
  try {
    const { user } = await signInWithPopup(fb.auth.auth, fb.auth.provider);
    const docSnap = await getUserConfigSnapShot(user.uid);

    if (!docSnap.exists()) {
      const { displayName: userName, photoURL: avatarUrl, email, uid } = user;

      const batch = writeBatch(fb.firestore);

      batch.set(doc(fb.firestore, 'usersConfig', uid), { avatarUrl, userName, email, darkMode: false, lng });
      batch.set(doc(fb.firestore, 'users', uid), { avatarUrl, userName, uid });

      await batch.commit();
    }
  } catch (e) {
    console.log(e.code);
  }
};

export const signUpWithEmail = async (credentials, lng, handleSignUpError) => {
  try {
    const { email, password, userName } = credentials;

    const validate = await validateUsername(userName, handleSignUpError);

    if (validate) {
      const { user } = await createUserWithEmailAndPassword(fb.auth.auth, email, password);

      const batch = writeBatch(fb.firestore);

      batch.set(doc(fb.firestore, 'usersConfig', user.uid), { avatarUrl: '', userName, email, darkMode: false, lng });
      batch.set(doc(fb.firestore, 'users', user.uid), { avatarUrl: '', userName, uid: user.uid });

      await batch.commit();
    } else {
      handleSignUpError('userName', 'Username already in use');
    }
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      handleSignUpError('Email', 'Email already in use');
      return;
    }

    handleSignUpError('internal', 'Error ocurred, please try again');
  }
};

export const signInWithEmail = async (credentials, handleSignInError) => {
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

export const firebaseSignOut = async () => {
  try {
    await signOut(fb.auth.auth);
  } catch (e) {
    console.log(e.code);
  }
};

export const updateUserConfig = async (uid, request) => {
  try {
    const batch = writeBatch(fb.firestore);
    let userRequest = {};

    batch.update(doc(fb.firestore, 'usersConfig', uid), request);

    !!request?.avatarUrl && (userRequest.avatarUrl = request?.avatarUrl);
    !!request?.userName && (userRequest.userName = request?.userName);

    Object.keys(userRequest).length > 0 && batch.update(doc(fb.firestore, 'users', uid), userRequest);

    await batch.commit();
  } catch (e) {
    console.log(e.code);
  }
};

export const getUserConfigSnapShot = async uid => {
  try {
    const docSnap = await getDoc(doc(fb.firestore, 'usersConfig', uid));
    return docSnap;
  } catch (e) {
    console.log(e.code);
  }
};

export const validateUsername = async (userName, handleSignUpError) => {
  try {
    const querySnapshot = await getDocs(query(collection(fb.firestore, 'usersConfig'), where('userName', '==', userName)));

    let res = [];
    querySnapshot.forEach(doc => res.push(doc.data()));
    return res.length === 0;
  } catch (e) {
    handleSignUpError('internal', 'Error ocurred, please try again');
    return false;
  }
};
