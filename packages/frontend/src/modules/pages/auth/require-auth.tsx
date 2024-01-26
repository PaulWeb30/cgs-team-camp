import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { APP_KEYS } from '../../common/consts';

export const RequireAuth = () => {
  const location = useLocation();
  const auth = localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);

  if (!auth) {
    return <Navigate to={APP_KEYS.ROUTER_KEYS.AUTH} state={{ from: location }} />;
  }

  return <Outlet />;
};
