/* eslint-disable react/react-in-jsx-scope */
import { useFormik } from 'formik';
import ReactDOM from 'react-dom';
import {
  ModalContainer,
  Overlay,
  FormContainer,
  SubmitButton,
  InputField,
  ErrorDisplay,
  ErrorMessage,
  CloseButton,
  ModalHeader,
  ModalTitle
} from './todo-modal.styled';

import { ITodo } from '../../../types/todo.types';
import { useTodoActions } from '../../../../hooks/useTodoActions';
import { CreateTodoSchema } from '../../../validations/schemas';

type TodoModalProps = {
  onClose: (state: boolean) => void;
  isCreateMode: boolean;
  todoInitials?: ITodo;
};

export const TodoModal = ({ onClose, isCreateMode, todoInitials }: TodoModalProps) => {
  const { updateTodo, createTodo, errorMsg } = useTodoActions(() => onClose(false));

  const formik = useFormik({
    initialValues: {
      title: todoInitials?.title || '',
      description: todoInitials?.description || ''
    },
    onSubmit: async (values) => {
      if (isCreateMode) {
        createTodo(values);
      } else {
        updateTodo({
          id: todoInitials?.id,
          data: { ...todoInitials, ...values } as ITodo
        });
      }
    },
    validationSchema: CreateTodoSchema
  });
  return ReactDOM.createPortal(
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{isCreateMode ? 'Create' : 'Update'} todo</ModalTitle>
          <CloseButton type="submit" onClick={() => onClose(false)}>
            X
          </CloseButton>
        </ModalHeader>

        <FormContainer onSubmit={formik.handleSubmit}>
          <InputField
            type="text"
            name="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage>
            {formik.errors.title && formik.touched.title && formik.errors.title}
          </ErrorMessage>
          <InputField
            type="text"
            name="description"
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage>
            {formik.errors.description && formik.touched.description && formik.errors.description}
          </ErrorMessage>
          <SubmitButton type="submit">{isCreateMode ? 'Create' : 'Update'}</SubmitButton>
          <ErrorDisplay>{errorMsg && errorMsg}</ErrorDisplay>
        </FormContainer>
      </ModalContainer>
    </Overlay>,
    document.getElementById('portal')!
  );
};
