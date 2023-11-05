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
import { Login } from './pages';
import { RegisterLogin } from './pages/Login/RegisterLogin';
import { LogInProvider } from './shared/context';

export const App: FC = () => {
  const { isAuth } = useContext(AuthContext);
  const routes = useRoutes(PathRouter);
  const queryClient = new QueryClient();

  const privateOutlet = (children: ReactElement<any>) => {
    if (!isAuth && (window.location.pathname !== paths.register || window.location.pathname === paths.login)) {
      window.location.pathname = paths.register;
    }
    return !isAuth ? <RegisterLogin /> : children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LogInProvider>
      
      <Provider store={store}>{routes}</Provider>
      
      </LogInProvider>
    </QueryClientProvider>
  );
};
