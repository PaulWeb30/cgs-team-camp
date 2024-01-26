import React from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { GoBack } from '../../todo/goBack/goBack.component';
import { ProfileChangePassword } from '../profile-change-password/profile-change-password.component';
import { Container, LogoutButton, ButtonWrapper } from './profile-container.styled';

export const ProfileContainer = () => {
  const { logout } = useAuth({ fromPage: null });

  const logoutHandler = () => logout.mutate();

  return (
    <Container>
      <ProfileChangePassword />
      <ButtonWrapper>
        <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>
        <GoBack />
      </ButtonWrapper>
    </Container>
  );
};
