import { useApiAction } from '@/hooks/useApiAction';
import { signOutUserApiService } from '@/services/user.service';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

export function NavigationBar() {
  const route = useRouter();
  const { mutation } = useApiAction(signOutUserApiService, {
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
