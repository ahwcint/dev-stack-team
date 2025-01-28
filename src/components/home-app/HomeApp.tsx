import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { HiOutlineColorSwatch, HiOutlineDotsHorizontal } from 'react-icons/hi';

export function HomeApp() {
  const { push } = useRouter();
  const handleChangeRouteTo = (path: string) => {
    push(path);
  };
  return (
    <div className="flex size-full justify-center items-center gap-10">
      <AppIcon
        variant={'shadow'}
        label={'TO DO LIST'}
        onPress={() => handleChangeRouteTo('/todo-list')}
      >
        <HiOutlineColorSwatch size={'7rem'} color="#fca311" />
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
      <span className="block text-center text-xl font-bold text-primary-foreground">
        {label}
      </span>
    </div>
  );
}
