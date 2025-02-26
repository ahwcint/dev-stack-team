'use client';

import { HTMLAttributes, PropsWithChildren, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@heroui/theme';

export function ContainerMaxCenter({
  children,
  innerClassName,
  outerClassName,
  innerOpen = false,
}: PropsWithChildren & {
  innerClassName?: HTMLAttributes<'className'>;
  outerClassName?: HTMLAttributes<'className'>;
  innerOpen?: boolean;
}) {
  return (
    <div className={cn(`h-full w-full flex p-3 ${outerClassName || ''}`)}>
      <motion.section
        className={cn(
          `max-w-lg w-full m-auto flex gap-4 flex-col ${innerClassName || ''}`,
        )}
        animate={
          innerOpen
            ? { translateY: '0%', opacity: 1, scale: 1 }
            : {
                opacity: 0,
                scale: 0.8,
                translateY: '30%',
              }
        }
        style={{ translateY: '-30%', opacity: 0, scale: 0.8 }}
      >
        {children}
      </motion.section>
    </div>
  );
}
