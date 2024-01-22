import styled from 'styled-components';
import { COLORS } from '../../../../theme';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: ${COLORS.white};
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 10px ${COLORS.black};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.p`
  font-size: 1.2rem;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const InputField = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 1rem;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

export const SubmitButton = styled.button`
  background-color: ${COLORS.green};
  color: white;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
`;

export const ErrorDisplay = styled.p`
  color: ${COLORS.red};
  font-size: 1rem;
`;
