import { writable } from 'svelte/store';

const stored = localStorage.uiState;

export const uiState = writable({
  activeTab: 0,
  questionTabVariant: 'b',
  viewVariant: 'sidebar',
  selectedQuestion: 0,
  triedToSend: false,
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
      title: 'Варианты ответа',
      value: 'variants',
    },
    {
      title: 'Свободная форма',
      value: 'free',
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
    variants: [
      { id: 0, text: '', correct: false },
      { id: 1, text: '', correct: false },
    ],
    freeAnswerCommentary: '',
    score: 1,
    errors: {
      emptyQuestion: false,
      noVariants: false,
      noCorrectVariants: false,
      emptyFreeAnswerCommentary: false,
    },
  },
]);

export const errors = writable();
