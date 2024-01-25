import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { TodoPage } from '../pages/todo';
import { APP_KEYS } from '../common/consts';
import { AuthPage } from '../pages/auth';
import { LoginPage } from '../pages/auth/login';
import { SignupPage } from '../pages/auth/signup';
import { RequireAuth } from '../pages/auth/require-auth';
import { ProfilePage } from '../pages/profile';
import { ForgotPasswordPage } from '../pages/auth/forgot-password';
import { UnauthorizedRoutes } from '../pages/auth/public-routes';

export const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<HomePage />} />
        <Route path={APP_KEYS.ROUTER_KEYS.TODO} element={<TodoPage />} />
        <Route path={APP_KEYS.ROUTER_KEYS.PROFILE} element={<ProfilePage />} />
      </Route>

      <Route element={<UnauthorizedRoutes />}>
        <Route path={APP_KEYS.ROUTER_KEYS.AUTH} element={<AuthPage />} />
        <Route path={APP_KEYS.ROUTER_KEYS.LOGIN} element={<LoginPage />} />
        <Route path={APP_KEYS.ROUTER_KEYS.SIGNUP} element={<SignupPage />} />
        <Route path={APP_KEYS.ROUTER_KEYS.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Route>

      <Route path={APP_KEYS.ROUTER_KEYS.NOT_FOUND} element={<h1> Not found page</h1>} />
    </Routes>
  </BrowserRouter>
);
