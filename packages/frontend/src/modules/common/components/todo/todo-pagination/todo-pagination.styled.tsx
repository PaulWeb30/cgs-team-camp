import styled, { css } from 'styled-components';
import { COLORS } from '../../../../theme';

type FilterButtonProps = {
  active: boolean;
};

export const FilterButtonContainer = styled.div`
  display: flex;
`;

export const FilterButton = styled.button<FilterButtonProps>`
  padding: 0.5rem 1rem;
  margin-right: 0.25rem;
  border: 1px solid ${COLORS.gray};
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${COLORS.blue};
  }

  ${(props) =>
    props.active &&
    css`
      background: ${COLORS.blue};
      color: white;
    `}
`;
