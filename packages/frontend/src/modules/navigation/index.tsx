import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePageContainer from '../pages/home';
import { TodoPage } from '../pages/todo';
import { APP_KEYS } from '../common/consts';

const router = createBrowserRouter([
  {
    path: APP_KEYS.ROUTER_KEYS.ROOT,
    element: <HomePageContainer />
  },

  {
    path: APP_KEYS.ROUTER_KEYS.TODO,
    element: <TodoPage />
  }
]);

export const MainRouter = () => <RouterProvider router={router} />;
