import { db } from './index';
import { cookies } from 'next/headers';
import { verifyToken } from 'src/server/auth/session';
import { unstable_cache } from 'next/cache';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie?.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData?.user ||
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

export const getUserById = unstable_cache(
  async (id: string) => {
    try {
      const user = await db.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
        }
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },
  ['user-by-id'], // cache key prefix
  {
    revalidate: 60, // cache for 60 seconds
    tags: ['user'], // tag for cache invalidation
  }
);
