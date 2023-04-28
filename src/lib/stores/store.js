import { writable } from 'svelte/store';

const stored = localStorage.uiState;

export const uiState = writable({
  activeTab: 1,
  questionTabVariant: 'b',
  viewVariant: 'sidebar',
  selectedQuestion: 0,
});

export const globalData = {
  audience: ['8 класс', '9 класс', '10 класс', 'Студенты'],
  fields: [
    'Юриспруденция',
    'Экономика',
    'Математика и информатика',
    'Международные отношения',
  ],
  testFormats: [
    {
      title: 'Варианты ответа', value: 'variants',
    },
    {
      title: 'Свободная форма', value: 'free',
    },
  ],
};

export const testInfo = writable({
  title: 'Новое задание',
  audience: '8 класс',
  fields: 'Юриспруденция',
});

export const testQuestions = writable([
  {
    question: '',
    format: 'variants',
    variants: ['', ''],
    correctVariants: [],
    freeAnswerCommentary: '',
    score: 1,
    errors: {
      emptyQuestion: false,
      noVariants: false,
      noCorrectVariants: false,
      emptyFreeAnswerCommentary: false,
    }
  },
]);

export const errors = writable();
