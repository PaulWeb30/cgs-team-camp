import { ObjectSchema } from 'joi';
import { Response, Request, NextFunction } from 'express';
import { EntityTarget, Repository, FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../config/database';

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

type EntityType = {
  id: string;
};

export const isExist =
  <T extends EntityType>(
    entityClass: EntityTarget<T>,
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const repository: Repository<T> = AppDataSource.getRepository(entityClass);

      const query: FindOptionsWhere<T> = { id } as FindOptionsWhere<T>;

      const entity = await repository.findOneBy(query);

      if (!entity) {
        return res.status(404).json({ message: 'Entity not found' });
      }

      req.entity = entity;

      next();
    } catch (e) {
      next(e);
    }
  };

export const isAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user;
    const { id: todoId } = req.params;

    const todo = await todoService.findOne({ id: todoId });

    const authorId = todo?.author?.id;
    const isPrivate = todo?.isPrivate;

    if (authorId !== userId && isPrivate) {
      throw new Error('NO_AUTHOR');
    }

    next();
  } catch (e) {
    next(e);
  }
};
