import { PropsWithChildren } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'motion/react';

export function Draggable({
  children,
  id,
  parentIndex,
  childIndex,
  data,
}: PropsWithChildren & {
  id: string;
  parentIndex: number;
  childIndex: number;
  data: unknown;
}) {
  const { transform, setNodeRef, listeners, attributes } = useDraggable({
    id,
    data: {
      parentIndex,
      childIndex,
      data,
    },
  });

  return (
    <motion.section
      style={{ borderBlock: '0px solid black', paddingBlock: '.25rem' }}
      animate={transform ? { borderBlock: '.1rem solid black' } : undefined}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => {
        console.log('clicked !!');
      }}
    >
      {children}
    </motion.section>
  );
}
