import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { fb } from 'service';

export const useAuth = () => {
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(fb.auth.auth, user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return unSubscribe;
  }, []);

  return { authUser };
};
