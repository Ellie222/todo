// 우선순위: 높음 / 보통 / 낮음
export type Priority = "high" | "normal" | "low";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  // 마감일 (YYYY-MM-DD). 없을 수 있다
  dueDate?: string;
  priority: Priority;
}

export type Filter = "all" | "active" | "completed";

// 정렬 기준: 추가순(기본) / 마감일순 / 우선순위순
export type SortKey = "created" | "due" | "priority";
