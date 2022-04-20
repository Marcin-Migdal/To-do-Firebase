import { getUserConfigSnapShot } from 'api/userApi';
import { onAuthStateChanged } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { fb } from 'service';

export const useAuth = () => {
  const { i18n } = useTranslation();
  const [authUser, setAuthUser] = useState(undefined);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(fb.auth.auth, async user => {
      if (user) {
        const docSnap = await getUserConfigSnapShot(user?.uid);
        const data = docSnap.data();

        i18n.changeLanguage(data.lng);
        setAuthUser({ uid: user?.uid, ...data });
      } else {
        setAuthUser(null);
      }
    });

    return unSubscribe;
  }, [i18n]);

  return { authUser, setAuthUser };
};
