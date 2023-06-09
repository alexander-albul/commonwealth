<script>
	import {slide} from 'svelte/transition'
	import { flip } from 'svelte/animate';
	import {uiState, globalData, testQuestions} from '../stores/store.js'
	import Button from './Button.svelte'
	import Icon from './Icon.svelte'
	import Textarea from './Textarea.svelte'
	import SegmentedControl from './SegmentedControl.svelte'
	import Checkbox from './Checkbox.svelte'

	export let question = {}
  export let i
	export let focusedVariant
	export let questionError = 'test'

	function deleteQuestion(i) {
		$testQuestions.splice(i,1)
		$testQuestions = $testQuestions
		$uiState.selectedQuestion = $testQuestions.length - 1
		$uiState = $uiState
	}

	function addVariant() {
		// Приходится определять последний айди так, чтобы не было ошибки пока не закончилась анимация
		let newId = question.variants.length ? question.variants[question.variants.length - 1].id + 1 : 0

		question.variants.push( 
      { 
				id: newId,
				text: '', 
				correct: false 
		})

		question.variants = question.variants
		reCheck()
	}

	function deleteVariant(i) {
		question.variants.splice(i, 1);
		question.variants = question.variants
		reCheck()
	}

	function reCheck() {
		if ($uiState.triedToSend === false) {
			return
		}
		deepCheckAllQuestions()
	}

	// TODO: Оставить только чек полей
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



<div class="question-card">

	<!-- Header -->
	<div class="header-wrap">
		<h2 id="question-{i}">
			{question.question ? `${i + 1}. ${question.question}` : `Вопрос ${i + 1}` }
		</h2>
		<div class="icon-button" on:click={() => deleteQuestion(i)}>
			<Icon type="delete" color="var(--gray-500)"/>
		</div>
	</div>
  
	<!-- Question -->
	<Textarea bind:value={question.question} 
						placeholder="Текст вопроса" 
						initialSize="96px" 
						error={question.errors.emptyQuestion ? 'Введите текст вопроса' : ''}
						on:input={reCheck}
	/>

	<!-- Answer type choice -->
	<SegmentedControl items={globalData.testFormats} 
                    name="format-{i}"
										on:change={reCheck}
                    bind:selectedItem={$testQuestions[i].format}
                    --width="350px"
  />
	
	<!-- Answer variants-->
		{#if question.format === 'variants'}
			
			<!-- Error -->
			{#if question.errors.noVariants || question.errors.noCorrectVariants}
			<div class="answer-error" transition:slide|local={{duration: 100}}>
				<Icon type="alert" size="12" stroke="1.25"/>
				{#if question.errors.noVariants}
					<p>Укажите минимум два варианта ответа</p>
				{:else if question.errors.noCorrectVariants}
					<p>Выберите хотя бы один правильный ответ</p>
				{/if}
			</div>
			{/if}

			<!-- Variants -->
			<div class="variants-wrap">
				{#each question.variants as answer, i (answer.id)}
					<div class="variant" 
							class:focused={focusedVariant === i}
							transition:slide|local={{duration: 200}}
					>							
						<Checkbox bind:checked={answer.correct} 
											on:change={reCheck}
						/>
						<Textarea bind:value={answer.text}
											on:focus={() => focusedVariant = i}
											on:blur={() => focusedVariant = null}
											on:input={reCheck}
											borderless
											placeholder="Ответ {i+1}"
											resizable={false}
											initialSize="20px"
											placeholderColor="var(--gray-600)"
											inputCustomCSS="padding-top: 16px"
											wrapCustomCSS="padding-bottom: 12px"
											error={false}
						/>
						<button on:click={deleteVariant(i)}>
							<Icon type="trash" color="var(--gray-500)"/>
						</button>
				</div>
				{/each}
			</div>
				<Button title="Добавить вариант" 
								type="white"
								--width="fit-content"
								on:click={addVariant}
				/>
		{/if}
	
	<!-- Free answer -->
  {#if question.format === 'free'}
		<div class="free-answer-wrap">
			<Textarea placeholder="Пример правильного ответа, рекомендации по оценке для проверяющего"
								bind:value={question.freeAnswerCommentary}
								on:input={reCheck}
								initialSize="96px"
								error={question.errors.emptyFreeAnswerCommentary ? 'Не может быть пустым' : ''}
			/>
		</div>
  {/if}

</div>



<style>
	.question-card{
		display: flex;
		flex-direction: column;
		gap: 28px;
		padding: 36px;
		background: white;
		border: 1px solid var(--gray-300);
		border-radius: 8px;
	}

	h2{
    margin-top: -56px;
    padding-top: 56px;
		white-space: nowrap; 
		text-overflow: ellipsis;
		overflow: hidden;
		width: 100%;
	}
	
	.header-wrap{
		display: flex;
		align-items: center;
	}

	.variants-wrap{
		margin-bottom: -16px;
	}

	.variant{
		margin-bottom: 16px;
		position: relative;
		display: flex;
		align-items: start;
		background-color: var(--gray-50);
		border-radius: 8px;
		box-shadow: 0 0 0 1px var(--gray-200);
		transition: box-shadow .15s;
	}

	.variant:last-child{
		/* margin-bottom: 0; */
	}
	
	.variant:hover{
		box-shadow: 0 0 0 1px var(--gray-400);
		/* transition: box-shadow 0s; */
	}
	
	.variant.focused{
		background: white;
    outline: 2px solid black;
	}

	.answer-error{
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		color: #7f1d1d;
		background-color: #fef2f2;
		border: 1px solid #fee2e2;
		border-radius: 8px;
		padding: 8px 16px;
	}

	button{
		display: inline-flex;
		margin: 0;
		padding: 18px 16px;
		background: transparent;
		border: none;
		opacity: 0;
		cursor: pointer;
		transition: opacity .1s;
	}

	button:focus,
	.variant.focused button,
	.variant:hover button{
		opacity: 1;
	}
</style>