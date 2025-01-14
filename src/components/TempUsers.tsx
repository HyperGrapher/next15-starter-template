import type { User } from '@prisma/client'
import React from 'react'

export const TempUsers = ({users}: {users: User[]}) => {
  return (
    <div>
        <div className="bg-zinc-200x space-y-2 mt-8 p-6 rounded-lg min-w-64">
        <h1 className="text-3xl font-black text-center">Users: {users.length}</h1>

        {users.length > 0 ?
          users?.map((user) => (
            <div key={user.id} className="p-2 rounded-md">
              <h2 className="text-xl font-medium">{user.name}</h2>
              <p>{user.email}</p>
            </div>
          )) :
          <div className="p-2">
            <p className="text-red-500 font-medium text-center">No users found...</p>
          </div>
        }
      </div>
    </div>
  )
}
