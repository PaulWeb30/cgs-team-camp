import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { ForgotPasswordSchema } from '../../../validations/schemas';
import { Container } from '../../profile/profile-container';
import {
  FormSecond,
  SubmitButton,
  InputField,
  ErrorDisplay,
  ErrorMessage
} from '../../todo/todo-modal/todo-modal.styled';
import { useAuth } from '../../../../hooks/useAuth';
import { Loader } from '../../todo/loader';

export const AuthForgot = () => {
  const { actionToken } = useParams();
  const { forgotPassword } = useAuth({ fromPage: null });

  const [errorMsg, setErrorMsg] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
      forgotPassword.mutate(
        { ...values, token: actionToken as string },
        {
          onError: (e) => {
            if (!(e instanceof AxiosError)) return;
            if (!e.response?.data) return;
            setErrorMsg(e?.response?.data?.message);
          }
        }
      );
    },
    validationSchema: ForgotPasswordSchema
  });

  if (forgotPassword.isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <FormSecond onSubmit={formik.handleSubmit}>
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage>
          {formik.errors.password && formik.touched.password && formik.errors.password}
        </ErrorMessage>
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage>
          {formik.errors.confirmPassword &&
            formik.touched.confirmPassword &&
            formik.errors.confirmPassword}
        </ErrorMessage>
        <SubmitButton type="submit">Reset password</SubmitButton>
        <ErrorDisplay>{errorMsg && `Error happened - ${errorMsg}`}</ErrorDisplay>
      </FormSecond>
    </Container>
  );
};
