'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export function ThemeToggle({
  className,
  iconOnly,
}: {
  className?: string;
  iconOnly?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'flex flex-row items-center gap-2 rounded-md p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-start',
        className
      )}
      aria-label='Toggle theme'
    >
      <div className='relative h-6 w-6'>
        <Sun className='top-[1px] absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        <Moon className='top-[1px] absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      </div>
      {iconOnly ? (
        <span className='sr-only'>Toggle theme</span>
      ) : (
        <div className='text-sm'>Theme</div>
      )}
    </button>
  );
}
