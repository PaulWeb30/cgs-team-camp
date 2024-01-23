import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import UserService from '../services/user.service';

const userService = new UserService();

export const isActionTokenValid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;

    const decodedToken: JwtPayload | string = await userService.verifyToken(token);

    req.email = (decodedToken as JwtPayload).email;

    next();
  } catch (e) {
    next(e);
  }
};

export const checkEmailIsVerified = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user;

    const user = await userService.findOne({ id: userId });

    if (!user?.isVerified) {
      throw new Error("User email isn't verified");
    }

    next();
  } catch (e) {
    next(e);
  }
};
