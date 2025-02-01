'use client';

import { Alert, Progress } from '@heroui/react';
import { animate, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState, type JSX } from 'react';
import type { ToastSet, ToastType } from './useToast';

export function ToastListWidget({
  renderToasts,
  onDiscardToast,
}: {
  renderToasts: ToastSet;
  onDiscardToast: (toastRef: ToastType) => void;
}): JSX.Element {
  const [expand, setExpand] = useState(false);
  const ContainerRef = useRef<HTMLDivElement | null>(null);
  const expandAllToasts = () => {
    setExpand(true);
  };
  const collapseAllToasts = () => setExpand(false);

  const handleDiscardToast = useCallback(
    (ToastContainerRef: Element | null | undefined, toast: ToastType) => {
      if (ToastContainerRef)
        animate(ToastContainerRef, {
          marginBlockStart: '-20%',
          opacity: 0,
        }).then(() => onDiscardToast(toast));
    },
    [onDiscardToast],
  );

  useEffect(() => {
    if (renderToasts.size <= 1) collapseAllToasts();
  }, [renderToasts.size]);

  useEffect(() => {
    const timeoutToasts: NodeJS.Timeout[] = [];

    for (const toastIndexString in [...renderToasts]) {
      const currentToast = [...renderToasts][parseInt(toastIndexString)];
      if (currentToast.timeout)
        timeoutToasts[parseInt(toastIndexString)] = setTimeout(() => {
          handleDiscardToast(
            ContainerRef.current?.querySelector(
              `#toast-card-${currentToast.msg_id}`,
            ),
            currentToast,
          );
        }, currentToast.timeout);
    }
  }, [renderToasts, handleDiscardToast]);
  return (
    <ContainerLayout
      ref={ContainerRef}
      onHoverStart={expandAllToasts}
      onHoverEnd={collapseAllToasts}
    >
      {[...renderToasts].map((toast, index, arr) => (
        <ToastContainer
          id={`toast-card-${toast.msg_id}`}
          key={`toast-key-${toast.msg_id}`}
          animate={{ translateY: 0, opacity: 1 }}
          style={{
            zIndex: arr.length + 1 - index,
            translateY: -100,
            opacity: 0,
            height: expand ? 'auto' : '.25rem',
          }}
          transition={{
            ease: [0, 0.71, 0.2, 1],
          }}
        >
          <AlertMotion
            id={`toast-${toast.msg_id}`}
            variant="faded"
            color={toast.color}
            title={
              <>
                {toast.message}
                {toast.timeout && <AutoProgress toast={toast} />}
              </>
            }
            isVisible
            onClose={() => {
              const ToastContainerRef = ContainerRef.current?.querySelector(
                `#toast-card-${toast.msg_id}`,
              );
              if (ToastContainerRef)
                animate(ToastContainerRef, {
                  marginBlockStart: '-20%',
                  opacity: 0,
                }).then(() => onDiscardToast(toast));
            }}
            style={{
              opacity: 0,
              scale: 1,
              textTransform: toast.capitalize ? 'capitalize' : 'none',
              position: 'relative',
            }}
            animate={
              expand
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: 1 - index / 3,
                    scale: 1 - index / 10,
                  }
            }
            layout
          />
        </ToastContainer>
      ))}
    </ContainerLayout>
  );
}

const ContainerLayout = (props: Parameters<typeof motion.div>[0]) => (
  <motion.div
    className="fixed top-0 right-0 flex gap-2 flex-col m-2 pb-10 z-50"
    {...props}
  />
);

const ToastContainer = (props: Parameters<typeof motion.div>[0]) => (
  <motion.div
    className="basis-0 h-1 max-w-sm w-screen hover:cursor-pointer"
    {...props}
  />
);

const AlertMotion = motion.create(Alert);

const AutoProgress = ({ toast }: { toast: ToastType }) => {
  const initialSpeedProgress = 10;
  const [value, setValue] = useState(initialSpeedProgress);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (toast.timeout) {
      interval = setInterval(
        () => {
          setValue((v) => (v >= 100 ? 0 : v + initialSpeedProgress));
        },
        toast.timeout / (100 / initialSpeedProgress),
      );

      if (value >= 100) clearInterval(interval);
    }
    return () => {
      if (toast.timeout) clearInterval(interval);
    };
  }, [value, toast]);

  return (
    <Progress
      aria-label="Loading Discard Duration"
      size="sm"
      value={value}
      color={toast.color}
      style={{
        position: 'absolute',
        bottom: '.25rem',
        left: '50%',
        width: '90%',
        translate: '-50% 0',
      }}
    />
  );
};
