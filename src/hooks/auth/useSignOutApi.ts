'use client';
import { useApiAction } from '@/hooks/useApiAction';
import { signOutUserApiService } from '@/services/user.service';
import { useRouter } from 'next/navigation';

export function useSignOutApi() {
  const route = useRouter();
  const { mutation } = useApiAction(signOutUserApiService, {
    onSuccess: ({ success }) => {
      if (success) route.push('./sign-in');
    },
  });
  return { handleSignOut: mutation };
}
