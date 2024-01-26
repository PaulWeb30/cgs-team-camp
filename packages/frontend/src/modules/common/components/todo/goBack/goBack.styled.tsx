import styled from 'styled-components';
import { COLORS, SPACES } from '../../../../theme';

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
