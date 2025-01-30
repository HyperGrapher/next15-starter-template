import { getUserById } from 'src/server/db/queries';
import { notFound } from 'next/navigation';
import TempUserDelete from 'src/components/TempUserDelete';

interface PageProps {
  params: {
    userid: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function UserPage({ params }: PageProps) {
  const user = await getUserById(params.userid);
  
  if (!user) {
    notFound();
  }

  return (
    <div className=''>
      <h1 className='text-zinc-200 text-4xl text-center mt-8'>{user?.email}</h1>
      <p className='text-zinc-400 text-center mt-8'>{params.userid}</p>

      <TempUserDelete id={params.userid} />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const user = await getUserById(params.userid);
  
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