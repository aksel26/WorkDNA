# WorkDNA 업무 스타일 테스트

업무 상황에 특화된 성격 테스트 서비스입니다. 12개의 상황 기반 질문을 통해 8가지 업무 스타일 유형을 분석합니다.

## 🚀 빠른 시작

### 1. 환경 변수 설정

`.env` 파일을 수정하여 Supabase 정보를 입력하세요:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase 데이터베이스 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. SQL 에디터에서 다음 마이그레이션 파일 실행:

```sql
-- supabase/migrations/001_initial_schema.sql 내용 복사하여 실행
```

### 3. 개발 서버 실행

```bash
npm install
npm run dev
```

## 🏗️ 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── ConsentModal.tsx    # 개인정보 동의 모달
│   ├── TestQuestion.tsx    # 질문 표시 컴포넌트
│   └── TestResult.tsx      # 결과 표시 컴포넌트
├── data/               # 데이터 정의
│   ├── questions.ts        # 12개 테스트 질문
│   └── personalityTypes.ts # 8가지 성격 유형
├── hooks/              # 커스텀 훅
│   └── useTest.ts          # 테스트 상태 관리
├── lib/                # 라이브러리 설정
│   └── supabase.ts         # Supabase 클라이언트
└── App.tsx             # 메인 앱 컴포넌트
```

## 📊 성격 유형

1. **전략적 계획자** - 체계적이고 논리적인 접근
2. **협력적 조화자** - 팀워크 중시, 화합 추구
3. **창의적 혁신가** - 새로운 아이디어와 변화 주도
4. **분석적 연구자** - 데이터 기반 심층 분석
5. **실행력 있는 수행자** - 빠른 실행과 완수
6. **적응형 유연가** - 변화 적응과 유연한 대응
7. **지원적 멘토** - 동료 지원과 성장 도움
8. **독립적 전문가** - 전문성 기반 독립 작업

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build**: Vite
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Icons**: Lucide React
- **Deployment**: Vercel (권장)

## 📱 주요 기능

- ✅ 개인정보 동의 및 선택적 정보 수집
- ✅ 12개 상황 기반 질문
- ✅ 실시간 진행률 표시
- ✅ 8가지 성격 유형 분류
- ✅ 반응형 디자인 (모바일 우선)
- ✅ 결과 공유 기능
- ✅ 로컬 스토리지 진행 상황 저장

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 타입 체크
npm run tsc

# 린트 검사
npm run lint
```

## 🚦 Supabase 설정 가이드

1. **프로젝트 생성**
   - Supabase 대시보드에서 새 프로젝트 생성
   - 프로젝트 URL과 anon key 복사

2. **데이터베이스 설정**
   - SQL 에디터에서 `supabase/migrations/001_initial_schema.sql` 실행
   - Row Level Security 정책 자동 적용됨

3. **환경 변수 설정**
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

## 🎯 성공 지표

- 테스트 완료율 ≥ 70%
- 평균 테스트 소요 시간 ≤ 5분
- 모바일 반응형 지원 (360px+)
- 서버 응답 시간 ≤ 500ms

## 📝 라이선스

MIT License