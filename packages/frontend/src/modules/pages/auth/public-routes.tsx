import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { APP_KEYS } from '../../common/consts';

export const UnauthorizedRoutes = () => {
  const auth = localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);

  if (auth) {
    return <Navigate to={APP_KEYS.ROUTER_KEYS.ROOT} replace />;
  }

  return <Outlet />;
};
