import React from "react";
import { useTodos } from "hooks/useTodos";
import { TodoInput } from "components/TodoInput/TodoInput";
import { TodoList } from "components/TodoList/TodoList";
import { TodoFooter } from "components/TodoFooter/TodoFooter";
import "./App.scss";

export const App: React.FC = () => {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    editTodo,
    deleteTodo,
    toggleCompletion,
    clearCompleted,
  } = useTodos();

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const hasCompleted = todos.some((todo) => todo.completed);

  return (
    <main className="app-container" role="main" aria-label="Todo Application">
      <header className="app-header">
        <h1>Todo App</h1>
      </header>
      <section className="app-section">
        <TodoInput onAdd={addTodo} />
        <TodoFooter
          countActive={activeCount}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
          hasCompleted={hasCompleted}
        />
        <TodoList
          todos={todos}
          onToggle={toggleCompletion}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
      </section>
    </main>
  );
};

export default App;
