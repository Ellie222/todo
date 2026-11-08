"use client";

import { SortKey } from "@/lib/types";

const sorts: { label: string; value: SortKey }[] = [
  { label: "추가순", value: "created" },
  { label: "마감일순", value: "due" },
  { label: "우선순위순", value: "priority" },
];

interface Props {
  sort: SortKey;
  onChange: (sort: SortKey) => void;
}

export default function SortBar({ sort, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 px-4 pb-2">
      <span className="text-xs text-gray-400">정렬</span>
      {sorts.map((s) => {
        // 현재 선택된 정렬은 강조 스타일로 표시한다
        const selected = sort === s.value;
        return (
          <button
            key={s.value}
            onClick={() => onChange(s.value)}
            aria-pressed={selected}
            className={`rounded-full border px-3 py-1 text-xs transition-all duration-200 active:scale-95 ${
              selected
                ? "border-gray-700 bg-gray-700 text-white"
                : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
            }`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
