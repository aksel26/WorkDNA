import { useState } from 'react';
import { ConsentModal } from './components/ConsentModal';
import { TestQuestion } from './components/TestQuestion';
import { TestResult } from './components/TestResult';
import { useTest } from './hooks/useTest';
import { questions } from './data/questions';
import { Brain, Users, BarChart3 } from 'lucide-react';

function App() {
  const [showConsentModal, setShowConsentModal] = useState(false);
  const {
    testState,
    isLoading,
    error,
    submitConsent,
    submitAnswer,
    restartTest,
    shareResult,
    currentQuestion,
    personalityType,
  } = useTest();

  const handleStart = () => {
    setShowConsentModal(true);
  };

  const handleConsentSubmit = async (userData: { name: string; gender: string; ageRange: string; consent: boolean }) => {
    try {
      await submitConsent(userData);
      setShowConsentModal(false);
    } catch (err) {
      console.error('Failed to submit consent:', err);
    }
  };

  const handleAnswer = async (questionId: number, value: string) => {
    try {
      await submitAnswer(questionId, value);
    } catch (err) {
      console.error('Failed to submit answer:', err);
    }
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={restartTest} className="btn-primary">
            다시 시도하기
          </button>
        </div>
      </div>
    );
  }

  // Landing page
  if (!testState.userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full text-white text-2xl font-bold mb-6">
                <Brain size={32} />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                WorkDNA 업무 스타일 테스트
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                나만의 업무 스타일을 발견하고 팀워크를 향상시켜보세요
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full text-primary-600 mb-4">
                  <Brain size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  정확한 분석
                </h3>
                <p className="text-gray-600">
                  {questions.length}개의 간단한 질문으로 당신의 업무 스타일을 정확히 분석합니다
                </p>
              </div>
              <div className="card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full text-primary-600 mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  팀워크 향상
                </h3>
                <p className="text-gray-600">
                  동료들과 결과를 공유하여 더 나은 협업 방법을 찾아보세요
                </p>
              </div>
              <div className="card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full text-primary-600 mb-4">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  개인 성장
                </h3>
                <p className="text-gray-600">
                  나의 강점과 개발 포인트를 파악하여 성장의 기회를 찾으세요
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <button
                onClick={handleStart}
                disabled={isLoading}
                className="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '준비 중...' : '테스트 시작하기'}
              </button>
              <p className="text-sm text-gray-500">
                소요 시간: 약 5분 | 완전 무료
              </p>
            </div>
          </div>
        </div>

        {/* Consent Modal */}
        <ConsentModal
          isOpen={showConsentModal}
          onClose={() => setShowConsentModal(false)}
          onSubmit={handleConsentSubmit}
        />
      </div>
    );
  }

  // Test in progress
  if (!testState.isComplete && currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto">
          <TestQuestion
            question={currentQuestion}
            currentAnswer={testState.answers[currentQuestion.id] || null}
            onAnswer={handleAnswer}
            questionNumber={testState.currentQuestion + 1}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    );
  }

  // Test complete - show results
  if (testState.isComplete && testState.result && personalityType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-8">
        <div className="container mx-auto">
          <TestResult
            personalityType={personalityType}
            scores={testState.result.scores}
            onRestart={restartTest}
            onShare={shareResult}
          />
        </div>
      </div>
    );
  }

  // Loading state only when explicitly loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={restartTest} className="btn-primary">
            다시 시도하기
          </button>
        </div>
      </div>
    );
  }

  // Fallback - should not reach here
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">예상치 못한 상태입니다</h2>
        <button onClick={restartTest} className="btn-primary">
          처음부터 시작하기
        </button>
      </div>
    </div>
  );
}

export default App;