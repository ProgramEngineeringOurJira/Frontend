import { RouteObject } from 'react-router-dom';

import { BoardPage, CreateProject, Auth, NotFoundPage, Ticket } from '../pages';

import { paths } from './paths';

export const Router: RouteObject[] = [
  {
    path: paths.home,
    element: <BoardPage />
  },
  {
    path: paths.login,
    element: <Auth />
  },
  {
    path: `${paths.board}/:idBoard`,
    element: <BoardPage />
  },
  {
    path: `${paths.board}/:idBoard${paths.sprint}/:idSprint`,
    element: <BoardPage />
  },
  {
    path: paths.createProject,
    element: <CreateProject />
  },
  {
    path: `${paths.board}/:idBoard${paths.ticket}/:idTicket`,
    element: <Ticket />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];
