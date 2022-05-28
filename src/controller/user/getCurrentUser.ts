import { NextFunction, Request, Response } from 'express';

export async function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.send(res.locals.user);
}
