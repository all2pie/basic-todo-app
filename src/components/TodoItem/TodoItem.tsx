import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import type { Todo } from "models/Todo";
import "./TodoItem.scss";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditInput(e.target.value);
  };

  const saveEdit = () => {
    const trimmed = editInput.trim();
    if (!trimmed) {
      setEditInput(todo.title);
      setIsEditing(false);
      return;
    }
    if (trimmed !== todo.title) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleBlur = () => {
    saveEdit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      setEditInput(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`todo-item ${todo.completed ? "completed" : ""} ${
        isEditing ? "editing" : ""
      }`}
      aria-label={`Todo: ${todo.title}`}
    >
      <div className="view">
        <input
          id={`toggle-${todo.id}`}
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-checked={todo.completed}
          aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
        />
        {!isEditing ? (
          <label
            htmlFor={`toggle-${todo.id}`}
            onDoubleClick={handleDoubleClick}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsEditing(true);
              }
            }}
          >
            {todo.title}
          </label>
        ) : (
          <input
            ref={inputRef}
            className="edit"
            value={editInput}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-label={`Edit todo: ${todo.title}`}
          />
        )}
        <button
          type="button"
          className="delete-btn"
          aria-label={`Delete todo: ${todo.title}`}
          onClick={() => onDelete(todo.id)}
          tabIndex={0}
        >
          &times;
        </button>
      </div>
    </li>
  );
};
