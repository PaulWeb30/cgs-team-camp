import React from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { ProfileChangePassword } from '../profile-change-password/profile-change-password.component';
import { Container, LogoutButton } from './profile-container.styled';

export const ProfileContainer = () => {
  const { logout } = useAuth({ fromPage: null });

  const logoutHandler = () => logout.mutate();

  return (
    <Container>
      <ProfileChangePassword />
      <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>
    </Container>
  );
};
