// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN'
};

// React-query keys
export const QUERY_KEYS = {
  TODOS: 'todos'
};

// Backend Routes
export const BACKEND_KEYS = {
  ROOT: 'todos',
  CREATE: 'todos/create',
  TODO: (todoId?: string) => `todos/${todoId}`,
  UPDATE: (todoId?: string) => `todos/update/${todoId}`,
  DELETE: (todoId?: string) => `todos/${todoId}`
};

export const ROUTER_KEYS = {
  ROOT: '/',
  HOME: '/home',
  TODOS: '/todos',
  TODO: '/todo/:id'
};
