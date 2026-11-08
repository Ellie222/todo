"use client";

import { useState } from "react";
import { Priority } from "@/lib/types";
import { priorityLabels } from "@/lib/utils";

export default function TodoInput({
  onAdd,
}: {
  onAdd: (
    text: string,
    dueDate: string | undefined,
    priority: Priority,
  ) => void;
}) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [error, setError] = useState("");

  const handleAdd = () => {
    // 빈 값이나 공백만 있는 입력은 추가하지 않고 이유를 알려준다
    const trimmed = text.trim();
    if (!trimmed) {
      setError(
        "할일을 입력해주세요. 빈 값이나 공백만으로는 추가할 수 없습니다.",
      );
      return;
    }

    // 마감일은 선택 사항이라 비어 있으면 undefined로 넘긴다
    onAdd(trimmed, dueDate || undefined, priority);
    setText("");
    setDueDate("");
    setPriority("normal");
    setError("");
  };

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <input
          className={`flex-1 rounded-lg border bg-gray-50 px-4 py-2.5 text-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
              : "border-gray-200 focus:border-[#D97757] focus:ring-[#D97757]/20"
          }`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            // 다시 입력하기 시작하면 에러 메시지를 지운다
            if (error) setError("");
          }}
          placeholder="할일을 입력하세요"
          aria-invalid={!!error}
          aria-describedby={error ? "todo-input-error" : undefined}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="rounded-lg bg-[#D97757] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#c96647] active:scale-95"
        >
          추가
        </button>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
        <label className="flex items-center gap-1.5">
          마감일
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm outline-none focus:border-[#D97757] focus:bg-white"
          />
        </label>
        <label className="flex items-center gap-1.5">
          우선순위
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm outline-none focus:border-[#D97757] focus:bg-white"
          >
            {(Object.keys(priorityLabels) as Priority[]).map((p) => (
              <option key={p} value={p}>
                {priorityLabels[p]}
              </option>
            ))}
          </select>
        </label>
      </div>
      {error && (
        <p
          id="todo-input-error"
          role="alert"
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}
