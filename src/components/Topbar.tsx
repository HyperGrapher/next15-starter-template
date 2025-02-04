'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { CircleIcon, Home, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import { signOut } from 'src/app/(login)/actions';
// import { useRouter } from 'next/navigation';
import { useUser } from 'src/server/auth';

export function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  // const router = useRouter();

  async function handleSignOut() {
    setUser(null);
    await signOut();
    // router.push('/');
  }

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-semibold">ACME</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-gray-300"
          >
            Dashboard
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-gray-300"
          >
            Pricing
          </Link>
          <Link
            href="/test"
            className="text-sm font-medium hover:text-gray-300"
          >
            Testing
          </Link>

          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger>
                <Avatar className="size-9 cursor-pointer">
                  <AvatarImage alt={user.name || ''} />
                  <AvatarFallback>
                    {user.email[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-1">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/dashboard" className="flex w-full items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <form action={handleSignOut} className="w-full">
                  <button type="submit" className="flex w-full">
                    <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
              <Link href="/register">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
