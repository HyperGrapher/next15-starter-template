/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type z } from 'zod';
import { type User } from '@prisma/client';
import { getUser } from 'src/server/db/queries';
// import { redirect } from 'next/navigation';

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: unknown; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      // TODO: error message
      console.log({ erry: result.error.errors[0]?.message });

      return { error: result.error.errors[0]?.message } as T;
    }

    return action(result.data, formData);
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<unknown, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: User
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<unknown, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const user = await getUser();
    if (!user) {
      return {
        error: 'Please sign in to continue',
        code: 'UNAUTHENTICATED'
      } as T;
    }

    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      // TODO: error message
      return { error: result.error.errors[0]?.message } as T;
    }

    return action(result.data, formData, user);
  };
}
