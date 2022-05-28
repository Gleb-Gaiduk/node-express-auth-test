import { NextFunction, Response, Request } from 'express';
import CreateSectionInput from '../../schema/auth/auth.schema';
import { signAccessToken } from '../../service/auth/accessToken.service';
import { signRefreshToken } from '../../service/auth/refreshToken.service';
import { findUserByEmail } from '../../service/user/user.service';

export async function loginHandler(
  req: Request<{}, {}, CreateSectionInput>,
  res: Response,
  next: NextFunction
) {
  const message = 'Invalid email or password';
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(message);
  }

  if (!user.verified) {
    return res.send('Please verify your email');
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send(message);
  }

  const accessToken = signAccessToken(user);
  const refreshToken = await signRefreshToken({ userId: user._id });

  res.send({
    accessToken,
    refreshToken
  });
}
