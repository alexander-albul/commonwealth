import { uiState, testQuestions } from '../stores/store.js';
import { get } from 'svelte/store';

export function addQuestion() {
  testQuestions.update((items) => [
    ...items,
    {
      question: '',
      format: 'variants',
      variants: ['', ''],
      correctVariants: [],
      freeAnswerCommentary: '',
      score: 1,
    },
  ]);

  uiState.update((state) => {
    state.selectedQuestion = get(testQuestions).length - 1;
    return state;
  });
}

// Вызов $store нельзя использовать в js файлах
// В конце update должен быть return