import styled from 'styled-components';
import { COLORS, DEVICE } from '../../../../theme';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${COLORS.whiter_second};
  border-bottom: 1px solid ${COLORS.whiter};
  margin-bottom: 20px;

  @media ${DEVICE.mobile} {
    flex-direction: column;
    gap: 10px;
  }
`;
