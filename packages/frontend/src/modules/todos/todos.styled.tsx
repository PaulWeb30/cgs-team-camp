import styled from 'styled-components';
import { COLORS, DEVICE, SPACES } from '../theme';

export const Container = styled.div`
  padding: ${SPACES.sm};
  @media ${DEVICE.tablet} {
    padding: ${SPACES.lg} ${SPACES.md};
  }
  @media ${DEVICE.mobile} {
    padding: ${SPACES.lg} ${SPACES.xs};
  }
`;

export const SliderContainer = styled('div')`
  position: relative;
`;

export const CreateButton = styled.button`
  width: 120px;
  height: 50px;
  background-color: transparent;
  margin-bottom: ${SPACES.md};
  display: block;
  cursor: pointer;
`;

export const TodosTable = styled('div')`
  border: 2px solid ${COLORS.black};
  margin-bottom: ${SPACES.sm};
`;
