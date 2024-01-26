import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from './goBack.styled';

export const GoBack = () => {
  const navigate = useNavigate();
  return (
    <LogoutButton type="button" onClick={() => navigate(-1)}>
      Go back
    </LogoutButton>
  );
};
