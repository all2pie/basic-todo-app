import React, { useState, FormEvent, KeyboardEvent } from "react";
import "./TodoInput.scss";

interface TodoInputProps {
  onAdd: (title: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="todo-input"
      aria-label="Add new todo"
      role="form"
      noValidate
    >
      <label htmlFor="new-todo" className="visually-hidden">
        New todo
      </label>
      <input
        id="new-todo"
        type="text"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="New todo"
        autoComplete="off"
        spellCheck={false}
      />
      <button type="submit" aria-label="Add todo" disabled={!input.trim()}>
        Add
      </button>
    </form>
  );
};
