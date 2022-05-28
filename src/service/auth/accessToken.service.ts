import { DocumentType } from '@typegoose/typegoose';
import { signJwt } from '../../../utils/jwt';
import { privateFields, User } from '../../model/user.model';
import { omit } from 'lodash';

export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), privateFields);
  const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
    expiresIn: '15m'
  });

  return accessToken;
}
