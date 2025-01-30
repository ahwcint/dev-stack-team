'use client';
import { Alert } from '@heroui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { ToastListWidget } from './ToastListWidget';

type AlertColor = Parameters<typeof Alert>[0]['color'];
export type ToastType = {
  msg_id: string;
  message: string;
  color: AlertColor;
  capitalize?: boolean;
  timeout?: number;
};
export type ToastSet = Set<ToastType>;

const Toast = (() => {
  let makeToasts: (newToasts: ToastType[]) => void;

  const Toaster: FC = () => {
    const toastsRenderSize = 3;
    const [toastsQueue, setToastsQueue] = useState<ToastSet>(new Set([]));
    const [renderToasts, setRenderToasts] = useState<ToastSet>(new Set([]));

    makeToasts = (newToasts: ToastType[]) => {
      const newToastsQueue: ToastSet = new Set(new Set([]));
      setRenderToasts((t) => {
        for (let i = 0; i < newToasts.length; i++) {
          if (t.size <= toastsRenderSize - 1) {
            t.add(newToasts[i]);
          } else {
            newToastsQueue.add(newToasts[i]);
          }
        }
        return new Set(t);
      });

      if (newToastsQueue.size > 0)
        setToastsQueue((pt) => new Set([...pt, ...newToastsQueue]));
    };

    const handleDiscardToast = useCallback(
      (msg_ref: ToastType) => {
        const firstToast = [...toastsQueue][0];

        setRenderToasts((t) => {
          t.delete(msg_ref);
          if (firstToast) {
            t.add(firstToast);
          }
          return new Set(t);
        });

        if (firstToast) {
          toastsQueue.delete(firstToast);
          setToastsQueue(new Set(toastsQueue));
        }
      },
      [setRenderToasts, toastsQueue],
    );

    return (
      <ToastListWidget
        renderToasts={renderToasts}
        onDiscardToast={handleDiscardToast}
      />
    );
  };

  const enqueueToasts = () => ({
    enqueueToasts: makeToasts,
  });

  return {
    Toaster,
    enqueueToasts,
  };
})();

function useToast() {
  const { enqueueToasts } = Toast.enqueueToasts();
  const [state, setState] = useState<{ enqueueToasts: typeof enqueueToasts }>({
    enqueueToasts: () => undefined,
  });
  useEffect(() => {
    setState({
      enqueueToasts,
    });
  }, [enqueueToasts]);
  return state;
}

export default Toast;
export { useToast };
