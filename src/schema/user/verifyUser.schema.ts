import { object, string, TypeOf } from 'zod';

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string()
  })
});

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
