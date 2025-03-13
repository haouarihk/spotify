'use client';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, Settings, UserCog } from 'lucide-react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
export function SidebarHandler({ children }: { children: React.ReactNode }) {
  const s = useSession();

  const mainLinks = [
    {
      label: 'Explore',
      href: '#',
      icon: (
        <LayoutDashboard className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
  ];

  const authedLinks = [
    {
      label: 'Explore',
      href: '#',
      icon: (
        <LayoutDashboard className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: (
        <UserCog className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: 'Settings',
      href: '/profile/settings',
      icon: (
        <Settings className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: 'Logout',
      href: '#',
      icon: (
        <LogOut className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
  ];
  const isLoggedIn = s.data?.user;

  const links = isLoggedIn ? authedLinks : mainLinks;

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden',
        'h-full w-full' // Changed from h-[60vh] to h-screen for full height
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className='justify-between gap-10 h-full'>
          <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <ThemeToggle className='hidden md:flex w-full' iconOnly={!open} />
            {isLoggedIn ? (
              <SidebarLink
                link={{
                  label: s.data?.user?.name ?? 'Guest',
                  href: '#',
                  icon: (
                    <div className='h-7 w-7 flex-shrink-0 rounded-full bg-gray-300 dark:bg-neutral-700'></div>
                  ),
                }}
              />
            ) : (
              <Button variant='outline' onClick={() => signIn()}>
                Login
              </Button>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      <div className='flex-1 w-full bg-white dark:text-white p-2 dark:bg-neutral-900'>
        {children}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href='#'
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      <div className='h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0' />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='font-medium text-black dark:text-white whitespace-pre'
      >
        spotify clone (not finished)
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href='#'
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      <div className='h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0' />
    </Link>
  );
};
