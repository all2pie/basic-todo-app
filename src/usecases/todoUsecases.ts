import type { Todo } from "models/Todo";

export type FilterType = "all" | "active" | "completed";

export function addTodo(todos: Todo[], title: string): Todo[] {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date(),
  };
  return [...todos, newTodo];
}

export function editTodo(todos: Todo[], id: string, title: string): Todo[] {
  return todos.map((todo) => (todo.id === id ? { ...todo, title } : todo));
}

export function deleteTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((todo) => todo.id !== id);
}

export function toggleTodoCompletion(todos: Todo[], id: string): Todo[] {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

export function clearCompleted(todos: Todo[]): Todo[] {
  return todos.filter((todo) => !todo.completed);
}

export function filterTodos(todos: Todo[], filter: FilterType): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}
