import { useState, useEffect, useCallback } from 'react';

export type CareScreen = 'intro' | 'test' | 'result';

export interface CareProgressData {
  currentScreen: CareScreen;
  testAnswers: Record<string, number>;
  questionIndex: number;
  startedAt: string;
  lastSavedAt: string;
}

export interface CareProgressInfo {
  questionIndex: number;
  totalQuestions: number;
  lastSaved: string;
}

const STORAGE_KEY = 'care_progress';
const EXPIRY_HOURS = 24; // 24시간 후 만료

export function useCareProgress() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<CareScreen>('intro');
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hasOngoingTest, setHasOngoingTest] = useState(false);

  // localStorage에서 진행상황 로드
  const loadProgress = useCallback((): CareProgressData | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const data: CareProgressData = JSON.parse(stored);
      
      // 만료 체크
      const startedAt = new Date(data.startedAt);
      const now = new Date();
      const hoursElapsed = (now.getTime() - startedAt.getTime()) / (1000 * 60 * 60);
      
      if (hoursElapsed > EXPIRY_HOURS) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to load care progress:', error);
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }, []);

  // localStorage에 진행상황 저장
  const saveProgress = useCallback((data: Partial<CareProgressData>) => {
    try {
      const existing = loadProgress();
      const now = new Date().toISOString();
      
      const progressData: CareProgressData = {
        currentScreen: data.currentScreen ?? existing?.currentScreen ?? 'intro',
        testAnswers: data.testAnswers ?? existing?.testAnswers ?? {},
        questionIndex: data.questionIndex ?? existing?.questionIndex ?? 0,
        startedAt: existing?.startedAt ?? now,
        lastSavedAt: now,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
    } catch (error) {
      console.error('Failed to save care progress:', error);
    }
  }, [loadProgress]);

  // 진행상황 클리어
  const clearProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentScreen('intro');
    setTestAnswers({});
    setQuestionIndex(0);
    setHasOngoingTest(false);
  }, []);

  // 진행중인 테스트 정보 가져오기
  const getProgressInfo = useCallback((): CareProgressInfo | null => {
    const progress = loadProgress();
    if (!progress || progress.currentScreen !== 'test') return null;

    return {
      questionIndex: progress.questionIndex,
      totalQuestions: 10, // careQuestions 길이
      lastSaved: progress.lastSavedAt,
    };
  }, [loadProgress]);

  // 컴포넌트 마운트 시 진행상황 복원
  useEffect(() => {
    const progress = loadProgress();
    
    if (progress) {
      setCurrentScreen(progress.currentScreen);
      setTestAnswers(progress.testAnswers);
      setQuestionIndex(progress.questionIndex);
      
      // 테스트 중인 경우에만 hasOngoingTest를 true로 설정
      if (progress.currentScreen === 'test') {
        setHasOngoingTest(true);
      }
    }
    
    setIsLoaded(true);
  }, [loadProgress]);

  // 상태 변경 시 자동 저장
  const updateProgress = useCallback((updates: Partial<CareProgressData>) => {
    if (!isLoaded) return;

    // 상태 업데이트
    if (updates.currentScreen !== undefined) {
      setCurrentScreen(updates.currentScreen);
    }
    if (updates.testAnswers !== undefined) {
      setTestAnswers(updates.testAnswers);
    }
    if (updates.questionIndex !== undefined) {
      setQuestionIndex(updates.questionIndex);
    }

    // localStorage 저장
    saveProgress(updates);

    // hasOngoingTest 상태 업데이트
    if (updates.currentScreen === 'test') {
      setHasOngoingTest(true);
    } else if (updates.currentScreen === 'intro' || updates.currentScreen === 'result') {
      setHasOngoingTest(false);
    }
  }, [isLoaded, saveProgress]);

  // 새 테스트 시작
  const startNewTest = useCallback(() => {
    clearProgress();
    updateProgress({ 
      currentScreen: 'test', 
      testAnswers: {}, 
      questionIndex: 0 
    });
  }, [clearProgress, updateProgress]);

  // 진행중인 테스트 계속하기
  const continueTest = useCallback(() => {
    updateProgress({ currentScreen: 'test' });
  }, [updateProgress]);

  // 테스트 완료
  const completeTest = useCallback((finalAnswers: Record<string, number>) => {
    updateProgress({ 
      currentScreen: 'result', 
      testAnswers: finalAnswers 
    });
  }, [updateProgress]);

  return {
    // 상태
    isLoaded,
    currentScreen,
    testAnswers,
    questionIndex,
    hasOngoingTest,
    
    // 액션
    updateProgress,
    startNewTest,
    continueTest,
    completeTest,
    clearProgress,
    
    // 유틸리티
    getProgressInfo,
  };
}