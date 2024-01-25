import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_KEYS } from '../../../consts';
import { AuthForgotRequest } from '../auth-forgot/auth-forgot-request.component';
import { Button, Container, Title } from './auth-container.styled';

export const AuthContainer = () => {
  const [isForgotRequest, setIsForgotRequest] = useState<boolean>(false);

  const forgotRequestHandler = () => {
    setIsForgotRequest(true);
  };

  return (
    <Container>
      <Title>TodoApp</Title>
      <Link to={APP_KEYS.ROUTER_KEYS.LOGIN}>
        <Button>Login</Button>
      </Link>
      <Link to={APP_KEYS.ROUTER_KEYS.SIGNUP}>
        <Button>Signup</Button>
      </Link>
      <Button onClick={forgotRequestHandler}>Forgot password?</Button>
      {isForgotRequest && <AuthForgotRequest />}
    </Container>
  );
};
