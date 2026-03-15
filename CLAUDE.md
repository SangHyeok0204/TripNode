# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TripNode - 국내 1인 여행자를 위한 지도 기반 맞춤형 여행 일정 생성 서비스.
사용자가 지도 위에 기준 노드를 배치하고 [생성] 버튼을 누르면, 그 근처에 취향을 반영한 추천 장소들이 빨간 스팟으로 표시된다.
LLM과 지도 API를 활용하여 오픈 여부, 경로 정보 등을 제공하고, 사용자가 직접 비교/선택하며 경로를 설계하는 참여형 경험을 제공한다.

**서비스 정체성**: 지도 기반 의사결정 도우미이자, 사용자 참여형 여행 설계 도구

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
- **Map API:** Google Maps Platform (렌더링, 검색, 자동완성, 지오코딩, 경로 계산)
- **LLM:** 의도 해석, 노드 추천, 일정 초안, 경로 재배치, 리뷰 요약 용도 (구체적 모델 TBD)
- **Database:** PostgreSQL + PostGIS (좌표/거리 기반 처리)
- **Cache:** Redis
- **Deployment:** Vercel (프론트/초기 서버) + 관리형 PostgreSQL

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

### 글로벌 확장 원칙
- UI 문구는 하드코딩 대신 국제화(i18n) 가능한 구조로 관리
- 장소 식별은 문자열보다 외부 Place ID 중심
- 국가/통화/시간대/주소 체계에 종속되지 않도록 설계

### 비용 통제 원칙
- 장소 검색/상세/경로 계산 결과는 캐싱 우선
- 자동완성/검색 요청은 debounce 적용
- LLM 결과도 재사용 가능한 경우 저장하여 중복 호출 방지
- 민감한 API 호출은 서버를 통해 제어

### 보안 원칙
- 외부 API 키는 클라이언트에 노출하지 않는다
- 지도 API 키는 도메인/IP 제한 설정
- 사용자별 데이터 접근은 권한 기준으로 분리

## MVP Priority (순서대로)

1. 지도 표시
2. 장소 검색
3. 노드 추가/이동/삭제
4. 노드 간 경로 계산
5. 여행 일정 저장
6. LLM 기반 1차 추천 기능

상세 기술 스펙은 `learned/skills_spec.md` 참조.

## Development Status

현재 단계: **MVP Phase 1 - 지도 기반 UI 구축**

- 랜딩 페이지: 완료
- Plan 페이지 UI: 완료
- Google Maps 연동: 완료
- 장소 검색/노드 인터랙션: 진행 중

상세 개발 상태는 `learned/development_status.md` 참조.

## Homepage Spec

홈페이지(랜딩 페이지)는 TripNode의 핵심 가치를 첫인상에서 전달해야 한다.
- 첫 화면에서 지도 + 노드 + 경로가 보여야 함
- 텍스트보다 시각 경험 우선
- "AI 추천 앱"이 아닌 "지도 기반 여행 설계 툴" 인상

섹션 순서: Hero → 문제 공감 → 핵심 차별점 → 사용 흐름 → 예시 코스 → 브랜드 철학 → 최종 CTA

상세 스펙은 `learned/lendingpage_spec.md` 참조.

## Claude 작업 원칙

- 명시적 구현 지시 전까지 코드를 작성하지 않는다
- 작업 순서: 요구사항 해석 → 구조 설계 → 충돌 점검 → 계획 제시 → 승인 후 구현
- learned 폴더 문서와 충돌 시 먼저 명시하고 승인 없이 강행하지 않는다
- 요청 범위를 과잉 해석하지 않는다
- 작고 명확한 단위로 변경한다
- 파괴적 변경(파일 삭제, 대규모 리팩토링 등)은 사전 동의 후 진행한다

상세 원칙은 `learned/KEEP_IN_MIND.md` 참조.

## Key Decisions (update as project evolves)

- Frontend: Next.js 16 + TypeScript + Tailwind CSS 4
- Map API: Google Maps Platform
- Database: PostgreSQL + PostGIS
- Cache: Redis
- Deployment: Vercel
- LLM integration: TBD (구체적 모델/서비스 미정)
