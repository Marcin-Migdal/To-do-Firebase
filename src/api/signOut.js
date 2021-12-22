import { signOut } from 'firebase/auth';
import { fb } from 'service';

export const firebaseSignOut = async () => {
  try {
    await signOut(fb.auth.auth);
  } catch (e) {
    console.log(e);
  }
};
