"use client";

import { Todo } from "@/lib/types";
import { Priority } from "@/lib/types";
import { fd, priorityLabels } from "@/lib/utils";

// 우선순위별 배지 색상
const priorityStyles: Record<Priority, string> = {
  high: "bg-red-50 text-red-600",
  normal: "bg-gray-100 text-gray-500",
  low: "bg-blue-50 text-blue-500",
};
import Checkbox from "./Checkbox";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors duration-200 hover:bg-orange-50/40">
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <div className="flex-1">
        <p
          className={`transition-colors duration-200 ${
            todo.completed ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {todo.text}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span
            className={`rounded-full px-2 py-0.5 font-medium ${priorityStyles[todo.priority]}`}
          >
            {priorityLabels[todo.priority]}
          </span>
          <span>{fd(todo.createdAt)}</span>
          {todo.dueDate && <span>마감 {fd(todo.dueDate)}</span>}
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="rounded-md px-2 py-1 text-sm text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
      >
        삭제
      </button>
    </li>
  );
}
