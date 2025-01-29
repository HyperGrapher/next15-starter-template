
"use client";
import React, { useEffect, useState } from 'react'
import { type ActionState } from 'src/server/auth/middleware';
import { Button } from 'src/components/ui/button';
import { useActionState } from 'react';
import { deleteUserAction } from 'src/server/users';


const TempUserDelete = ({ id }: { id: string }) => {
    const [error, setError] = useState<string | null>(null);
    const [fadingOut, setFadingOut] = useState(false);

    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        deleteUserAction,
        { error: '' }
    );

    useEffect(() => {
        if (!pending) {
            setFadingOut(false);
            if (state.error) setError(state.error);

            const timer = setTimeout(() => {
                setFadingOut(true);
                setTimeout(() => setError(null), 500); // Extra 500ms for fadeout
            }, 2500);

            return () => clearTimeout(timer);
        } else setError(null)

    }, [state.error, pending]);


    return (
        <div className='my-6 space-y-4'>


            <form action={formAction}>
                <div className='flex flex-col gap-4 max-w-64 mx-auto'>
                    <input type='hidden' name='id' value={id} />
                    <Button variant={'destructive'} type='submit' className='w-full'>
                        Delete
                    </Button>
                </div>
            </form>

            <form action={formAction}>
                <div className='flex flex-col gap-4 max-w-64 mx-auto'>
                    <input type='hidden' name='id' value={id + "--nope-cannot-delete"} />
                    <Button variant={'destructive'} type='submit' className='w-full'>
                        Fails to Delete
                    </Button>
                </div>
            </form>

            {pending && <div className='text-green-500 max-w-fit mx-auto text-4xl'>Loading...</div>}


            {error && (
                <div
                    className={`text-red-500 max-w-fit mx-auto transition-opacity duration-500 ${fadingOut ? 'opacity-0' : 'opacity-100'
                        }`}
                >
                    {error}
                </div>
            )}

        </div>
    );
};

export default TempUserDelete