'use client';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { CgGoogleTasks } from 'react-icons/cg';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

export function HomeApp() {
  const { push } = useRouter();
  const handleChangeRouteTo = (path: string) => {
    push(path);
  };

  return (
    <div className="flex size-full justify-center items-center gap-10">
      <AppIcon
        variant={'shadow'}
        label={'DIST'}
        onPress={() => handleChangeRouteTo('/todo-list/dashboard')}
      >
        <CgGoogleTasks size={'7rem'} />
      </AppIcon>
      <AppIcon variant={'bordered'} label={'...SOON'} isDisabled>
        <HiOutlineDotsHorizontal size={'7rem'} color="#fca311" />
      </AppIcon>
    </div>
  );
}

function AppIcon({
  label,
  children,
  ...propsButton
}: Parameters<typeof Button>[0] & { label?: string }) {
  return (
    <div className="w-fit h-fit">
      <Button
        variant={'faded'}
        isIconOnly
        className="w-40 h-40 rounded-3xl"
        {...propsButton}
      >
        {children}
      </Button>
      <span className="block text-center text-xl font-bold">{label}</span>
    </div>
  );
}
