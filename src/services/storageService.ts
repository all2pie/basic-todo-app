import type { Todo } from "models/Todo";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY || "react-todo-app";

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadTodos(): Todo[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return parsed.map((t: any) => ({
      ...t,
      createdAt: new Date(t.createdAt),
    }));
  } catch {
    return [];
  }
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}
