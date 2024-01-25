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
  '/requestForgotPassword',
  userController.requestForgotPassword.bind(userController)
);

userRouter.patch(
  '/forgotPassword/:token',
  isActionTokenValid,
  userController.forgotPassword.bind(userController)
);

userRouter.patch(
  '/changePassword',
  passport.authenticate('jwt', { session: false }),
  userController.changePassword.bind(userController)
);

export default userRouter;
