import styled from 'styled-components';
import { COLORS } from '../../../../theme';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${COLORS.whiter_second};
  border-bottom: 1px solid ${COLORS.whiter};
  margin-bottom: 20px;
`;
