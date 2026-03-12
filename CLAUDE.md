# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TripNode - 국내 1인 여행자를 위한 지도 기반 맞춤형 여행 일정 생성 서비스.
지도 API와 LLM을 활용하여 사용자의 취향, 일정, 이동 조건에 맞는 여행 코스를 추천하고,
지도 위에서 노드를 직접 비교/배치하며 경로를 설계하는 사용자 참여형 경험을 제공한다.

## Core Philosophy

- 복잡한 정보보다 실행 가능한 선택
- 검색보다 결정 (여러 플랫폼을 오가지 않도록)
- 텍스트보다 시각적 이해 (지도 기반 노드 탐색)
- 예쁜 추천보다 현실적인 추천 (교통, 시간, 동선 고려)
- 추천을 넘어 직접 조합하는 재미

상세 철학은 `learned/philosophy.md` 참조.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Linting:** ESLint 9 with eslint-config-next
- **Map API:** TBD
- **LLM integration:** TBD

## Commands

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Project Structure

```
src/
├── app/           # Next.js App Router (routes, layouts, pages)
├── components/    # Shared UI components
├── lib/           # Utility functions, helpers
└── types/         # TypeScript type definitions
```

## Language

- 코드: English (변수명, 함수명, 주석 등)
- 커밋 메시지: Korean
- 사용자와의 대화: Korean

## Development Guidelines

- 간결하고 실용적인 코드를 작성한다
- 과도한 추상화를 피하고, 현재 필요한 만큼만 구현한다
- 컴포넌트는 단일 책임 원칙을 따른다
- 타입 안전성을 중시한다 (TypeScript strict mode)
- 사용자 경험(UX)을 최우선으로 고려한다
- `@/*` import alias를 사용한다 (e.g., `@/components/Button`)

## Key Decisions (update as project evolves)

- Frontend: Next.js 16 + TypeScript + Tailwind CSS 4
- Map API: TBD
- LLM integration: TBD
