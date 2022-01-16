import { Redirect, Route, Switch, useHistory } from 'react-router';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { Toast } from 'primereact/toast';
import 'primeicons/primeicons.css';
import { useEffect, useRef } from 'react';

import { History, LoadingIndicator, SignIn, NavBar, Notes, SignUp, ToDoList } from 'components';
import { updateUserConfig } from 'api/fireBaseApi';
import { useResolved } from 'hooks/useResolved';
import { ToDoProvider, useToDo } from 'context';
import { useAuth } from 'hooks/useAuth';
import { pages } from 'utils/pagesUrl';
import './App.css';

export const App = () => {
  const toastRef = useRef();
  const history = useHistory();
  const { authUser } = useAuth();

  useEffect(() => {
    const redirect = () => {
      if ([pages.signIn, pages.signup].includes(window.location.pathname)) {
        !!authUser && history.push(pages.mainPage);
      } else history.push(!!authUser ? window.location.pathname : pages.signIn);
    };

    authUser !== undefined && redirect();
  }, [authUser, history]);

  return (
    <ToDoProvider userAuth={authUser} toastRef={toastRef}>
      <AppRouting />
    </ToDoProvider>
  );
};

const AppRouting = () => {
  const { userConfig, setUserConfig, toastRef } = useToDo();
  const authResolved = useResolved(userConfig);

  const toggleDarkMode = () => {
    const darkMode = !userConfig?.darkMode;
    updateUserConfig(userConfig.uid, { darkMode });
    setUserConfig({ ...userConfig, darkMode });
  };

  if (!authResolved) return <LoadingIndicator style={{ height: '100vh', fontSize: '2.35em' }} />;

  return (
    <div id="app" className={`app ${userConfig?.darkMode ? 'dark-mode' : ''}`}>
      <Toast ref={toastRef} />
      {userConfig && <NavBar toggleDarkMode={toggleDarkMode} darkMode={userConfig.darkMode} />}
      <Switch>
        <ToDoList exact path={pages.mainPage} component={ToDoList} />
        <Route path={pages.signIn} component={SignIn} />
        <Route path={pages.signup} component={SignUp} />
        <Route path={pages.history} component={History} />
        <Route path={pages.notes} component={Notes} />
        <Route render={() => <Redirect to={{ pathname: pages.mainPage }} />} />
      </Switch>
    </div>
  );
};

// TODO! back end do zapisywania i zaciągania to do
// TODO! jak się usunie toDo, to delete w tabeli toDo i post do historii
// TODO? toast jak sie coś doda usunie edytuje

// TODO! wysyłanie to do do innego użytkownika

// TODO! ogarnąć css custom input'ów, żeby wszystkie były w jednym folderze i był jeden plik css
// TODO! mobile css z grubsza, będzie wersja w react native

// TODO! pomyśleć o tym co robić z hasłem jak je wysyłam do firebase jakiś hash czy cóś

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
