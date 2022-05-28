import { signJwt } from '../../../utils/jwt';
import { createSession } from './session.service';

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({ userId });

  const refreshToken = signJwt(
    {
      session: session._id
    },
    'refreshTokenPrivateKey',
    { expiresIn: '1m' }
  );

  return refreshToken;
}
