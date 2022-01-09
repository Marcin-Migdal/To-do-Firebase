import { getUserConfigSnapShot } from 'api/fireBaseApi';
import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ToDoContext = createContext();

export const ToDoProvider = ({ children, userAuth }) => {
  const { i18n } = useTranslation();
  const [userConfig, setUserConfig] = useState(undefined);

  useEffect(() => {
    const setConfig = async () => {
      if (userAuth) {
        const uid = userAuth?.uid;
        const docSnap = await getUserConfigSnapShot(uid);
        const { lng, darkMode, userName, avatarUrl } = docSnap.data();

        i18n.changeLanguage(lng);
        setUserConfig({ uid, lng, darkMode, userName, avatarUrl });
      } else if (userAuth === null) {
        setUserConfig(null);
      }
    };

    setConfig();
  }, [userAuth]);

  return <ToDoContext.Provider value={{ userConfig, setUserConfig }}>{children}</ToDoContext.Provider>;
};

export const useToDo = () => {
  const { userConfig, setUserConfig } = useContext(ToDoContext);

  return { userConfig, setUserConfig };
};
