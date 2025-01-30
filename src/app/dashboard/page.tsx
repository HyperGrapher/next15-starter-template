import { getUser } from 'src/server/db/queries';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getUser();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-zinc-200">Dashboard</h1>
    </div>
  );
}

// Add metadata
export const metadata = {
  title: 'Dashboard',
  description: 'Your personal dashboard'
}; 