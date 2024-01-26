import styled from 'styled-components';
import { COLORS } from '../../../../theme';

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${COLORS.black};
  padding: 20px;
  margin: 10px;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
  font-size: 2em;
  color: ${COLORS.black};
  border-bottom: 1px solid ${COLORS.whiter};
  padding-bottom: 10px;
`;

export const Content = styled.p`
  margin-top: 10px;
  color: #666;
  font-size: 1.2em;
`;

export const Button = styled.button`
  background: ${COLORS.white};
  color: ${COLORS.black};
  border: 1px solid ${COLORS.whiter};
  border-radius: 4px;
  padding: 10px 20px;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background: ${COLORS.whiter};
  }
`;

export const ToggleButton = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

export const Checkbox = styled.input`
  &:checked {
    background-color: ${COLORS.blue};
  }

  &:focus {
    box-shadow: 0 0 1px ${COLORS.blue};
  }

  &:checked {
    transform: translateX(26px);
  }
`;
