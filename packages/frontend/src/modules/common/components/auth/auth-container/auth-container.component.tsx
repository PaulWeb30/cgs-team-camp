import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_KEYS } from '../../../consts';
import { AuthForgotRequest } from '../auth-forgot/auth-forgot-request.component';
import { Button, Title } from './auth-container.styled';
import { Container } from '../../profile/profile-container';

export const AuthContainer = () => {
  const [isForgotRequest, setIsForgotRequest] = useState<boolean>(false);

  const forgotRequestHandler = () => {
    setIsForgotRequest((prev) => !prev);
  };

  return (
    <Container>
      <Title>Todo App</Title>
      <Link to={APP_KEYS.ROUTER_KEYS.LOGIN}>
        <Button>Login</Button>
      </Link>
      <Link to={APP_KEYS.ROUTER_KEYS.SIGNUP}>
        <Button>Signup</Button>
      </Link>
      <Button onClick={forgotRequestHandler}>Forgot password</Button>
      {isForgotRequest && <AuthForgotRequest />}
    </Container>
  );
};
