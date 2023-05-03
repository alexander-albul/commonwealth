<script>
	import {uiState, globalData, testInfo, testQuestions} from '../stores/store.js'
	import Button from '../components/Button.svelte'
	import Question from '../components/Question.svelte'
	
	let autosum = true;
	
	let sum

	$: if (autosum) {
		sum = $testQuestions.reduce((acc, question) => acc + question.score, 0)
	}

	// TODO: На кнопку нужно вешать "send", внутри которой есть проверка на ошибки
	function deepCheckAllQuestions() {
		if ($uiState.canBeSent){
			$uiState.sent = true
			return
		}

		$testQuestions.forEach(item => checkQuestion(item))
		$testQuestions = $testQuestions

		$uiState.triedToSend = true

		if ($testQuestions.some(item => hasErrors(item))) {
			$uiState.sendingBlocked = true
		} else {
			$uiState.sendingBlocked = false
			$uiState.canBeSent = true
		}
	}

	function checkQuestion(item) {

		item.errors.emptyQuestion = item.question === '' ? true : false;

		if (item.format === 'variants') {
			item.errors.noVariants = item.variants.length < 2;
			item.errors.noVariants = item.variants.filter(variant => variant.text != '').length < 2;
			item.errors.noCorrectVariants = !item.variants.some(variant => variant.correct === true)

			item.errors.emptyFreeAnswerCommentary = false
		} else if (item.format === 'free'){
			item.errors.emptyFreeAnswerCommentary = item.freeAnswerCommentary === '' ? true : false;

			item.errors.noVariants = false
			item.errors.noCorrectVariants = false
		}

		item.errors = item.errors
	}

	function hasErrors(item){
		return Object.values(item.errors).some(val => val)
	}

	function hideNotification() {
		setTimeout(() => {
      notificationHidden = true;
    }, 3000);
	}

</script>



<div class="score-tab-content">
<h2>Баллы</h2>
	<div class="questions-scores-wrap">
		{#each $testQuestions as question, i}
			<div class="question">
					<div class="question-title">
					{question.question ? `${i + 1}. ${question.question}` : `Вопрос ${i + 1}` }
				</div>
				<div class="question-score">
					<input  type="number" bind:value={question.score} min={1}>
				</div>
			</div>
		{/each}
		<div class="separator"></div>
		<div class="max-score">
			<div>Максимальное количество баллов:</div>
			{#if autosum}
			<input type="number" 
						 value={sum}
						 min={autosum ? $testQuestions.length : 1} 
						 disabled
			>
			{:else}
			<input type="number" 
						 value={sum}
						 min={$testQuestions.length} 
			>
			{/if}
		</div>
			<label>
				<input type="checkbox" bind:checked={autosum}>
				<span> Суммировать автоматически<span>
			<label>
	</div>
</div>
	<Button title="Отправить на проверку"
			size="large"
			--width="100%"
			on:click={deepCheckAllQuestions}
	/>



<style>
	h2{
		font-size: 22px;
		font-weight: 500;
	}

	.score-tab-content{
			display: flex;
			flex-direction: column;
			gap: 28px;
			margin-top: 24px;
			padding: 36px;
			background: white;
			border: 1px solid var(--gray-300);
			border-radius: 8px;
	}

	.questions-scores-wrap{
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
		max-width: 600px;
	}

	.question{
			display: flex;
			align-items: center;
			gap: 16px;
	}

	.question-title{
		flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
	}

	.max-score{
		display: flex;
		align-items: center;
	}

	.max-score div{
		width: 100%;
	}

	.separator{
		margin-block: .5rem;
		height: 1px;
		background: rgba(0 0 0 / .1);
	}

	input{
		max-width: 100px;
		text-align: center;
	}

	input:disabled{
		border: none;
		cursor: not-allowed;
	}

	label{
		display: block;
	}
</style>