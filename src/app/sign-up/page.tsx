'use client';
import { ContainerMaxCenter } from '@/components/ContainerMaxCenter';
import { fieldValidate } from '@/dialog/dialogFieldValidate';
import { useApiAction } from '@/hooks/useApiAction';
import { createUserApiService } from '@/services/user.service';
import { Input, Form, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4),
  confirm_password: z.string().min(4),
});

export default function Login() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState('');

  const {
    data: formData,
    action: formAction,
    isPending,
  } = useApiAction(
    async (result) => {
      return await createUserApiService(result.data);
    },
    {
      validateSchema: userSchema,
      disabledAutoEnqueueToast: false,
      onSuccess: () => {
        router.push('./');
      },
    },
  );

  const handleChangeRoute = () => {
    setOpen(false);
    setTimeout(() => router.push('./sign-in'), 300);
  };

  useEffect(() => {
    router.prefetch('./sign-in');
  }, [router]);

  return (
    <ContainerMaxCenter innerOpen={open}>
      <span className="text-center inline-block font-bold text-4xl w-full">
        Sign Up.
      </span>
      <div>
        <Form
          action={formAction}
          autoComplete="off"
          validationBehavior="native"
        >
          <Input
            label={'Username'}
            type="text"
            isRequired
            name="username"
            validate={(v) => fieldValidate.strAtRange('username', v, '>=', 4)}
            defaultValue={formData?.username}
          />
          <Input
            label={'Password'}
            type="password"
            isRequired
            name="password"
            validate={(v) => fieldValidate.strAtRange('password', v, '>=', 4)}
            onValueChange={setPassword}
            defaultValue={formData?.password}
          />
          <Input
            label={'Confirm Password'}
            type="password"
            isRequired
            name="confirm_password"
            validate={(v) =>
              v === password
                ? fieldValidate.strAtRange('confirm password', v, '>=', 4)
                : 'Password not match!'
            }
          />
          <div className="flex gap-2 w-full flex-col">
            <Button type="submit" fullWidth isLoading={isPending}>
              Submit
            </Button>
            <Button type="button" variant="light" onPress={handleChangeRoute}>
              Go back to Sign In
            </Button>
          </div>
        </Form>
      </div>
    </ContainerMaxCenter>
  );
}
