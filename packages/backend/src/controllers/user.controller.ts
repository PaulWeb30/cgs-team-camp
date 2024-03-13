import { Response, Request, NextFunction } from 'express';
import UserService from '../services/user.service';
import { sendEmail } from '../config/nodemailer';

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(_: Request, res: Response) {
    const users = await this.userService.findAll();
    res.send(users);
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.findOne({ id });
    res.send(user);
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      const userExisted = await this.userService.findOne({ email: body.email });

      if (userExisted) {
        throw new Error('User already exists');
      }
      const passwordHash = await this.userService.hashPassword(body.password);
      const user = await this.userService.createUser({ ...body, passwordHash });

      const token = await this.userService.generateToken({ id: user.id });
      const activationToken = await this.userService.generateToken({ email: user.email });

      const activationLink = `${process.env.SERVER_URL}/users/activationLink/${activationToken}`;
      await sendEmail(user.email, activationLink, 'VERIFICATION');

      res.status(201).json({ user, token, message: 'SIGNUP_SUCCESSFUL' });
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const user = await this.userService.findOne({ email: body.email });
      if (!user) {
        throw new Error('No user found');
      }
      const isValidPass = await this.userService.comparePasswords(body.password, user.passwordHash);

      if (!isValidPass) {
        throw new Error('Password is wrong');
      }

      const token = await this.userService.generateToken({ id: user.id });

      res.status(201).json({ token, message: 'LOGIN_SUCCESSFUL' });
    } catch (e) {
      next(e);
    }
  }

  async requestForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new Error('No user found');
      }

      const activationToken = await this.userService.generateToken({ email: user.email });

      const activationLink = `${process.env.CLIENT_URL}/auth/forgotPassword/${activationToken}`;
      await sendEmail(user.email, activationLink, 'FORGOT_PASSWORD');

      res.status(200).json({ message: 'REQUEST_FORGOT_PASSWORD_SUCCESSFUL' });
    } catch (e) {
      next(e);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req;
      const { password } = req.body;

      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new Error('No user found');
      }

      const passwordHash = await this.userService.hashPassword(password);

      await this.userService.updateUser(user.id, { ...user, passwordHash });

      res.status(200).json({ message: 'FORGOT_PASSWORD_SUCCESSFUL' });
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user as string;
      const { password, oldPassword } = req.body;

      const user = await this.userService.findOne({ id: userId });

      if (!user) {
        throw new Error('No user found');
      }

      const isValidPass = await this.userService.comparePasswords(oldPassword, user.passwordHash);

      if (!isValidPass) {
        throw new Error('Your current password is wrong');
      }

      const passwordHash = await this.userService.hashPassword(password);

      await this.userService.updateUser(userId, { ...user, passwordHash });

      res.status(200).json({ message: 'CHANGE_PASSWORD_SUCCESSFUL' });
    } catch (e) {
      next(e);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req;
      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new Error('USER_NOT_FOUND');
      }

      await this.userService.updateUser(user?.id!, { ...user, isVerified: true });

      res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController(new UserService());
export default userController;
