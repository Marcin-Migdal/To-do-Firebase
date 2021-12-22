import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const signIn = async ({ auth, provider }) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    return { token, user };
  } catch (error) {
    const errorCode = error.code;
    // const errorMessage = error.message;
    // const email = error.email;
    // const credential = GoogleAuthProvider.credentialFromError(error);
    return errorCode;
  }
};
