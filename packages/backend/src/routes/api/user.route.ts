import { Router } from 'express';
import passport from 'passport';
import { isActionTokenValid } from '../../middlewares/auth.middleware';
import userController from '../../controllers/user.controller';

const userRouter: Router = Router();

userRouter.get('/', userController.getAllUsers.bind(userController));

userRouter.get('/:id', userController.getUser.bind(userController));

userRouter.post('/signup', userController.signup.bind(userController));

userRouter.post('/login', userController.login.bind(userController));

userRouter.get(
  '/activationLink/:token',
  isActionTokenValid,
  userController.verifyEmail.bind(userController)
);

userRouter.post(
  '/changePassword',
  passport.authenticate('jwt', { session: false }),
  userController.requestChangePassword.bind(userController)
);

userRouter.patch(
  '/changePassword',
  isActionTokenValid,
  userController.changePassword.bind(userController)
);

export default userRouter;
