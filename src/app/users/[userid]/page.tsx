import { getUserById } from 'src/server/db/queries';
import { notFound } from 'next/navigation';
import TempUserDelete from 'src/components/TempUserDelete';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{
    userid: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;

}
export default async function UserPage({ params }: Props) {
  const userid = (await params).userid
  const user = await getUserById(userid);

  if (!user) {
    notFound();
  }

  return (
    <div className=''>
      <h1 className='text-zinc-200 text-4xl text-center mt-8'>{user?.email}</h1>
      <p className='text-zinc-400 text-center mt-8'>{userid}</p>

      <TempUserDelete id={userid} />
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const userid = (await params).userid
  const user = await getUserById(userid);

  if (!user) {
    return {
      title: 'User Not Found',
    };
  }

  return {
    title: `${user.name}'s Profile`,
    description: `View ${user.name}'s profile page`,
  };
}