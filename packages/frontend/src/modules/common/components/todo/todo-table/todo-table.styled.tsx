import styled from 'styled-components';
import { COLORS } from '../../../../theme';

export const TableContainer = styled.div`
  padding: 16px;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.gray};
  border-radius: 8px;
  margin: 16px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid ${COLORS.whiter};
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: ${COLORS.whiter};
  }
`;

export const TableHeader = styled.thead``;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr``;

export const TableCell = styled.td``;
