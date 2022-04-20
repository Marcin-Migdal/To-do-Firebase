import { createContext, useContext, useCallback } from 'react';
import { updateUserConfig } from 'api/userApi';
import { useTranslation } from 'react-i18next';

export const ToDoContext = createContext();

export const ToDoProvider = ({ children, userConfig, setAuthUser, toastRef }) => {
  const { t, i18n } = useTranslation();

  const toggleDarkMode = () => {
    const darkMode = !userConfig?.darkMode;
    updateUserConfig(userConfig.uid, { darkMode });
    setAuthUser({ ...userConfig, darkMode });
  };

  const handleLanguageChange = () => {
    const lng = Object.keys(i18n.options.resources).find(lng => lng !== i18n.language);

    updateUserConfig(userConfig.uid, { lng });
    setAuthUser({ ...userConfig, lng });
    i18n.changeLanguage(lng);
  };

  const showToast = useCallback(
    (summary, detail, severity = 'success', life = 2000) => {
      toastRef.current.show({ severity: severity, summary: t(summary), detail: t(detail), life: life });
    },
    [t, toastRef],
  );

  return (
    <ToDoContext.Provider
      value={{
        userConfig,
        setAuthUser,
        showToast,
        toastRef,
        toggleDarkMode,
        handleLanguageChange,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDo = () => {
  const { userConfig, setAuthUser, showToast, toastRef, toggleDarkMode, handleLanguageChange } = useContext(ToDoContext);

  return { userConfig, setAuthUser, showToast, toastRef, toggleDarkMode, handleLanguageChange };
};
