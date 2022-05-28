import { Request, Response } from 'express';
import sendEmail from '../../../utils/mailer';
import { CreateUserInput } from '../../schema/user/createUser.schema';
import { createUser } from '../../service/user/user.service';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    await sendEmail({
      from: 'test@example.com',
      to: user.email,
      subject: 'Please verify your account',
      text: `Verification code ${user.verificationCode}. Id: ${user._id}`
    });

    return res.send('User successfully created');
  } catch (error: any) {
    // Unique constraint has been violated
    if (error.code === 11000) {
      return res.status(409).send('Account already exists');
    }

    return res.status(500).send(error);
  }
}
