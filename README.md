# WorkDNA - 직장인 성격유형 진단 웹 애플리케이션

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.11-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.50.3-3ECF8E?style=flat-square&logo=supabase&logoColor=white)

직장에서의 성격 유형을 분석하는 React 기반 웹 애플리케이션입니다. 10개의 질문을 통해 사용자의 성격을 4가지 유형(AA, AB, BA, BB)으로 분류하고, 개인화된 결과와 함께 팀 최적화 제안을 제공합니다.

## 🎯 프로젝트 개요

WorkDNA는 직장인을 위한 성격 유형 진단 도구로, 사용자 경험을 중시한 모던 웹 애플리케이션입니다. React 19의 최신 기능과 고품질 UI 라이브러리를 활용하여 매끄러운 사용자 경험을 제공합니다.

### 주요 특징

- **성격 유형 분석**: 10개 질문으로 4가지 성격 유형 (사교왕, 행동대장, 평화주의자, 분석왕) 진단
- **실시간 데이터 분석**: Supabase를 활용한 실시간 사용자 데이터 수집 및 분석
- **반응형 디자인**: 모바일 우선 설계로 모든 디바이스에서 최적화된 경험
- **애니메이션**: Framer Motion을 활용한 부드러운 인터랙션과 시각적 피드백
- **관리자 대시보드**: 실시간 통계 및 사용자 행동 분석 도구

## 🛠 기술 스택

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

### Backend & Data

- **Supabase 2.50.3** - PostgreSQL 기반 BaaS
- **Row Level Security (RLS)** - 데이터 보안 정책 적용

### 개발 도구

- **ESLint 9.29.0** - 코드 품질 관리
- **PostCSS & Autoprefixer** - CSS 후처리

## 🏗 아키텍처

### 컴포넌트 구조

```
src/
├── components/           # UI 컴포넌트
│   ├── ui/              # 재사용 가능한 기본 컴포넌트
│   ├── magicui/         # 고급 애니메이션 컴포넌트
│   └── share/           # 소셜 공유 기능
├── hooks/               # 커스텀 훅
├── contexts/            # React Context API
├── utils/               # 유틸리티 함수
└── data/               # 정적 데이터
```

### 라우팅 구조 (AppRouter.tsx)

- `/` → TestApp (메인 성격 테스트 플로우)
- `/dashboard` → Dashboard (보호된 관리자 분석)
- `/care` → Care 컴포넌트 (정신 건강 평가 모듈)

### 주요 기능 구현

#### 1. 성격 유형 진단 시스템

- **Questions 1-5**: 외향형(A) vs 내향형(B) 성향
- **Questions 6-10**: 감정형(A) vs 사고형(B) 성향
- **4가지 조합**: AA, AB, BA, BB 비교 점수 시스템

```typescript
// src/utils/personalityTypeUtils.ts
export const getPersonalityTypeAlias = (typeCode: string): string => {
  const typeAliases: Record<string, string> = {
    AB: "행동대장",
    AA: "사교왕",
    BB: "조언자",
    BA: "평화주의자",
  };
  return typeAliases[typeCode] || typeCode;
};
```

#### 2. 애니메이션 시스템

- Framer Motion의 `useInView` 훅을 활용한 스크롤 기반 애니메이션
- 순차적 애니메이션으로 사용자 몰입도 향상 (`transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}`)
- 성능 최적화된 transform 기반 애니메이션

#### 3. 상태 관리

```typescript
// src/hooks/useTest.ts - 테스트 진행 상황 관리
// localStorage를 활용한 세션 지속성
// 커스텀 훅으로 로직 분리
```

## 📊 데이터베이스 설계

### user_responses 테이블

- **개인정보** (선택적): name, gender, age_range
- **테스트 응답**: answer_1 ~ answer_10
- **분석 데이터**: device_type, browser, location, traffic_source
- **결과 데이터**: personality_type, type_code, scores
- **세션 추적**: duration, created_at, updated_at

### 보안 정책

- Supabase RLS를 통한 데이터 접근 제어
- 익명 사용자 지원으로 개인정보 보호 최우선

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: 골드 톤 (#d6b585) - 프리미엄 느낌
- **Secondary**: 네이비 (#1c3163) - 신뢰성
- **UI Components**: shadcn/ui 컴포넌트 시스템 활용

### 반응형 디자인

- Mobile First 접근법 (360px+ 지원)
- Tailwind CSS의 responsive utilities 활용
- 다양한 디바이스에서 최적화된 사용자 경험

## 🚀 성능 최적화

### 렌더링 최적화

- React 19의 최신 최적화 기능 활용
- 컴포넌트 기반 아키텍처로 재사용성 극대화
- 코드 스플리팅 준비 완료

### 애니메이션 최적화

- Transform 기반 애니메이션으로 GPU 가속 활용
- `useInView` 훅으로 필요할 때만 애니메이션 실행
- 60fps 유지를 위한 최적화

## 📈 분석 및 모니터링

### 사용자 행동 분석

- 디바이스별 접속 현황 (`device_type` 추적)
- 테스트 완료율 추적
- 세션 지속 시간 분석 (`session_duration_seconds`)
- 성격 유형별 분포 현황

### 실시간 대시보드

```typescript
// src/components/Dashboard.tsx
// 관리자 전용 분석 인터페이스
// 주간/월간 성장률 추적
// Recharts를 활용한 데이터 시각화
```

## 🛡 보안 고려사항

- **개인정보 보호**: 최소한의 개인정보 수집
- **데이터 익명화**: 개인 식별 정보 없이 분석 가능
- **RLS 정책**: 데이터베이스 레벨 보안 적용
- **익명 접근**: Supabase 익명 접근 패턴 구현

## 📱 주요 기능

### 1. 진단 테스트 플로우

- 진취적인 스플래시 화면 (video 요소 활용)
- 10개 질문 단계별 진행
- 실시간 진행률 표시 (`Progress` 컴포넌트)
- 3초 인위적 로딩 지연으로 결과 기대감 조성

### 2. 개인화된 결과

- 성격 유형별 맞춤 분석
- 강점 및 개선점 제시
- 팀 구성 최적화 제안
- 소셜 공유 기능 (Kakao SDK 통합)

### 3. 관리자 도구

- 실시간 사용자 통계
- 성격 유형 분포 분석
- 디바이스별 접속 현황
- 주간 성장률 추적 (`useWeeklyStats` 훅)

### 4. Care 모듈

- 정신 건강 평가 기능
- 별도 라우팅 (`/care`)
- 개인화된 건강 처방 제안

## 🔧 개발 환경 설정

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

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎯 개발 성과

### 기술적 성과

- **최신 기술 스택**: React 19, TypeScript 5.8, Vite 7 등 최신 기술 적용
- **고품질 코드**: ESLint 9.29, TypeScript strict mode로 코드 품질 관리
- **사용자 경험**: Framer Motion으로 부드러운 애니메이션과 직관적인 인터페이스
- **확장성**: 컴포넌트 기반 아키텍처로 확장 가능한 구조

### 프론트엔드 전문성

- **React 생태계**: 최신 React 기능과 생태계 라이브러리 능숙한 활용
- **TypeScript**: 타입 안전성을 고려한 견고한 애플리케이션 구조
- **반응형 웹**: Tailwind CSS 4.x로 모든 디바이스 최적화
- **성능 최적화**: 애니메이션과 렌더링 성능 최적화 경험
- **상태 관리**: 커스텀 훅과 Context API를 활용한 효율적인 상태 관리
- **UI/UX 라이브러리**: shadcn/ui + Radix UI 조합으로 접근성 높은 컴포넌트 개발

### 비즈니스 가치

- **사용자 중심 설계**: 직장인의 성격 분석이라는 명확한 목표 달성
- **데이터 기반 의사결정**: 실시간 분석 대시보드로 서비스 개선 근거 마련
- **확장 가능한 아키텍처**: Care 모듈 등 추가 기능 확장 용이

## 📄 저작권

**검사 문항 저작권**: 본 프로젝트에 사용된 성격 유형 검사 문항의 저작권은 (주)에이시지알에 있습니다.
