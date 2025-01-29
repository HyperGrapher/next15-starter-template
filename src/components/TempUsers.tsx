"use client"

import type { User } from '@prisma/client'
import React from 'react'
import { deleteUsers } from 'src/app/(login)/actions';
import { useUser } from 'src/server/auth';
import { Delete, } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export const TempUsers = ({ users }: { users: User[] }) => {

  const { user, setUser } = useUser();

  async function handleDeleteUsers() {
    setUser(null);
    await deleteUsers();

  }

  return (
    <div>
      <div className="bg-zinc-200x space-y-2 mt-8 p-6 rounded-lg min-w-64">
        {user && <div className='max-w-fit mx-auto text-center flex items-center'>
          <div className='font-bold'>Auth user: {" "} </div>
          <p className=' text-green-500 text-center' data-testid="auth-email">{user?.email}</p>
        </div>}
        <h3 data-testid="user-count" className="text-1xl font-black text-center">Users: {users.length}</h3>


        {users.length > 0 ?
          users?.map((user, idx) => (
            <div key={user.id} className="p-2 rounded-md">
              <Link className='underline text-blue-500' href={`/users/${user.id}`} data-testid={`user-${idx}`}>{user.email}</Link>
            </div>
          )) :
          <div className="p-2">
            <p data-testid='no-users-msg' className="text-red-500 font-medium text-center">No users found...</p>
          </div>
        }

        {users.length > 0 ?
          <form action={handleDeleteUsers} className="p-1">
            <Button variant={'destructive'} type="submit" className="flex w-full">
              <Delete className="mr-2 h-4 w-4" />
              <span>Delete Users</span>
            </Button>
          </form>
          : null
        }
      </div>
    </div>
  )
}
