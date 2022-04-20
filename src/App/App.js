import { Redirect, Route, Switch, useHistory } from 'react-router';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import 'primeicons/primeicons.css';

import { History, SignIn, SignUp, ToDoList } from 'pages';
import { LoadingIndicator, NavBar } from 'components';
import { useResolved } from 'hooks/useResolved';
import { ToDoProvider, useToDo } from 'context';
import { useAuth } from 'hooks/useAuth';
import { pages } from 'utils/pagesUrl';
import './App.css';

export const App = () => {
  const toastRef = useRef();
  const history = useHistory();
  const { authUser, setAuthUser } = useAuth();

  useEffect(() => {
    const redirect = () => {
      if ([pages.signIn, pages.signup].includes(window.location.pathname)) {
        !!authUser && history.push(pages.mainPage);
      } else history.push(!!authUser ? window.location.pathname : pages.signIn);
    };

    authUser !== undefined && redirect();
  }, [authUser, history]);

  return (
    <ToDoProvider userConfig={authUser} setAuthUser={setAuthUser} toastRef={toastRef}>
      <AppRouting />
    </ToDoProvider>
  );
};

const AppRouting = () => {
  const { userConfig, toastRef } = useToDo();
  const authResolved = useResolved(userConfig);

  if (!authResolved) return <LoadingIndicator style={{ height: '100vh', fontSize: '2.35em' }} />;

  return (
    <div id="app" className={`app ${userConfig?.darkMode ? 'dark-mode' : ''}`}>
      <Toast ref={toastRef} />
      <NavBar />
      <Switch>
        <ToDoList exact path={pages.mainPage} component={ToDoList} />
        <Route path={pages.signIn} component={SignIn} />
        <Route path={pages.signup} component={SignUp} />
        <Route path={pages.history} component={History} />
        <Route render={() => <Redirect to={{ pathname: pages.mainPage }} />} />
      </Switch>
    </div>
  );
};
