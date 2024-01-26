import { Router } from 'express';

import passport from 'passport';
import todoController from '../../controllers/todo.controller';

import { todoValidationSchema } from '../../validation/schemas';
import { checkIsBodyValid, isExist, isAuthor } from '../../middlewares/common.middleware';
import { checkEmailIsVerified } from '../../middlewares/auth.middleware';

import { Todo } from '../../entities/Todo.entity';

const todosRouter: Router = Router();

todosRouter.get(
  '',
  passport.authenticate('jwt', { session: false }),
  todoController.getAllTodo.bind(todoController)
);

todosRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isExist(Todo),
  isAuthor,
  todoController.getTodo.bind(todoController)
);

todosRouter.post(
  '/create',
  checkIsBodyValid(todoValidationSchema),
  passport.authenticate('jwt', { session: false }),
  checkEmailIsVerified,
  todoController.createTodo.bind(todoController)
);

todosRouter.put(
  '/update/:id',
  checkIsBodyValid(todoValidationSchema),
  passport.authenticate('jwt', { session: false }),
  isExist(Todo),
  todoController.updateTodo.bind(todoController)
);

todosRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isExist(Todo),
  isAuthor,
  todoController.deleteTodo.bind(todoController)
);

export default todosRouter;
