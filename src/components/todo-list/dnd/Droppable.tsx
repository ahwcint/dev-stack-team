import { useDroppable } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';

export function Droppable({
  children,
  id,
  className,
  parentIndex,
}: PropsWithChildren & {
  id: string;
  className?: string;
  parentIndex: number;
}) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      parentIndex,
    },
  });

  return (
    <ul ref={setNodeRef} className={className}>
      {children}
    </ul>
  );
}
