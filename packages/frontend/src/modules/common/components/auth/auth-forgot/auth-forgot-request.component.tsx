import React, { useState } from 'react';
import { useFormik } from 'formik';
import { AxiosError } from 'axios';
import { RequestForgotPasswordSchema } from '../../../validations/schemas';
import { Container } from './auth-forgot.styled';
import {
  FormContainer,
  SubmitButton,
  InputField,
  ErrorDisplay,
  ErrorMessage
} from '../../todo/todo-modal/todo-modal.styled';
import { useAuth } from '../../../../hooks/useAuth';
import { Loader } from '../../todo/loader';

export const AuthForgotRequest = () => {
  const { requestForgotPassword } = useAuth({ fromPage: null });
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async (values) => {
      requestForgotPassword.mutate(values.email, {
        onError: (e) => {
          if (!(e instanceof AxiosError)) return;
          if (!e.response?.data) return;
          setErrorMsg(e?.response?.data?.message);
        },
        onSuccess: () => {
          setErrorMsg('Restore link has been sended');
        }
      });
    },
    validationSchema: RequestForgotPasswordSchema
  });

  if (requestForgotPassword.isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <FormContainer onSubmit={formik.handleSubmit}>
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage>
          {formik.errors.email && formik.touched.email && formik.errors.email}
        </ErrorMessage>
        <SubmitButton type="submit">Send link</SubmitButton>
        <ErrorDisplay>{errorMsg && errorMsg}</ErrorDisplay>
      </FormContainer>
    </Container>
  );
};
