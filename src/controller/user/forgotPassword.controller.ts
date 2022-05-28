import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import log from '../../../utils/logger';
import sendEmail from '../../../utils/mailer';
import { ForgotPasswordInput } from '../../schema/user/forgotPassword.schema';
import { findUserByEmail } from '../../service/user/user.service';

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response,
  next: NextFunction
) {
  const message =
    'If a user with that email is registered you will receive a password rest email';
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    log.debug(`User with email ${email} does not exist`);
    return res.send(message);
  }

  if (!user.verified) {
    return res.send('User is not verified');
  }

  const passwordResetCode = nanoid();
  user.passwordResetCode = passwordResetCode;

  await user.save();

  await sendEmail({
    to: user.email,
    from: 'test@example.com',
    text: `Password reseet code: ${passwordResetCode}. Id ${user._id}`
  });

  log.debug(`Password reset email sent to ${email}`);

  return res.send(message);
}
