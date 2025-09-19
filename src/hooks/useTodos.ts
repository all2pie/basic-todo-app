import { useState, useEffect } from "react";
import type { Todo } from "models/Todo";
import * as usecases from "usecases/todoUsecases";
import * as storageService from "services/storageService";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(storageService.loadTodos());
  const [filter, setFilter] = useState<usecases.FilterType>("all");

  useEffect(() => {
    storageService.saveTodos(todos);
  }, [todos]);

  const addTodo = (title: string) => {
    setTodos((prev) => usecases.addTodo(prev, title));
  };

  const editTodo = (id: string, title: string) => {
    setTodos((prev) => usecases.editTodo(prev, id, title));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => usecases.deleteTodo(prev, id));
  };

  const toggleCompletion = (id: string) => {
    setTodos((prev) => usecases.toggleTodoCompletion(prev, id));
  };

  const clearCompleted = () => {
    setTodos((prev) => usecases.clearCompleted(prev));
  };

  const filteredTodos = usecases.filterTodos(todos, filter);

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    editTodo,
    deleteTodo,
    toggleCompletion,
    clearCompleted,
  };
}
