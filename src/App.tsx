import { FC } from 'react';
import { useRoutes } from 'react-router-dom';

import { Router as PathRouter } from './utils/Router';

import './reset.css';
import './App.css';
import './global-styles/index.scss';

export const App: FC = () => {
  const routes = useRoutes(PathRouter);
  return (
    <>{routes}</>
  );
}
