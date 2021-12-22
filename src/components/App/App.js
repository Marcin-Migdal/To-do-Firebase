import { Redirect, Route, Switch, useHistory } from 'react-router';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { useEffect, useState } from 'react';
import 'primeicons/primeicons.css';

import { History, Login, NavBar, Notes, SignUp, ToDoList } from 'components';
import { useResolved } from 'hooks/useResolved';
import { useAuth } from 'hooks/useAuth';
import { ToDoProvider } from 'context';
import { pages } from 'utils/pagesUrl';
import './App.css';

export const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const redirect = () => {
      if ([pages.login, pages.signup].includes(window.location.pathname)) {
        !!authUser && history.push(pages.mainPage);
      } else {
        history.push(!!authUser ? window.location.pathname : pages.login);
      }
    };

    authResolved && redirect();
  }, [authUser, authResolved, history]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div id="app" className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      {authResolved && <NavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}
      <ToDoProvider>
        <Switch>
          {authResolved && <ToDoList exact path={pages.mainPage} component={ToDoList} />}
          <Route path={pages.login} component={Login} />
          <Route path={pages.signup} component={SignUp} />
          <Route path={pages.history} component={History} />
          <Route path={pages.notes} component={Notes} />
          <Route render={() => <Redirect to={{ pathname: pages.mainPage }} />} />
        </Switch>
      </ToDoProvider>
    </div>
  );
};

// TODO! rejestrowanie email'em
// TODO! normalne logowanie

// TODO! dodanie walidacji
// TODO? login
// TODO? rejestracja
// TODO? dodawanie edycja to do

// TODO! dark mode (ogarnąć i może zrobić, jak dużo roboty to dopiero po back'u się za to brać)

// TODO! mobile css z grubsza, będzie wersja w react native

// TODO! back end do zapisywania i zaciągania to do
// TODO! wysyłanie to do do innego użytkownika

// TODO! historia
// TODO? dodanie tabeli
// TODO? zaciągnięcie danych
// TODO? filtrowanie
// TODO? sortowanie
// TODO? edycja komentarza

// TODO! help modal
// TODO! vercel env
// TODO! vercel deploy

// TODO! notatki
// TODO? ogarnięcie jak zrobić notatki xD

// TODO! poprawka help'a

// TODO! dodanie input'u dla description
// TODO! dodanie input'u dla description
