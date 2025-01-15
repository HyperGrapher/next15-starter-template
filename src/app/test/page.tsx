import { LocaleSelector } from 'src/components/LocaleSelector';
import TempAuthComp from 'src/components/TempAuthComp';
import { TempUsers } from 'src/components/TempUsers';
import { cn } from 'src/lib/utils';
import { db } from 'src/server/db';

export default async function TestPage() {
  const users = await db.user.findMany();

  return (
    <main className={cn('flex min-h-screen flex-col items-center pt-6')}>
      <LocaleSelector />
      <TempAuthComp />
      <TempUsers users={users} />
    </main>
  );
}
