import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import authService from '../service/auth.service';

type IUseAuthProps = { fromPage: string | null };

export const useAuth = ({ fromPage }: IUseAuthProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const redirectBack = fromPage || APP_KEYS.ROUTER_KEYS.ROOT;

  const login = useMutation(
    (data: { email: string; password: string }) => authService.login(data.email, data.password),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.LOGIN);
        navigate(redirectBack);
      }
    }
  );

  const signup = useMutation(
    (data: { email: string; password: string }) => authService.signup(data.email, data.password),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.SIGNUP);
        navigate(redirectBack);
      }
    }
  );

  const logout = useMutation(() => authService.logout(), {
    onSuccess: () => {
      navigate(APP_KEYS.ROUTER_KEYS.LOGIN);
    }
  });

  const changePassword = useMutation(
    (data: { oldPassword: string; password: string }) =>
      authService.changePassword(data.oldPassword, data.password),
    {
      onSuccess: () => {
        navigate(APP_KEYS.ROUTER_KEYS.LOGIN);
      }
    }
  );

  const requestForgotPassword = useMutation((email: string) =>
    authService.requestForgotPassword(email)
  );

  const forgotPassword = useMutation(
    (data: { token: string; password: string }) =>
      authService.forgotPassword(data.token, data.password),
    {
      onSuccess: () => {
        navigate(APP_KEYS.ROUTER_KEYS.LOGIN);
      }
    }
  );

  return { login, signup, logout, changePassword, requestForgotPassword, forgotPassword };
};
