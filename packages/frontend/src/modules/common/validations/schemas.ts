import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(passwordRules, 'Password need contains number and uppercase word')
    .required('No password provided.')
});

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(passwordRules, 'Password need contains numbers and uppercase word')
    .required('No password provided.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password')
});

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .matches(passwordRules, 'Password need contains numbers and uppercase word')
    .required('No password provided.'),
  password: Yup.string()
    .matches(passwordRules, 'Password need contains numbers and uppercase word')
    .required('No password provided.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password')
});

export const ForgotPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(passwordRules, 'Password need contains numbers and uppercase word')
    .required('No password provided.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password')
});

export const RequestForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required')
});

export const CreateTodoSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Min 3 symbols').required('Title required'),
  description: Yup.string().min(5, 'Min 5 symbols').required('Description required')
});
