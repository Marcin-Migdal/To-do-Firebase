import { Redirect, Route, Switch, useHistory } from 'react-router';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { useEffect, useState } from 'react';
import 'primeicons/primeicons.css';

import { History, LoadingIndicator, Login, NavBar, Notes, SignUp, ToDoList } from 'components';
import { updateUserConfig } from 'api/fireBaseApi';
import { useResolved } from 'hooks/useResolved';
import { ToDoProvider, useToDo } from 'context';
import { useAuth } from 'hooks/useAuth';
import { pages } from 'utils/pagesUrl';
import './App.css';

export const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();

  useEffect(() => {
    const redirect = () => {
      if ([pages.login, pages.signup].includes(window.location.pathname)) {
        !!authUser && history.push(pages.mainPage);
      } else history.push(!!authUser ? window.location.pathname : pages.login);
    };

    authUser !== undefined && redirect();
  }, [authUser, history]);

  return (
    <ToDoProvider userAuth={authUser}>
      <AppRouting />
    </ToDoProvider>
  );
};

const AppRouting = () => {
  const { userConfig, setUserConfig } = useToDo();
  const authResolved = useResolved(userConfig);

  const toggleDarkMode = () => {
    const darkMode = !userConfig?.darkMode;
    updateUserConfig(userConfig.uid, { darkMode });
    setUserConfig({ ...userConfig, darkMode });
  };

  if (!authResolved) return <LoadingIndicator style={{ height: '100vh', fontSize: '2.35em' }} />;

  return (
    <div id="app" className={`app ${userConfig?.darkMode ? 'dark-mode' : ''}`}>
      {userConfig && <NavBar toggleDarkMode={toggleDarkMode} darkMode={userConfig.darkMode} />}
      <Switch>
        <ToDoList exact path={pages.mainPage} component={ToDoList} />
        <Route path={pages.login} component={Login} />
        <Route path={pages.signup} component={SignUp} />
        <Route path={pages.history} component={History} />
        <Route path={pages.notes} component={Notes} />
        <Route render={() => <Redirect to={{ pathname: pages.mainPage }} />} />
      </Switch>
    </div>
  );
};

// TODO! tworzenie user'a z google account usuwa user'a o tym email'u

// TODO! dodanie walidacji (jak się uda to użyć yup'a z formik)
// TODO? login
// TODO? rejestracja
// TODO? dodawanie edycja to do
// TODO? obsługiwanie błędów autoryzacji

// TODO! back end do zapisywania i zaciągania to do
// TODO! wysyłanie to do do innego użytkownika

// TODO! mobile css z grubsza, będzie wersja w react native

// TODO! help modal
// TODO! vercel env
// TODO! vercel deploy

// TODO! historia
// TODO? dodanie tabeli
// TODO? zaciągnięcie danych
// TODO? filtrowanie
// TODO? sortowanie
// TODO? edycja komentarza

// TODO! notatki
// TODO? ogarnięcie jak zrobić notatki xD

// TODO! poprawka help'a
