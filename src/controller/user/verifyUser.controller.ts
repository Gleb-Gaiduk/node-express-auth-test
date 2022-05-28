import { Request, Response } from 'express';
import { VerifyUserInput } from '../../schema/user/verifyUser.schema';
import { findUserById } from '../../service/user/user.service';

export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  const { id, verificationCode } = req.params;

  const user = await findUserById(id);

  if (!user) {
    return res.send('Could not verify user');
  }

  if (user.verified) {
    return res.send('User has been already verified');
  }

  if (user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();

    return res.send('User has been successfully verified');
  }

  return res.send('Could not verify user');
}
