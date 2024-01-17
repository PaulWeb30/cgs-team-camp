import { ObjectSchema } from 'joi';
import { Response, Request, NextFunction } from 'express';
import { EntityTarget } from 'typeorm';
import { AppDataSource } from '../config/database';

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

export const isExist =
  (entityClass: EntityTarget<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const repository = AppDataSource.getRepository(entityClass);
      const entity = await repository.findOneBy({ id });

      if (!entity) {
        return res.status(404).json({ message: 'Entity not found' });
      }

      next();
    } catch (e) {
      next(e);
    }
  };
