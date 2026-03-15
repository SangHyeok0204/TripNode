# Development Status

TripNode 프로젝트의 개발 진행 상황을 기록하는 문서.

---

## 현재 단계

**MVP Phase 1: 지도 기반 UI 구축**

---

## 완료된 작업

### 페이지 라우팅

| 경로 | 파일 | 설명 |
|------|------|------|
| `/` | `src/app/page.tsx` | 랜딩 페이지 (홈) |
| `/plan` | `src/app/plan/page.tsx` | 여행 계획 편집 페이지 |

### 랜딩 페이지 (`src/components/landing/`)

| 컴포넌트 | 설명 | 상태 |
|----------|------|------|
| Hero | 메인 비주얼 + CTA | 완료 |
| ProblemComparison | 기존 방식 vs TripNode 비교 | 완료 |
| KeyFeatures | 핵심 차별점 3가지 카드 | 완료 |
| HowItWorks | 사용 흐름 4단계 | 완료 |
| ExampleCourses | 예시 여행 코스 | 완료 |
| BrandPhilosophy | 브랜드 철학 메시지 | 완료 |
| FinalCTA | 최종 행동 유도 | 완료 |

### Mock 컴포넌트 (`src/components/mock/`)

랜딩 페이지에서 서비스 경험을 시각적으로 보여주기 위한 목업 컴포넌트.

| 컴포넌트 | 설명 |
|----------|------|
| MapMock | 지도 배경 목업 |
| NodeMarker | 여행 노드 마커 |
| RecommendSpot | 추천 스팟 (빨간 점) |
| RouteLine | 노드 간 경로선 |
| GenerateButton | [생성] 버튼 |
| LegacyUIStack | 기존 방식 UI 스택 (복잡함 표현) |

### Plan 페이지 (`src/components/plan/`)

| 컴포넌트 | 설명 | 상태 |
|----------|------|------|
| PlanWorkspace | 전체 레이아웃 (지도 + 사이드패널) | 완료 |
| PlanHeader | 상단 헤더 (로고, 메뉴) | 완료 |
| MapCanvas | 지도 영역 컨테이너 | 완료 |
| GoogleMapView | Google Maps 렌더링 | 완료 (API 연동) |
| WorkspacePanel | 우측 사이드패널 | 완료 |
| SearchSection | 장소 검색 UI | UI만 완료 |
| NodeList | 추가된 노드 목록 | UI만 완료 |
| NodeDetail | 노드 상세 정보 패널 | UI만 완료 |
| PlanNodeMarker | 지도 위 노드 마커 | 완료 |
| NodePopover | 노드 클릭 시 팝오버 | 완료 |
| RouteOverlay | 경로 오버레이 | UI만 완료 |

### 공통 UI (`src/components/ui/`)

| 컴포넌트 | 설명 |
|----------|------|
| SectionWrapper | 섹션 공통 래퍼 |
| Button | 공통 버튼 |

### Hooks (`src/hooks/`)

| Hook | 설명 | 상태 |
|------|------|------|
| usePlanState | Plan 페이지 전역 상태 관리 | 완료 |
| useCurrentLocation | 브라우저 Geolocation API로 현재 위치 가져오기 | 완료 |

### 타입 정의 (`src/types/`)

| 파일 | 주요 타입 |
|------|----------|
| plan.ts | TripNode, PlanState, Coordinates |
| index.ts | 공통 타입 |

---

## 진행 중

| 작업 | 설명 | 진행률 |
|------|------|--------|
| 장소 검색 | Google Places API 연동 | 50% |
| 노드 인터랙션 | 추가/이동/삭제 기능 | 30% |

---

## 미착수 (MVP 기준)

| 우선순위 | 작업 | 관련 API/기술 |
|----------|------|---------------|
| 1 | 장소 자동완성 | Places Autocomplete API + debounce |
| 2 | 노드 간 경로 계산 | Directions API |
| 3 | 여행 일정 저장 | PostgreSQL + PostGIS |
| 4 | LLM 기반 추천 | TBD |

---

## API 연동 상태

| API | 상태 | 비고 |
|-----|------|------|
| Google Maps JavaScript API | 연동 완료 | 지도 렌더링 |
| Google Places API | 미연동 | 장소 검색/상세 |
| Google Directions API | 미연동 | 경로 계산 |
| Google Geocoding API | 미연동 | 주소/좌표 변환 |

---

## 환경 설정

| 항목 | 상태 |
|------|------|
| Next.js 16 + App Router | 설정 완료 |
| TypeScript strict mode | 설정 완료 |
| Tailwind CSS 4 | 설정 완료 |
| ESLint 9 | 설정 완료 |
| Google Maps API Key | 설정 완료 (환경변수) |

---

## 변경 이력

| 날짜 | 작업 내용 |
|------|----------|
| 2026-03-15 | 개발 상태 문서 분리 생성 |
| 2026-03-15 | Plan 페이지 UI 골격 구현 |
| 2026-03-15 | Google Maps API 연동 |
| 2026-03-13 | 랜딩 페이지 전체 섹션 구현 |
| - | 초기 프로젝트 스캐폴딩 |
