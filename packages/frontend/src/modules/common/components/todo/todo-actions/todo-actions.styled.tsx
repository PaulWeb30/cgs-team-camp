import styled from 'styled-components';
import { COLORS, SPACES } from '../../../../theme';

export const Button = styled.button`
  border: none;
  border-radius: 4px;
  padding: ${SPACES.xxs} ${SPACES.xs};
  cursor: pointer;
  margin-right: ${SPACES.xxs};
`;

export const ViewButton = styled(Button)`
  background-color: ${COLORS.green};
  color: ${COLORS.white};
`;

export const DeleteButton = styled(Button)`
  background-color: ${COLORS.red};
  color: ${COLORS.white};
`;

export const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

interface LabelProps {
  size?: 'xs' | 'sm' | 'lg';
  disabled?: boolean;
}

export const Label = styled.label<LabelProps>`
  position: relative;
  display: inline-block;
  font-size: ${(props) => {
    if (props.size === 'xs') return '6px';
    if (props.size === 'sm') return '8px';
    if (props.size === 'lg') return '10px';

    return '10px';
  }};
  width: 6em;
  height: 3.4em;

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  ${Input} {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${COLORS.gray};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 3.4em;

  &::before {
    position: absolute;
    content: '';
    height: 2.6em;
    width: 2.6em;
    left: 0.4em;
    bottom: 0.4em;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  ${Input}:checked + & {
    background-color: ${COLORS.green};
  }

  ${Input}:checked + &::before {
    -webkit-transform: translateX(2.6em);
    -ms-transform: translateX(2.6em);
    transform: translateX(2.6em);
  }

  ${Input}:focus + & {
    box-shadow: 0 0 0.1em ${COLORS.blue};
  }

  ${Input}:disabled + & {
    pointer-events: none;
    background: ${COLORS.whiter};
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 679px) {
    margin-top: 10px;
  }
`;
