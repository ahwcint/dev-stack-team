'use client';
import { useApiAction } from '@/hooks/useApiAction';
import { useSocket } from '@/hooks/useSocket/useSocket';
import {
  listUserApiService,
  signOutUserApiService,
} from '@/services/user.service';
import { Button } from '@heroui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function NavigationBar() {
  const socket = useSocket(true);

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
