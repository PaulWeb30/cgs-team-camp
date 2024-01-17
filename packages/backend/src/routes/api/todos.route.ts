import { Router } from 'express';

import todoController from '../../controllers/todo.controller';

import { todoValidationSchema } from '../../validation/schemas';
import { checkIsBodyValid, isExist } from '../../middlewares/common.middlewares';

import { Todo } from '../../entities/Todo.entity';

const todosRouter: Router = Router();

todosRouter.get('', todoController.getAllTodo.bind(todoController));

todosRouter.get('/:id', isExist(Todo), todoController.getTodo.bind(todoController));

todosRouter.post(
  '/create',
  checkIsBodyValid(todoValidationSchema),
  todoController.createTodo.bind(todoController)
);

todosRouter.put(
  '/update/:id',
  checkIsBodyValid(todoValidationSchema),
  isExist(Todo),
  todoController.updateTodo.bind(todoController)
);

todosRouter.delete('/:id', isExist(Todo), todoController.deleteTodo.bind(todoController));

export default todosRouter;
