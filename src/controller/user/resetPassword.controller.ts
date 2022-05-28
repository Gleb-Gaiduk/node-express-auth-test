import { NextFunction, Request, Response } from 'express';
import { ResetPasswordInput } from '../../schema/user/resetPassword.schema';
import { findUserById } from '../../service/user/user.service';

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
  res: Response,
  next: NextFunction
) {
  const { id, passwordResetCode } = req.params;
  const { password } = req.body;

  const user = await findUserById(id);

  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode !== passwordResetCode
  ) {
    return res.status(400).send('Could not reset user password');
  }

  user.passwordResetCode = null;
  user.password = password;

  await user.save();

  return res.send('Successfully updated user password');
}
