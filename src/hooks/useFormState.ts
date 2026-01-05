import { useState, useCallback } from 'react';
import type { Question, FormAnswer, FormState } from '../types/question';

export function useFormState(questions: Question[]) {
  const [state, setState] = useState<FormState>({
    currentQuestionIndex: 0,
    answers: {},
    isComplete: false,
    showOverview: false,
  });

  const updateAnswer = useCallback((answer: FormAnswer) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [answer.questionId]: answer,
      },
    }));
  }, []);

  const goToNext = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      if (nextIndex >= questions.length) {
        return {
          ...prev,
          showOverview: true,
        };
      }
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
      };
    });
  }, [questions.length]);

  const goToQuestion = useCallback(
    (index: number) => {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: Math.max(
          0,
          Math.min(index, questions.length - 1)
        ),
        showOverview: false,
      }));
    },
    [questions.length]
  );

  const submitForm = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isComplete: true,
      showOverview: false,
    }));
  }, []);

  const goToPrevious = useCallback(() => {
    setState((prev) => {
      if (prev.currentQuestionIndex === 0) return prev;
      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      };
    });
  }, []);

  const canProceed = useCallback(() => {
    const currentQuestion = questions[state.currentQuestionIndex];
    if (!currentQuestion) return false;

    const answer = state.answers[currentQuestion.id];

    if (currentQuestion.required) {
      if (!answer || answer.value === null || answer.value === '') {
        return false;
      }
      if (Array.isArray(answer.value) && answer.value.length === 0) {
        return false;
      }
    }

    return true;
  }, [questions, state.currentQuestionIndex, state.answers]);

  const getCurrentQuestion = useCallback(() => {
    return questions[state.currentQuestionIndex];
  }, [questions, state.currentQuestionIndex]);

  const getCurrentAnswer = useCallback(() => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return undefined;
    return state.answers[currentQuestion.id];
  }, [getCurrentQuestion, state.answers]);

  return {
    state,
    updateAnswer,
    goToNext,
    goToPrevious,
    goToQuestion,
    submitForm,
    canProceed,
    getCurrentQuestion,
    getCurrentAnswer,
  };
}
