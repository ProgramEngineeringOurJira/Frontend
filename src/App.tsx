import { FC, ReactElement, useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import { Router as PathRouter } from './utils/Router';
import { store } from './redux/store';

import './reset.css';
import './App.css';
import './global-styles/index.scss';
import { AuthContext } from './shared/context';
import { paths } from './utils/paths';
import { Auth } from './pages';
import { LogInProvider } from './shared/context';

export const App: FC = () => {
  //const { isAuth, token, user } = useContext(AuthContext);
  const routes = useRoutes(PathRouter);
  const queryClient = new QueryClient();

  const privateOutlet = (children: ReactElement<any>) => {
    // TODO use isAuth from context
    const isAuth = localStorage.getItem('access_token');
    if (!isAuth && window.location.pathname !== paths.login) {
      window.location.pathname = paths.login;
    }
    return !isAuth ? <Auth /> : children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LogInProvider>{privateOutlet(<>{routes}</>)}</LogInProvider>
    </QueryClientProvider>
  );
};
