'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ActivityType } from 'src/lib/types';
import {
  validatedAction,
  validatedActionWithUser,
} from 'src/server/auth/middleware';
import {
  comparePasswords,
  hashPassword,
  setSession,
} from 'src/server/auth/session';
import { db } from 'src/server/db';
import { getUser } from 'src/server/db/queries';
import { z } from 'zod';

async function logActivity(
  userId: string,
  type: ActivityType,
  ipAddress?: string
) {
  if (userId === null || userId === undefined) {
    return;
  }
  const activity = {
    userId,
    action: type,
    ipAddress: ipAddress ?? '',
  };
  await db.activityLog.create({ data: activity });
}

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data, _formData) => {
  const { email, password } = data;

  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return { error: 'Invalid email or password. Please try again.', email, password };
  }

  const isPasswordValid = await comparePasswords(password, user.password);

  if (!isPasswordValid) {
    return { error: 'Invalid email or password. Please try again.', email, password };
  }

  await Promise.all([
    setSession(user),
    logActivity(user.id, ActivityType.SIGN_IN),
  ]);

  // TODO: redirect user if needed
  // const redirectTo = formData.get('redirect') as string | null;


  redirect('/test');
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUp = validatedAction(signUpSchema, async (data, _formData) => {
  const { email, password } = data;

  const existingUser = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return { error: 'Failed to create user. Please try again.', email, password };
  }

  const passwordHash = await hashPassword(password);

  const newUser = {
    email,
    password: passwordHash,
    name: email,
  };

  const createdUser = await db.user.create({ data: newUser });

  if (!createdUser) {
    return { error: 'Failed to create user. Please try again.' };
  }

  await Promise.all([
    setSession(createdUser),
    logActivity(createdUser.id, ActivityType.SIGN_UP),
  ]);

  redirect('/test');
});

export async function signOut() {

  const user = (await getUser())!;
  await logActivity(user.id, ActivityType.SIGN_OUT);
  (await cookies()).delete('session');
  redirect('/')
}

export async function deleteUsers() {
  (await cookies()).delete('session');

  await db.user.deleteMany({
    where: {
      id: { not: '' }
    }
  })
}

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _, user) => {
    const { currentPassword, newPassword } = data;

    const isPasswordValid = await comparePasswords(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return { error: 'Current password is incorrect.' };
    }

    if (currentPassword === newPassword) {
      return {
        error: 'New password must be different from the current password.',
      };
    }

    const updatedPassword = await hashPassword(newPassword);

    await Promise.all([
      db.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: updatedPassword,
        },
      }),

      logActivity(user.id, ActivityType.UPDATE_PASSWORD),
    ]);

    return { success: 'Password updated successfully.' };
  }
);

const deleteAccountSchema = z.object({
  password: z.string().min(8).max(100),
});

export const deleteAccount = validatedActionWithUser(
  deleteAccountSchema,
  async (data, _, user) => {
    const { password } = data;

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return { error: 'Incorrect password. Account deletion failed.' };
    }

    await logActivity(user.id, ActivityType.DELETE_ACCOUNT);

    // Soft delete
    await db.$executeRaw`
      UPDATE "User"
      SET "deletedAt" = CURRENT_TIMESTAMP, "email" = CONCAT("email", '-', "id", '-deleted')
      WHERE "id" = ${user.id};
    `;

    (await cookies()).delete('session');
    redirect('/login');
  }
);

const updateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
});

export const updateAccount = validatedActionWithUser(
  updateAccountSchema,
  async (data, _, user) => {
    const { name, email } = data;

    await Promise.all([
      db.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: name,
          email: email,
        },
      }),
      logActivity(user.id, ActivityType.UPDATE_ACCOUNT),
    ]);

    return { success: 'Account updated successfully.' };
  }
);
