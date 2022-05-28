import { object, string, TypeOf } from 'zod';

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email')
  })
});

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
