import { RouteObject } from 'react-router-dom';

import { Board, CreateProject, Login, NotFoundPage, Ticket } from '../pages';

import { paths } from './paths';

export const Router: RouteObject[] = [
  {
    path: paths.board,
    element: <Board />
  },
  {
    path: paths.login,
    element: <Login />
  },
  {
    path: `${paths.sprint}/:id`,
    element: <Board />
  },
  {
    path: paths.createProject,
    element: <CreateProject />
  },
  {
    path: `${paths.ticket}/:id`,
    element: <Ticket />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];
