import { db } from './index';
import { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { verifyToken } from 'src/server/auth/session';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'string'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = db.user.findFirst({
    where: {
      id: sessionData.user.id,
    },
  });

  return user;
}
