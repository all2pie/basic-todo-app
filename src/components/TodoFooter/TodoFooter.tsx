import React from "react";
import { FilterType } from "usecases/todoUsecases";
import "./TodoFooter.scss";

interface TodoFooterProps {
  countActive: number;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

export const TodoFooter: React.FC<TodoFooterProps> = ({
  countActive,
  filter,
  onFilterChange,
  onClearCompleted,
  hasCompleted,
}) => {
  return (
    <footer className="todo-footer" aria-label="Todo list controls">
      <span className="todo-count" aria-live="polite" aria-atomic="true">
        {countActive} {countActive === 1 ? "item" : "items"} left
      </span>
      <div className="filters" role="group" aria-label="Filter todos">
        <button
          type="button"
          className={filter === "all" ? "active" : ""}
          aria-pressed={filter === "all"}
          onClick={() => onFilterChange("all")}
          tabIndex={0}
        >
          All
        </button>
        <button
          type="button"
          className={filter === "active" ? "active" : ""}
          aria-pressed={filter === "active"}
          onClick={() => onFilterChange("active")}
          tabIndex={0}
        >
          Active
        </button>
        <button
          type="button"
          className={filter === "completed" ? "active" : ""}
          aria-pressed={filter === "completed"}
          onClick={() => onFilterChange("completed")}
          tabIndex={0}
        >
          Completed
        </button>
      </div>
      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
        aria-disabled={!hasCompleted}
        tabIndex={hasCompleted ? 0 : -1}
      >
        Clear Completed
      </button>
    </footer>
  );
};
