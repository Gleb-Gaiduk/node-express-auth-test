import express from 'express';
import { loginHandler } from '../controller/auth/login.controller';
import { refreshAccessTokenHandler } from '../controller/auth/refreshAccessToken';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../schema/auth/auth.schema';

const authRouter = express.Router();

authRouter.post(
  '/api/login',
  validateResource(createSessionSchema),
  loginHandler
);

authRouter.post('/api/refresh', refreshAccessTokenHandler);

export default authRouter;
