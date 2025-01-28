"use client"

import type { User } from '@prisma/client'
import React from 'react'
import { deleteUsers } from 'src/app/(login)/actions';
import { useUser } from 'src/server/auth';
import { Delete, } from 'lucide-react';
import { Button } from './ui/button';

export const TempUsers = ({ users }: { users: User[] }) => {

  const { user, setUser } = useUser();

  async function handleDeleteUsers() {
    setUser(null);
    await deleteUsers();

  }

  return (
    <div>
      <div className="bg-zinc-200x space-y-2 mt-8 p-6 rounded-lg min-w-64">
        <h3 data-testid="user-count" className="text-3xl font-black text-center">Users: {users.length}</h3>

        {user && <p data-testid="auth-email">{user?.email}</p>}

        {users.length > 0 ?
          users?.map((user, idx) => (
            <div key={user.id} className="p-2 rounded-md">
              <p data-testid={`user-${idx}`}>{user.email}</p>
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
