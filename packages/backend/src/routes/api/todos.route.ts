import { Router } from 'express';

import todoController from '../../controllers/todo.controller';

import { todoValidationSchema } from '../../validation/schemas';
import { checkIsBodyValid, isExist } from '../../middlewares/common.middlewares';

const todosRouter: Router = Router();

todosRouter.get('', todoController.getAllTodo.bind(todoController));

todosRouter.get('/:id', isExist, todoController.getTodo.bind(todoController));

todosRouter.post(
  '/create',
  checkIsBodyValid(todoValidationSchema),
  todoController.createTodo.bind(todoController)
);

todosRouter.put(
  '/update/:id',
  checkIsBodyValid(todoValidationSchema),
  isExist,
  todoController.updateTodo.bind(todoController)
);

todosRouter.delete('/:id', isExist, todoController.deleteTodo.bind(todoController));

export default todosRouter;
