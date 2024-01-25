// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN'
};

// React-query keys
export const QUERY_KEYS = {
  TODOS: 'todos',
  TODO: 'todo',
  LOGIN: 'login',
  SIGNUP: 'signup',
  USER: 'user'
};

// Backend Routes
export const BACKEND_KEYS = {
  ROOT: 'todos',
  CREATE: 'todos/create',
  TODO: (todoId?: string) => `todos/${todoId}`,
  UPDATE: (todoId?: string) => `todos/update/${todoId}`,
  DELETE: (todoId?: string) => `todos/${todoId}`,
  LOGIN: 'users/login',
  SIGNUP: 'users/signup',
  CHANGE_PASSWORD: 'users/changePassword',
  REQUEST_FORGOT_PASSWORD: 'users/requestForgotPassword',
  FORGOT_PASSWORD: (token: string) => `users/forgotPassword/${token}`
};

export const ROUTER_KEYS = {
  NOT_FOUND: '*',
  ROOT: '/',
  HOME: '/home',
  TODOS: '/todos',
  TODO: '/todos/:id',
  PROFILE: '/profile',
  AUTH: '/auth',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgotPassword/:actionToken'
};
