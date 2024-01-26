import styled from 'styled-components';
import { DEVICE, SPACES, COLORS } from '../../../../theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${SPACES.sm};
  @media ${DEVICE.tablet} {
    padding: ${SPACES.lg} ${SPACES.md};
  }
  @media ${DEVICE.mobile} {
    padding: ${SPACES.lg} ${SPACES.xs};
  }
`;

export const LogoutButton = styled.button`
  width: 120px;
  height: 50px;
  background-color: transparent;
  color: black;
  margin: ${SPACES.md} 0px;
  display: block;
  cursor: pointer;
  transition: 0.4s linear background-color;
  &:hover {
    transition: 0.4s linear background-color;
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: ${SPACES.md};
`;
