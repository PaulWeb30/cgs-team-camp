import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { LoginSchema } from '../../../validations/schemas';
import { Container } from './auth-login.styled';
import {
  FormContainer,
  SubmitButton,
  InputField,
  ErrorDisplay,
  ErrorMessage
} from '../../todo/todo-modal/todo-modal.styled';
import { useAuth } from '../../../../hooks/useAuth';
import { APP_KEYS } from '../../../consts';

export const AuthLogin = () => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const { login } = useAuth({ fromPage });

  const [errorMsg, setErrorMsg] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      login.mutate(values, {
        onError: (e) => {
          if (!(e instanceof AxiosError)) return;
          if (!e.response?.data) return;
          setErrorMsg(e?.response?.data?.message);
        }
      });
    },
    validationSchema: LoginSchema
  });
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
        <SubmitButton type="submit">{formik.isSubmitting ? 'Submitting...' : 'Login'}</SubmitButton>
        <ErrorDisplay>{errorMsg && `Error happened - ${errorMsg}`}</ErrorDisplay>
        <Link to={APP_KEYS.ROUTER_KEYS.SIGNUP}>Dont have an account? Create.</Link>
      </FormContainer>
    </Container>
  );
};
