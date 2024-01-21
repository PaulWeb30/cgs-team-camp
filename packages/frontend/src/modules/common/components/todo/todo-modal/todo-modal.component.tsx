import { useFormik } from 'formik';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useMutation, useQueryClient } from 'react-query';
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
import todoService from '../../../../service/todo.service';
import { APP_KEYS } from '../../../consts';
import { ITodo } from '../../../types/todo.types';

type TodoModalProps = {
  onClose: (state: boolean) => void;
  isCreateMode: boolean;
  todoInitials?: ITodo;
};

export const TodoModal = ({ onClose, isCreateMode, todoInitials }: TodoModalProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const queryClient = useQueryClient();

  const createTodo = useMutation((data: { title: string; description: string }) =>
    todoService.createTodo(data)
  );

  const updateTodo = useMutation((variables: { id: number; todo: ITodo }) =>
    todoService.updateTodo(String(variables.id), variables.todo)
  );

  const formik = useFormik({
    initialValues: {
      title: todoInitials?.title || '',
      description: todoInitials?.description || ''
    },
    onSubmit: async (values) => {
      try {
        if (isCreateMode) {
          await createTodo.mutateAsync(values);
        } else {
          await updateTodo.mutateAsync({
            id: todoInitials?.id!,
            todo: { ...todoInitials, ...values } as ITodo
          });
        }

        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODO);
        queryClient.refetchQueries(APP_KEYS.QUERY_KEYS.TODOS);
      } catch (error) {
        if (error instanceof Error) setErrorMsg(error.message);
      } finally {
        onClose(false);
      }
    },
    validate: (values) => {
      const errors: { title?: string; description?: string } = {};

      if (!values.title || values.title.length < 3) {
        errors.title = 'Title is required, min 3 symbols';
      }

      if (!values.description || values.description.length < 5) {
        errors.description = 'Description is required, min 5 symbols';
      }

      return errors;
    }
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
          <ErrorDisplay>{errorMsg && `Error happened - ${errorMsg}`}</ErrorDisplay>
        </FormContainer>
      </ModalContainer>
    </Overlay>,
    document.getElementById('portal')!
  );
};
