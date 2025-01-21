'use client';
import { Input, Form, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const handleChangeRoute = () => {
    router.push('./register');
  };
  return (
    <div className="h-full w-full flex p-3">
      <section className="max-w-xl w-full m-auto flex gap-4 flex-col">
        <span className="text-center inline-block font-bold text-4xl w-full">
          Sign In.
        </span>
        <Form>
          <Input
            label={'Username'}
            type="text"
            autoComplete="off"
            id="username"
          />
          <Input
            label={'Password'}
            type="password"
            autoComplete="off"
            id="password"
          />
          <div className="flex gap-2 justify-end w-full">
            <Button type="button" variant="light" onPress={handleChangeRoute}>
              Sign Up
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </section>
    </div>
  );
}
