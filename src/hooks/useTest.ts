import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { questions } from '../data/questions';
import { calculatePersonalityType, personalityTypes } from '../data/personalityTypes';

export interface UserData {
  name: string;
  gender: string;
  ageRange: string;
  consent: boolean;
}

export interface TestState {
  currentQuestion: number;
  answers: Record<number, number>;
  isComplete: boolean;
  result: {
    type: string;
    scores: Record<string, number>;
  } | null;
  userData: UserData | null;
  userId: string | null;
}

export const useTest = () => {
  const [testState, setTestState] = useState<TestState>({
    currentQuestion: 0,
    answers: {},
    isComplete: false,
    result: null,
    userData: null,
    userId: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('workdna-test-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setTestState(parsed);
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
      // Create user record
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert([{
          name: userData.name || null,
          gender: userData.gender || null,
          age_range: userData.ageRange || null,
          consent_given: userData.consent,
        }])
        .select()
        .single();

      if (userError) throw userError;

      setTestState(prev => ({
        ...prev,
        userData,
        userId: user.id,
      }));

      return user.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (questionId: number, value: number) => {
    if (!testState.userId) {
      setError('User not found');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Save answer to database
      const { error: answerError } = await supabase
        .from('answers')
        .insert([{
          user_id: testState.userId,
          question_id: questionId,
          answer_value: value,
        }]);

      if (answerError) throw answerError;

      // Update local state
      const newAnswers = { ...testState.answers, [questionId]: value };
      const nextQuestion = testState.currentQuestion + 1;
      const isComplete = nextQuestion >= questions.length;

      setTestState(prev => ({
        ...prev,
        answers: newAnswers,
        currentQuestion: nextQuestion,
        isComplete,
      }));

      // If test is complete, calculate and save result
      if (isComplete) {
        const result = calculatePersonalityType(newAnswers);
        
        const { error: resultError } = await supabase
          .from('results')
          .insert([{
            user_id: testState.userId,
            personality_type: result.type,
            scores: result.scores,
          }]);

        if (resultError) throw resultError;

        setTestState(prev => ({
          ...prev,
          result,
        }));
      }

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