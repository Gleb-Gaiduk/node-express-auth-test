import express from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));

router.use([authRouter, userRouter]);

export default router;
