'use client';
import { useSignOutApi } from '@/hooks/auth/useSignOutApi';
import {
  Button,
  Card,
  cn,
  Divider,
  Tooltip,
  useDisclosure,
} from '@heroui/react';
import { motion } from 'motion/react';
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { GoTasklist } from 'react-icons/go';
import Modal from '../modals/confirm-modal/ConfirmModal';
import Image from 'next/image';

export function NavigationBar() {
  const { handleSignOut } = useSignOutApi();
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  return (
    <FloatingContainer className={'w-32 h-full *:box-border'}>
      <CardMotion className="h-full w-full flex flex-col gap-3 p-3 items-center bg-secondary">
        <NavigationApp
          content="DevDo"
          buttonProps={{
            variant: 'light',
            size: 'lg',
            radius: 'none',
            className: 'w-fit',
          }}
        >
          <Image
            src={'/todo-icon.svg'}
            alt="todo-icon"
            width={100}
            height={100}
            className="h-full w-fit"
          />
        </NavigationApp>
        <Divider className="bg-white" />
        <NavigationApp content="Tasks" active={true}>
          <GoTasklist size={'100%'} />
        </NavigationApp>
        <Divider className="mt-auto bg-white" />
        <NavigationApp
          content="Sign out"
          buttonProps={{ onPress: onOpen, color: 'danger' }}
        >
          <LiaSignOutAltSolid size={'100%'} />
        </NavigationApp>
      </CardMotion>
      <Modal
        title={'Confirm sign out.'}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        onSubmit={handleSignOut}
        customLabelFooterButton={[undefined, 'Confirm']}
      >
        Are you sure you want to sign out?
      </Modal>
    </FloatingContainer>
  );
}

const CardMotion = motion.create(Card);
const FloatingContainer = motion.create('div');

type TooltipProps = Parameters<typeof Tooltip>[0];
type ButtonProps = Parameters<typeof Button>[0];

function NavigationApp({
  children,
  buttonProps,
  active,
  ...restProps
}: {
  buttonProps?: ButtonProps;
  active?: boolean;
} & TooltipProps &
  Required<Pick<TooltipProps, 'content'>>) {
  return (
    <Tooltip placement="right" {...restProps}>
      <Button
        isIconOnly
        variant="flat"
        {...buttonProps}
        className={cn(
          [
            active
              ? 'w-full border border-content3 bg-background'
              : 'w-full bg-secondary',
            buttonProps?.className,
          ].join(' '),
        )}
      >
        {children}
      </Button>
    </Tooltip>
  );
}
