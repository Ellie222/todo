"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import FilterBar from "@/components/FilterBar";
import SortBar from "@/components/SortBar";
import TodoList from "@/components/TodoList";
import { mockTodos } from "@/lib/mock-data";
import { Filter, Priority, SortKey, Todo } from "@/lib/types";
import { sortTodos } from "@/lib/utils";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<SortKey>("created");

  // 필터로 거른 뒤 선택된 기준으로 정렬한다 (Header 통계는 전체 기준 유지)
  const filteredTodos = sortTodos(
    todos.filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    }),
    sort,
  );

  const addTodo = (
    text: string,
    dueDate: string | undefined,
    priority: Priority,
  ) => {
    const newTodo: Todo = {
      id: String(Date.now()),
      text,
      completed: false,
      createdAt: new Date().toISOString().slice(0, 10),
      dueDate,
      priority,
    };
    setTodos([newTodo, ...todos]);
    console.log("할일 추가됨:", text);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <>
      <Header todos={todos} />
      <TodoInput onAdd={addTodo} />
      <FilterBar filter={filter} onChange={setFilter} />
      <SortBar sort={sort} onChange={setSort} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </>
  );
}
