import styled from 'styled-components';
import { COLORS, DEVICE, SPACES } from '../../../../theme';

export const Container = styled.div`
  padding: ${SPACES.sm};
  @media ${DEVICE.tablet} {
    padding: ${SPACES.lg} ${SPACES.md};
  }
  @media ${DEVICE.mobile} {
    padding: ${SPACES.lg} ${SPACES.xs};
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${COLORS.black};
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  background-color: ${COLORS.blue};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: ${SPACES.md};
  transition: 0.3s ease-in opacity;
  &:hover {
    transition: 0.3s ease-out opacity;
    opacity: 0.8;
  }
`;
