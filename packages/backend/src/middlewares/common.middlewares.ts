import { ObjectSchema } from 'joi';
import { Response, Request, NextFunction } from 'express';
import TodoService from '../services/todo.service';

const todoService = new TodoService();

export const checkIsBodyValid =
  (validatorType: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = validatorType.validate(req.body);

      if (validate.error) {
        return res.status(400).json({ error: `Validation failed: ${validate.error.message}` });
      }

      req.body = validate.value;

      next();
    } catch (e) {
      next(e);
    }
  };

export const isExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const todo = await todoService.findOne({ id });

    if (!todo) {
      return res.status(404).json({ message: 'No existing object' });
    }

    next();
  } catch (e) {
    next(e);
  }
};
