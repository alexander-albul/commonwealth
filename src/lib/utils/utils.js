export function addQuestion() {
  $testQuestions = [
    ...$testQuestions,
    {
      question: '',
      format: 'variants',
      variants: ['', ''],
      correctVariants: [],
      freeAnswerCommentary: '',
      score: 1,
    },
  ];
  $uiState.selectedQuestion = $testQuestions.length - 1;
}
