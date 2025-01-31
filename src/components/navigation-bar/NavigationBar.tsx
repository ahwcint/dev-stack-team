'use client';
import { useSignOutApi } from '@/hooks/auth/useSignOutApi';
import { Button, Card, Divider, Tooltip, useDisclosure } from '@heroui/react';
import { motion } from 'motion/react';
import { HiOutlineColorSwatch } from 'react-icons/hi';
import { LiaSignOutAltSolid } from 'react-icons/lia';
import Modal from '../modals/confirm-modal/ConfirmModal';

export function NavigationBar() {
  const { handleSignOut } = useSignOutApi();
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  return (
    <FloatingContainer className={'w-16 h-full *:box-border'}>
      <CardMotion className="h-full w-full flex flex-col gap-3 p-3">
        <NavigationApp content="TO DO APP" buttonProps={{ variant: 'flat' }}>
          <HiOutlineColorSwatch size={'100%'} />
        </NavigationApp>
        <Divider />
        <Divider className="mt-auto" />
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
  ...restProps
}: {
  buttonProps?: ButtonProps;
} & TooltipProps &
  Required<Pick<TooltipProps, 'content'>>) {
  return (
    <Tooltip placement="right" {...restProps}>
      <Button isIconOnly variant="flat" {...buttonProps}>
        {children}
      </Button>
    </Tooltip>
  );
}
