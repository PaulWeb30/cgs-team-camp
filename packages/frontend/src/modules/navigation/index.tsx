import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import TodosPageContainer from '../todos/todos.container';

const router = createBrowserRouter([
  {
    path: APP_KEYS.ROUTER_KEYS.ROOT,
    element: <HomePageContainer />
  },
  {
    path: APP_KEYS.ROUTER_KEYS.TODOS,
    element: <TodosPageContainer />
  },
  {
    path: APP_KEYS.ROUTER_KEYS.TODO,
    element: <h1>TODO page</h1>
  }
]);

export const MainRouter = () => <RouterProvider router={router} />;
