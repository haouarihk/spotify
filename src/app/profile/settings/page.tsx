'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    // @ts-expect-error
    bio: session?.user?.bio || '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/settings');
      const user = await response.json();
      setFormData(user);
    };
    fetchUser();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      await update();
      toast.success('Settings updated successfully');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Settings</h1>
      <form onSubmit={onSubmit} className='space-y-6'>
        <div className='space-y-2'>
          <label htmlFor='name' className='text-sm font-medium'>
            Name
          </label>
          <Input
            id='name'
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder='Your name'
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='bio' className='text-sm font-medium'>
            Bio
          </label>
          <Textarea
            id='bio'
            value={formData.bio}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData((prev) => ({ ...prev, bio: e.target.value }))
            }
            placeholder='Tell us about yourself'
            rows={4}
          />
        </div>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
}
