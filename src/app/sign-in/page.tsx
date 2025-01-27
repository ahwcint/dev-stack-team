'use client';
import { useRouter } from 'next/navigation';
import { ContainerMaxCenter } from '@/components/ContainerMaxCenter';
import { Input, Form, Button } from '@heroui/react';
import { useEffect, useState } from 'react';
import { fieldValidate } from '@/dialog/dialogFieldValidate';
import { signInUserApiService } from '@/services/user.service';
import { z } from 'zod';
import { useApiAction } from '@/hooks/useApiAction';

const userSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4),
});

export default function Login() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleChangeRoute = () => {
    setOpen(false);
    setTimeout(() => router.push('./sign-up'), 300);
  };

  const { data, action, isPending } = useApiAction(
    async (payload) => {
      return await signInUserApiService(payload.data);
    },
    {
      validateSchema: userSchema,
      onSuccessMessage: 'Sign-In Success',
      onSuccess: () => {
        router.push('./');
      },
    },
  );

  useEffect(() => {
    router.prefetch('./sign-up');
  }, [router]);

  return (
    <ContainerMaxCenter innerOpen={open}>
      <span className="text-center inline-block font-bold text-4xl w-full">
        Sign In.
      </span>
      <Form autoComplete="off" action={action} validationBehavior="native">
        <Input
          label={'Username'}
          type="text"
          name="username"
          defaultValue={data?.username}
          validate={(v) => fieldValidate.strAtRange('username', v, '>=', 4)}
        />
        <Input
          label={'Password'}
          type="password"
          name="password"
          defaultValue={data?.password}
          validate={(v) => fieldValidate.strAtRange('password', v, '>=', 4)}
        />
        <div className="flex gap-2 w-full flex-col">
          <Button type="submit" isLoading={isPending}>
            Submit
          </Button>
          <Button type="button" variant="light" onPress={handleChangeRoute}>
            Sign Up
          </Button>
        </div>
      </Form>
    </ContainerMaxCenter>
  );
}
