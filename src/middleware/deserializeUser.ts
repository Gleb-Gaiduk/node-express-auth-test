import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../../utils/jwt';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessTokenHeaer = req.headers.authorization || '';
  const extractedAccessToken = accessTokenHeaer.replace(/^Bearer\s/, '');

  if (!extractedAccessToken) {
    return next();
  }

  const decoded = verifyJwt(extractedAccessToken, 'accessTokenPublicKey');

  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
};

export default deserializeUser;
