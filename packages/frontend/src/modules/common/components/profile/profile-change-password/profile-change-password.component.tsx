import React, { useState } from 'react';
import { useFormik } from 'formik';
import { AxiosError } from 'axios';
import { ChangePasswordSchema } from '../../../validations/schemas';

import {
  FormContainer,
  SubmitButton,
  InputField,
  ErrorDisplay,
  ErrorMessage
} from '../../todo/todo-modal/todo-modal.styled';
import { useAuth } from '../../../../hooks/useAuth';

export const ProfileChangePassword = () => {
  const { changePassword } = useAuth({ fromPage: null });
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
      changePassword.mutate(values, {
        onError: (e) => {
          if (!(e instanceof AxiosError)) return;
          if (!e.response?.data) return;
          setErrorMsg(e?.response?.data?.message);
        }
      });
    },
    validationSchema: ChangePasswordSchema
  });
  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <InputField
        type="password"
        name="oldPassword"
        placeholder="Old password"
        value={formik.values.oldPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <ErrorMessage>
        {formik.errors.oldPassword && formik.touched.oldPassword && formik.errors.oldPassword}
      </ErrorMessage>
      <InputField
        type="text"
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
      <SubmitButton type="submit">Change</SubmitButton>
      <ErrorDisplay>{errorMsg && `Error happened - ${errorMsg}`}</ErrorDisplay>
    </FormContainer>
  );
};
