import React from "react";
import type { Todo } from "models/Todo";
import { TodoItem } from "components/TodoItem/TodoItem";
import "./TodoList.scss";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onEdit,
  onDelete,
}) => {
  if (todos.length === 0) {
    return (
      <p className="todo-list-empty" role="alert" aria-live="polite">
        No todos found.
      </p>
    );
  }

  return (
    <ul className="todo-list" role="list" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
