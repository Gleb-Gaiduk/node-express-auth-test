import express from 'express';
import { createUserHandler } from '../controller/user/createUser.controller';
import { forgotPasswordHandler } from '../controller/user/forgotPassword.controller';
import { getCurrentUser } from '../controller/user/getCurrentUser';
import { resetPasswordHandler } from '../controller/user/resetPassword.controller';
import { verifyUserHandler } from '../controller/user/verifyUser.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { createUserSchema } from '../schema/user/createUser.schema';
import { forgotPasswordSchema } from '../schema/user/forgotPassword.schema';
import { resetPasswordSchema } from '../schema/user/resetPassword.schema';
import { verifyUserSchema } from '../schema/user/verifyUser.schema';

const userRouter = express.Router();

userRouter.post(
  '/api/users',
  validateResource(createUserSchema),
  createUserHandler
);

userRouter.post(
  '/api/users/verify/:id/:verificationCode',
  validateResource(verifyUserSchema),
  verifyUserHandler
);

userRouter.post(
  '/api/users/forgotpassword',
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

userRouter.post(
  '/api/users/forgotpassword/:id/:passwordResetCode',
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

userRouter.get('/api/users/me', requireUser, getCurrentUser);

export default userRouter;
