'use client';
import {
  Badge,
  ButtonVariantProps,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@heroui/react';
import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  DragOverlay,
  useSensors,
} from '@dnd-kit/core';
import { Draggable } from '@/hooks/useDnD/Draggable';
import { Droppable } from '@/hooks/useDnD/Droppable';

type OverData = Omit<DragEndEvent['over'], 'data'> & {
  data: {
    current: {
      parentIndex: number;
      childIndex: number;
      data: TodoListContainer['content'][number];
    };
  };
};

type ActiveData = Omit<DragEndEvent['active'], 'data'> & {
  data: {
    current: {
      parentIndex: number;
      childIndex: number;
      data: TodoListContainer['content'][number];
    };
  };
};

export function TodoListModule() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
  );

  const [listCategory, setListCategory] = useState<TodoListContainer[]>([
    {
      id: 'todo',
      content: [
        { _id: '1234sss', topic: 'new task1', details: {} },
        { _id: 'sdasds', topic: 'new task2', details: {} },
        { _id: '3asdda', topic: 'new task3', details: {} },
        { _id: '3asd123da', topic: 'new task33', details: {} },
        { _id: '3asd1sd23da', topic: 'new task333', details: {} },
        { _id: '3as12ad3dda', topic: 'new task3333', details: {} },
        { _id: '3as12as3dda', topic: 'new task33333', details: {} },
        { _id: '3asadaasddda', topic: 'new task33333', details: {} },
        { _id: '3asadaddda', topic: 'new task3444', details: {} },
        { _id: '3asadadadda', topic: 'new task34444', details: {} },
        { _id: '3adadassdda', topic: 'new task34', details: {} },
        { _id: '3addasdda', topic: 'new task34', details: {} },
        { _id: '3aadasdda', topic: 'new task35', details: {} },
        { _id: '3aaaasasdda', topic: 'new task355', details: {} },
      ],
      title: 'TO DO',
      color: 'default',
    },
    {
      id: 'assigned',
      content: [{ _id: '3asddssa', topic: 'new task333', details: {} }],
      title: 'ASSIGNED',
      color: 'primary',
    },
    {
      id: 'in-progress',
      content: [],
      title: 'IN PROGRESS',
      color: 'warning',
    },
    {
      id: 'success',
      content: [],
      title: 'SUCCESS',
      color: 'success',
    },
    {
      id: 'issues',
      content: [],
      title: 'ISSUES',
      color: 'danger',
    },
  ]);

  const [activeItem, setActiveItem] = useState<string | undefined>();

  const handleDragEnd = (active: ActiveData, over: OverData) => {
    const newListCategory = JSON.parse(
      JSON.stringify(listCategory),
    ) as typeof listCategory;

    if (active.data.current.parentIndex === over.data.current.parentIndex)
      return;

    newListCategory[over?.data.current.parentIndex].content.push(
      active?.data.current.data,
    );

    newListCategory[active.data.current.parentIndex].content = newListCategory[
      active.data.current.parentIndex
    ].content.filter((_, index) => index !== active.data.current.childIndex);

    setListCategory(newListCategory);
  };
  return (
    <Container className="flex gap-3 size-full">
      <DndContext
        sensors={sensors}
        id={'hot-load'}
        onDragEnd={(e) => {
          if (e.over && e.active)
            handleDragEnd(
              e.active as unknown as ActiveData,
              e.over as unknown as OverData,
            );
          setActiveItem(undefined);
        }}
        onDragStart={(e) => {
          setActiveItem(e.active.data.current?.data?.topic);
        }}
      >
        {listCategory.map((props, index) => (
          <TodoListContainer
            key={`todoListContainer-${props.id}`}
            {...props}
            parentIndex={index}
          />
        ))}
        <DragOverlay>
          <div className="cursor-move">{activeItem}</div>
        </DragOverlay>
      </DndContext>
    </Container>
  );
}

type TodoListContainer = {
  title: ReactNode;
  content: { _id: string; topic: string; details: Record<string, unknown> }[];
  color?: ButtonVariantProps['color'];
  id: string;
};
const TodoListContainer = (
  props: TodoListContainer & { parentIndex: number },
) => {
  const { color = 'default', content = [], id = '' } = props;
  return (
    <CardMotion
      className={`bg-${color} min-h-80 h-fit max-h-full overflow-visible flex-shrink-0 flex-grow-1 basis-80`}
      animate={{ opacity: 1, translateY: '0%' }}
      style={{ opacity: 0, translateY: '-10%' }}
      layout
    >
      <Badge variant="faded" color={color} content={content.length} size="lg">
        <CardHeader className="font-bold">{props.title}</CardHeader>
      </Badge>
      <Divider />
      <CardBody className="overflow-y-auto overflow-x-clip flex">
        <Droppable
          id={`draggable-${props.id}`}
          className={'h-full flex-1'}
          parentIndex={props.parentIndex}
        >
          {content.map((r, childIndex) => (
            <Draggable
              id={r._id}
              key={`${id}-child-${r._id}-${props.parentIndex}-${childIndex}`}
              parentIndex={props.parentIndex}
              childIndex={childIndex}
              data={r}
            >
              <div
                style={{ background: '#DFDFDF50' }}
                className="rounded-md p-2"
              >
                {r.topic}
              </div>
            </Draggable>
          ))}
        </Droppable>
      </CardBody>
    </CardMotion>
  );
};

const Container = motion.create('div');
const CardMotion = motion.create(Card);
