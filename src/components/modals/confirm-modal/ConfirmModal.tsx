import {
  Button,
  Divider,
  Modal as ModalHeroUi,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';
import { ReactNode } from 'react';

export default function Modal({
  isOpen,
  onOpenChange,
  title,
  children,
  titleDivider,
  footerDivider,
  customFooter,
  onClose: onCloseParent,
  onSubmit,
  modalProps,
  customLabelFooterButton,
}: Props) {
  return (
    <ModalHeroUi
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      {...modalProps}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            {titleDivider && <Divider />}
            <ModalBody>{children}</ModalBody>
            {footerDivider && <Divider />}
            <ModalFooter>
              {customFooter
                ? customFooter({
                    onClose: () => {
                      onCloseParent?.();
                      onClose();
                    },
                    onSubmit,
                  })
                : defaultFooter({ onClose, onSubmit, customLabelFooterButton })}
            </ModalFooter>
          </>
        )}
      </ModalContent>
      <>hi</>
    </ModalHeroUi>
  );
}

const defaultFooter = ({
  onClose,
  onSubmit,
  customLabelFooterButton,
}: Pick<Props, 'onClose' | 'onSubmit' | 'customLabelFooterButton'>) => (
  <>
    <Button color="danger" variant="light" onPress={onClose}>
      {customLabelFooterButton?.[0] ?? 'Close'}
    </Button>
    <Button color="primary" onPress={onSubmit}>
      {customLabelFooterButton?.[1] ?? 'Submit'}
    </Button>
  </>
);

type ModalProps = Parameters<typeof ModalHeroUi>[0];

type Props = {
  isOpen: ModalProps['isOpen'];
  onOpenChange: ModalProps['onOpenChange'];
  modalProps?: ModalProps;
  children: ReactNode;
  title: ReactNode;
  customFooter?: (props: Pick<Props, 'onClose' | 'onSubmit'>) => ReactNode;
  titleDivider?: boolean;
  footerDivider?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  customLabelFooterButton?: [closeButton?: string, submitButton?: string];
};
