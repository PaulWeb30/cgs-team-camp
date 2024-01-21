import styled from 'styled-components';
import { DEVICE, SPACES } from '../../../../theme';

export const Container = styled.div`
  padding: ${SPACES.sm};
  @media ${DEVICE.tablet} {
    padding: ${SPACES.lg} ${SPACES.md};
  }
  @media ${DEVICE.mobile} {
    padding: ${SPACES.lg} ${SPACES.xs};
  }
`;

export const ProfileButton = styled.button`
  width: 120px;
  height: 50px;
  background-color: transparent;
  color: black;
  margin-bottom: ${SPACES.md};
  display: block;
  cursor: pointer;
`;
