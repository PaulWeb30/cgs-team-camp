import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';

import { APP_KEYS } from '../../../consts';
import { SignupSchema } from '../../../validations/schemas';
import { Container } from '../../profile/profile-container';
import {
  FormSecond,
  SubmitButton,
  InputField,
  ErrorDisplay,
  ErrorMessage
} from '../../todo/todo-modal/todo-modal.styled';
import { useAuth } from '../../../../hooks/useAuth';
import { GoBack } from '../../todo/goBack/goBack.component';
import { Loader } from '../../todo/loader';

export const AuthSignup = () => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const { signup } = useAuth({ fromPage });
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
      signup.mutate(values, {
        onError: (e) => {
          if (!(e instanceof AxiosError)) return;
          if (!e.response?.data) return;
          setErrorMsg(e?.response?.data?.message);
        }
      });
    },
    validationSchema: SignupSchema
  });

  if (signup.isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <FormSecond onSubmit={formik.handleSubmit}>
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
        <SubmitButton type="submit">Signup</SubmitButton>
        <ErrorDisplay>{errorMsg && `Error happened - ${errorMsg}`}</ErrorDisplay>
        <Link to={APP_KEYS.ROUTER_KEYS.LOGIN}>Already, have an account?</Link>
        <GoBack />
      </FormSecond>
    </Container>
  );
};
