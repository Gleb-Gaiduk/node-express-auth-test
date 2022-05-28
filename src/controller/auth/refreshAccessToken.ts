import { NextFunction, Response, Request } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../../../utils/jwt';
import { signAccessToken } from '../../service/auth/accessToken.service';
import { findSessionById } from '../../service/auth/session.service';
import { findUserById } from '../../service/user/user.service';

export async function refreshAccessTokenHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken = get(req, 'headers.x-refresh');

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    'refreshTokenPublicKey'
  );

  if (!decoded) {
    return res.status(401).send('Could not refresh access token');
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send('Could not refresh access token');
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send('Could not refresh access token');
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
}
