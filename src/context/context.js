import { getUserConfigSnapShot } from 'api/fireBaseApi';
import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ToDoContext = createContext();

export const ToDoProvider = ({ children, userAuth, toastRef }) => {
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

  const showToast = (summary, detail, severity = 'success', life = 1000) => {
    toastRef.current.show({ severity: severity, summary: summary, detail: detail, life: life });
  };

  return <ToDoContext.Provider value={{ userConfig, setUserConfig, showToast, toastRef }}>{children}</ToDoContext.Provider>;
};

export const useToDo = () => {
  const { userConfig, setUserConfig, showToast, toastRef } = useContext(ToDoContext);

  return { userConfig, setUserConfig, showToast, toastRef };
};
