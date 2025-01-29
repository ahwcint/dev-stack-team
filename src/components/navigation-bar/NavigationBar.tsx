import { useApiAction } from '@/hooks/useApiAction';
import { signOutApiService } from '@/services/auth.service';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export function NavigationBar() {
  const route = useRouter();
  const { mutation } = useApiAction(signOutApiService, {
    onSuccess: ({ success }) => {
      if (success) route.push('./sign-in');
    },
  });
  return (
    <>
      i am navigation bar<Button onPress={mutation}>SIGN OUT</Button>
    </>
  );
}
