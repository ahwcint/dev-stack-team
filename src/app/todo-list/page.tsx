import { TodoListModule } from '@/components/todo-list/TodoListModule';

export default function TodoListPage() {
  return (
    <div className="p-3 size-full overflow-x-auto scrollbar-hide">
      <TodoListModule />
    </div>
  );
}
