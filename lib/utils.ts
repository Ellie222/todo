import { Priority, SortKey, Todo } from "@/lib/types";

// 날짜 문자열을 보기 좋게 바꿔주는 함수
export function fd(d: string) {
  let result = "";
  const x = new Date(d);
  const y = x.getFullYear();
  let m = x.getMonth() + 1;
  let dd = x.getDate();
  if (m < 10) {
    result = result + y + "년 " + "0" + m + "월 ";
  } else {
    result = result + y + "년 " + m + "월 ";
  }
  if (dd < 10) {
    result = result + "0" + dd + "일";
  } else {
    result = result + dd + "일";
  }
  return result;
}

// 우선순위 한글 라벨
export const priorityLabels: Record<Priority, string> = {
  high: "높음",
  normal: "보통",
  low: "낮음",
};

// 우선순위 정렬용 순서 (숫자가 작을수록 먼저)
const priorityOrder: Record<Priority, number> = {
  high: 0,
  normal: 1,
  low: 2,
};

// 할일 정렬: created는 들어온 순서 그대로, due는 마감일이 빠른 순(마감일 없는 항목은 뒤),
// priority는 높음 → 보통 → 낮음 순. 같은 값끼리는 원래 순서를 유지한다.
export function sortTodos(todos: Todo[], sortKey: SortKey): Todo[] {
  if (sortKey === "created") return todos;

  return [...todos].sort((a, b) => {
    if (sortKey === "priority") {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    // 마감일순: YYYY-MM-DD 문자열은 그대로 비교해도 날짜 순서와 같다
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.localeCompare(b.dueDate);
  });
}

// 완료되지 않은 할일의 개수를 센다
export function countRemaining(todos: Todo[]) {
  return todos.filter((t) => !t.completed).length;
}
