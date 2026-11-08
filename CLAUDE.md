# CLAUDE.md

이 파일은 이 저장소에서 코드를 다룰 때 Claude Code(claude.ai/code)에게 주는 안내서입니다.

Next.js 16(App Router), React 19, TypeScript(strict), Tailwind CSS v4로 만든 할 일(Todo) 앱입니다. 데이터는 목(mock) 데이터(`lib/mock-data.ts`)뿐이며 백엔드는 없습니다.

## 명령어

- `npm run dev` / `npm run build` / `npm run lint` (일반 `eslint`, flat config)
- 타입 검사: `npx tsc --noEmit` (해당 스크립트 없음)
- 포맷: `npx prettier --write <파일>` (해당 스크립트 없음)
- 테스트 프레임워크는 없습니다. 코드를 수정한 뒤에는 `npm run lint`와 `npx tsc --noEmit`를 실행하세요.

## 규칙

- 경로 별칭 `@/*`는 프로젝트 루트를 가리킵니다. `src/` 디렉터리는 없습니다 (`@/components/...`, `@/lib/...`).
- Prettier: 큰따옴표, 세미콜론, 모든 곳에 trailing comma, 줄 너비 80.
- UI 텍스트와 코드 주석은 한국어로 작성합니다.
