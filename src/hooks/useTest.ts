import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { questions } from '../data/questions';
import { calculatePersonalityType, personalityTypes } from '../data/personalityTypes';
import { detectDevice, detectBrowser, detectLocation, detectTrafficSource } from '../utils/browserDetection';

export interface UserData {
  name: string;
  gender: string;
  ageRange: string;
  consent: boolean;
}

export interface TestState {
  currentQuestion: number;
  answers: Record<number, string>;
  isComplete: boolean;
  result: {
    type: string;
    scores: Record<string, number>;
    typeCode: string;
  } | null;
  userData: UserData | null;
  userId: string | null;
  sessionStartTime: number;
}

export const useTest = () => {
  const [testState, setTestState] = useState<TestState>({
    currentQuestion: 0,
    answers: {},
    isComplete: false,
    result: null,
    userData: null,
    userId: null,
    sessionStartTime: Date.now(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('workdna-test-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setTestState({ ...parsed, sessionStartTime: parsed.sessionStartTime || Date.now() });
      } catch (e) {
        console.error('Failed to parse saved state:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (testState.userId) {
      localStorage.setItem('workdna-test-state', JSON.stringify(testState));
    }
  }, [testState]);

  const submitConsent = async (userData: UserData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Detect device and location information
      const deviceType = detectDevice();
      const browser = detectBrowser();
      const trafficSource = detectTrafficSource();
      const location = await detectLocation();

      // Create user record with all tracking data
      const { data: user, error: userError } = await supabase
        .from('user_responses')
        .insert([{
          name: userData.name || null,
          gender: userData.gender || null,
          age_range: userData.ageRange || null,
          consent_given: userData.consent,
          device_type: deviceType,
          browser: browser,
          traffic_source: trafficSource,
          country: location.country,
          region: location.region,
          session_duration_seconds: 0,
          test_started_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (userError) throw userError;

      setTestState(prev => ({
        ...prev,
        userData,
        userId: user.id,
        sessionStartTime: Date.now(),
      }));

      return user.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (questionId: number, value: string) => {
    if (!testState.userId) {
      setError('User not found');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Update the specific answer column
      const answerColumn = `answer_${questionId}`;
      
      const { error: updateError } = await supabase
        .from('user_responses')
        .update({
          [answerColumn]: value
        })
        .eq('id', testState.userId);

      if (updateError) throw updateError;

      // Update local state
      const newAnswers = { ...testState.answers, [questionId]: value };

      setTestState(prev => ({
        ...prev,
        answers: newAnswers,
      }));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const nextQuestion = () => {
    const nextQ = testState.currentQuestion + 1;
    if (nextQ >= questions.length) {
      // Complete the test
      completeTest();
    } else {
      setTestState(prev => ({
        ...prev,
        currentQuestion: nextQ,
      }));
    }
  };

  const previousQuestion = () => {
    if (testState.currentQuestion > 0) {
      setTestState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const completeTest = async () => {
    if (!testState.userId) return;

    setIsLoading(true);
    try {
      const result = calculatePersonalityType(testState.answers);
      const sessionDuration = Math.floor((Date.now() - testState.sessionStartTime) / 1000);
      
      const getEndingByType = (type: string) => {
        const endings = {
          AB: "진취적이며 자신감 있는 행동대장",
          AA: "관계 속에서 빛나는 사교왕",
          BB: "신뢰할 수 있는 솔직한 조언자",
          BA: "배려가 넘치는 따뜻한 평화주의자",
        };
        return endings[type as keyof typeof endings] || "";
      };
      
      const { error: resultError } = await supabase
        .from('user_responses')
        .update({
          personality_type: result.type,
          type_code: result.typeCode,
          scores: result.scores,
          ending: getEndingByType(result.type),
          session_duration_seconds: sessionDuration,
          test_completed_at: new Date().toISOString(),
        })
        .eq('id', testState.userId);

      if (resultError) throw resultError;

      setTestState(prev => ({
        ...prev,
        result,
        isComplete: true,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const restartTest = () => {
    setTestState({
      currentQuestion: 0,
      answers: {},
      isComplete: false,
      result: null,
      userData: null,
      userId: null,
      sessionStartTime: Date.now(),
    });
    localStorage.removeItem('workdna-test-state');
  };

  const shareResult = async () => {
    if (!testState.result) return;

    const personalityType = personalityTypes[testState.result.type];
    const shareText = `나의 업무 스타일은 "${personalityType.name}"입니다! 🎯\n\n${personalityType.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WorkDNA 테스트 결과',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Sharing cancelled', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText + '\n\n' + window.location.href);
        alert('결과가 클립보드에 복사되었습니다!');
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  return {
    testState,
    isLoading,
    error,
    submitConsent,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    restartTest,
    shareResult,
    currentQuestion: testState.currentQuestion < questions.length 
      ? questions[testState.currentQuestion] 
      : null,
    personalityType: testState.result 
      ? personalityTypes[testState.result.type] 
      : null,
  };
};