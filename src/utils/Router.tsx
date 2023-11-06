import { RouteObject } from 'react-router-dom';

import { BoardPage, CreateProject, Auth, NotFoundPage, Ticket } from '../pages';

import { paths } from './paths';

export const Router: RouteObject[] = [
  {
    path: paths.board,
    element: <BoardPage />
  },
  {
    path: paths.login,
    element: <Auth />
  },
  {
    path: `${paths.sprint}/:id`,
    element: <BoardPage />
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
