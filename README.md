# WorkDNA - 직장인 성격유형 진단 웹 애플리케이션

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.11-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![PocketBase](https://img.shields.io/badge/PocketBase-0.26.8-B8DBE4?style=flat-square&logo=pocketbase&logoColor=white)

직장에서의 성격 유형을 분석하는 React 기반 웹 애플리케이션입니다. 10개의 질문을 통해 사용자의 성격을 4가지 유형(AA, AB, BA, BB)으로 분류하고, 개인화된 결과와 함께 팀 최적화 제안을 제공합니다.

## 프로젝트 개요

WorkDNA는 직장인을 위한 성격 유형 진단 도구로, 사용자 경험을 중시한 모던 웹 애플리케이션입니다. React 19의 최신 기능과 고품질 UI 라이브러리를 활용하여 매끄러운 사용자 경험을 제공합니다.

### 주요 특징

- **성격 유형 분석**: 10개 질문으로 4가지 성격 유형 (사교왕, 행동대장, 평화주의자, 조언자) 진단
- **데이터 수집 및 분석**: PocketBase를 활용한 사용자 데이터 수집 및 통계 처리
- **반응형 디자인**: 모바일 우선 설계로 모든 디바이스에서 최적화된 경험
- **애니메이션**: Framer Motion을 활용한 부드러운 인터랙션과 시각적 피드백
- **관리자 대시보드**: 통계 및 사용자 행동 분석 도구
- **다국어 지원**: i18next 기반 한국어/영어 지원 (브라우저 언어 자동 감지)

## 기술 스택

### Frontend Core

- **React 19.1.0** - 최신 React 기능 활용
- **TypeScript 5.8.3** - 타입 안정성 보장
- **Vite 7.0.0** - 빠른 번들링 및 개발 서버
- **React Router DOM 6.30.1** - 클라이언트 사이드 라우팅

### UI/UX

- **Tailwind CSS 4.1.11** - 유틸리티 퍼스트 CSS 프레임워크
- **shadcn/ui + Radix UI** - 접근성을 고려한 컴포넌트 시스템
- **Framer Motion 12.23.3** - 고급 애니메이션 라이브러리
- **Lucide React** - 일관성 있는 아이콘 시스템
- **Embla Carousel** - 랜딩 페이지 피처 캐러셀

### Backend & Data

- **PocketBase 0.26.8** - 셀프 호스팅 백엔드 (Fly.io 배포)
- **API Rules** 기반 데이터 접근 제어 (public create/read, no delete)
- **클라이언트 사이드 통계 집계** - `updateDailyStats()` 함수로 일별 통계 자동 갱신

### 국제화

- **i18next 25.x + react-i18next 15.x** - 다국어 프레임워크
- **i18next-browser-languagedetector** - 브라우저 언어 자동 감지
- 지원 언어: 한국어 (기본), 영어

### 개발 도구

- **ESLint 9.29.0** - 코드 품질 관리
- **PostCSS & Autoprefixer** - CSS 후처리

## 아키텍처

### 디렉토리 구조

```
src/
├── components/           # UI 컴포넌트
│   ├── ui/              # 재사용 가능한 기본 컴포넌트 (shadcn/ui)
│   ├── magicui/         # 고급 애니메이션 컴포넌트
│   └── share/           # 소셜 공유 기능
├── hooks/               # 커스텀 훅
├── contexts/            # React Context (AuthContext)
├── utils/               # 유틸리티 함수
├── data/                # 정적 데이터 (질문, 성격유형 정의)
├── lib/                 # 외부 서비스 설정 (PocketBase 클라이언트)
├── locales/             # i18n 번역 파일 (ko, en)
└── assets/              # 이미지, 아이콘 등 정적 리소스
```

### 라우팅 구조 (AppRouter.tsx)

- `/` → TestApp (메인 성격 테스트 플로우)
- `/dashboard` → Dashboard (보호된 관리자 분석, 인증 필요)
- `/care` → Care 컴포넌트 (정신 건강 평가 모듈)

### 주요 기능 구현

#### 1. 성격 유형 진단 시스템

- **Questions 1-5**: 외향형(A) vs 내향형(B) 성향
- **Questions 6-10**: 감정형(A) vs 사고형(B) 성향
- **4가지 조합**: AA(사교왕), AB(행동대장), BA(평화주의자), BB(조언자)
- 비교 점수 시스템으로 클라이언트 사이드 성격 유형 계산

#### 2. 사용자 플로우

1. 랜딩 페이지 (피처 캐러셀)
2. 개인정보 동의 수집 (선택적 개인 데이터)
3. 10개 질문 단계별 진행 (시각적 진행률 표시)
4. 로딩 애니메이션 (3초 인위적 지연으로 기대감 조성)
5. 결과 페이지 (스크롤 애니메이션 + 소셜 공유)

#### 3. 상태 관리

- `useTest` 커스텀 훅으로 테스트 상태 중앙 관리
- localStorage (`workdna-test-state` 키)로 세션 간 진행 상황 유지
- `AuthContext`로 대시보드 인증 상태 관리

#### 4. Care 모듈

- 정신 건강 평가 기능 (`/care` 라우트)
- Care → CareIntro → CareTest → CareResult 플로우
- 별도의 질문 데이터 및 진행 추적 훅

## 데이터베이스 설계

### PocketBase Collections

#### user_responses (사용자 응답)

| 필드 | 설명 |
|------|------|
| name, gender, age_range | 개인정보 (선택적) |
| answer_1 ~ answer_10 | 테스트 응답 |
| device_type, browser, location, traffic_source | 분석 데이터 |
| personality_type, type_code, scores | 결과 데이터 |
| duration | 세션 소요 시간 |
| id, created, updated | PocketBase 자동 생성 필드 |

#### stats (일별 통계)

- 클라이언트에서 `updateDailyStats()` 호출로 일별 집계 갱신

#### care_responses (정신 건강 응답)

- Care 모듈 사용자 데이터 별도 저장

### 보안 정책

- PocketBase API Rules로 데이터 접근 제어
- 익명 사용자 지원으로 개인정보 보호 최우선
- Public create/read, delete 불가

## 디자인 시스템

### 색상 팔레트

- **Primary**: 골드 톤 (#d6b585) - 프리미엄 느낌
- **Secondary**: 네이비 (#1c3163) - 신뢰성
- **Components**: shadcn/ui 기반 일관된 UI 시스템

### 반응형 디자인

- Mobile First 접근법 (360px+ 지원)
- Tailwind CSS responsive utilities 활용

### 애니메이션

- Framer Motion `useInView` 훅으로 스크롤 기반 애니메이션
- 순차적 stagger 애니메이션으로 사용자 몰입도 향상
- Transform 기반 GPU 가속 애니메이션

## 관리자 대시보드

- 인증 기반 접근 제어 (LoginPage + ProtectedRoute)
- Recharts를 활용한 데이터 시각화
- 성격 유형 분포, 디바이스별 접속 현황, 주간 성장률 추적
- `useStats`, `useWeeklyStats` 훅으로 데이터 조회

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드 (TypeScript 검사 포함)
npm run build

# 빌드 미리보기
npm run preview

# 코드 린팅
npm run lint
```

### 환경 변수

`.env` 파일 생성:

```env
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

### 경로 별칭

`@/*` → `./src/*` (tsconfig.json, vite.config.ts에서 설정)

## 기타 참고사항

- Vite 설정에서 `@tailwindcss/vite` 플러그인만 사용 (`@vitejs/plugin-react`는 devDependency이나 미사용)
- Kakao SDK 통합으로 카카오톡 공유 지원
- html2canvas-pro를 활용한 결과 이미지 생성 기능
- `pb.autoCancellation(false)` 설정으로 React 호환성 확보

## 저작권

**검사 문항 저작권**: 본 프로젝트에 사용된 성격 유형 검사 문항의 저작권은 (주)에이시지알에 있습니다.
