import { redirect } from 'next/navigation';
import TempUserDelete from 'src/components/TempUserDelete';
import { db } from 'src/server/db';

// promise is not required but await needs it.
const UsersPage = async ({ params }: { params: Promise<{ userid: string }> }) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { userid } = await params
    const user = await db.user.findUnique({
        where: {
            id: userid
        }
    });

    if (!user) {
        redirect('/404');
    }

    return (
        <div className=''>
            <h1 className='text-zinc-200 text-4xl text-center mt-8'>{user?.email}</h1>
            <p className='text-zinc-400 text-center mt-8'>{userid}</p>

            <TempUserDelete id={userid} />
        </div>
    )
}


export default UsersPage