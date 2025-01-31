'use client';
import {
  Badge,
  Button,
  ButtonVariantProps,
  Card,
  CardBody,
  CardHeader,
  colors,
  Divider,
} from '@heroui/react';
import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';

export function TodoListModule() {
  const [listCategory, setListCategory] = useState<TodoListContainer[]>([
    {
      id: 'todo',
      content: [],
      title: 'TO DO',
      color: 'default',
    },
    {
      id: 'assigned',
      content: [],
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
  return (
    <Container className="flex gap-3 size-full">
      {listCategory.map((props) => (
        <TodoListContainer key={`TodoListContainer-${props.id}`} {...props} />
      ))}
    </Container>
  );
}

const Container = motion.create('div');
type TodoListContainer = {
  title: ReactNode;
  content: ReactNode[];
  color?: ButtonVariantProps['color'];
  id: string;
};
const TodoListContainer = (props: TodoListContainer) => {
  const { color = 'default', content = [], id = '' } = props;
  return (
    <CardMotion
      className={`w-80 shrink-0 bg-${color} min-h-80 h-fit max-h-full overflow-visible`}
      animate={{ opacity: 1, translateY: '0%' }}
      style={{ opacity: 0, translateY: '-10%' }}
      layout
    >
      <Badge variant="faded" color={color} content={content.length} size="lg">
        <CardHeader className="font-bold">{props.title}</CardHeader>
      </Badge>
      <Divider />
      <CardBody className="overflow-y-auto overflow-x-clip">
        {content.map((r, i) => (
          <div key={`${id}-child-${i}`}>r</div>
        ))}
      </CardBody>
    </CardMotion>
  );
};

const CardMotion = motion.create(Card);
