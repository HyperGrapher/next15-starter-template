"use client"

import Link from 'next/link';
import React from 'react'
import { useUser } from "src/server/auth";
import { Button } from 'src/components/ui/button';
import { signOut } from 'src/app/(login)/actions';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

const TempAuthComp = () => {
    const { user, setUser } = useUser();
     const t = useTranslations('home');


    async function handleSignOut() {
        setUser(null);
        await signOut();
    }

    return (
        <div className="flex flex-col items-center justify-center">
        <h1 data-testid="intl-title" className="text-3xl font-black text-center">{t('title')}</h1>

            {user ?
                <form action={handleSignOut} className="p-1">
                    <Button data-testid="logout" variant={'destructive'} type="submit" className="flex w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                    </Button>
                </form>

                : (

                    <div className="flex gap-4">
                        <Link className="mt-4 bg-green-600 text-white px-2 py-1 rounded" href="/login">Sign In</Link>
                        <Link className="mt-4 bg-violet-600 text-white px-2 py-1 rounded" href="/register">Sign Up</Link>
                    </div>
                )
            }
            <div className='p-2 mt-4 rounded-lg'>

                <pre className='text-xs'>
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>
        </div>
    )
}

export default TempAuthComp