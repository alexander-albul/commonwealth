<script>
	import {slide} from 'svelte/transition'
	import {uiState, globalData, testQuestions} from '../../stores/store.js'
	import Button from '../Button.svelte'
	import Icon from '../Icon.svelte'
	import Question from '../Question.svelte'
	
	function addQuestion() {
		$testQuestions = [...$testQuestions, {
		question: '',
		format: 'variants',
		variants: ['', '',],
		correctVariants: [],
		freeAnswerCommentary: '',
		score: 1,
	}]
	} 
</script>


<div class="questions-tab-content">
	<div class="main">
		{#each $testQuestions as question, i}
			<Question bind:question={question} i={i}/>
		{/each}
		<div class="buttons-wrap">
			<Button title="Добавить вопрос" 
							type="white" 
							size="large"
							--width="100%"
							on:click={addQuestion}
			/>
			<Button title="Распределить баллы"
							size="large"
							--width="100%"
							on:click={() => $uiState.activeTab = 2}
			/>
	</div>
	</div>
		
	<div class="sidebar">
		<div class="sidebar-questions-wrap">
			{#each $testQuestions as question, i}
				<a href="#question-{i}" class="sidebar-question">
					{question.question ? `${i + 1}. ${question.question}` : `Вопрос ${i + 1}` }
				</a>
			{/each}
		</div>
	</div>
	
</div>
	
<style>
	.questions-tab-content{
		display: flex;
		gap: 24px;
		align-items: start;
	}
	
	.main{
		display: flex;
		flex-direction: column;
		gap: 28px;
		width: 100%;
		min-width: 0;
		padding-top: 24px;
		padding-bottom: 24px;
	}
	
	.sidebar{
		flex-shrink: 0;
		position: sticky;
		top: 0;
		padding-top: 24px;
    max-height: calc(100vh - 28px * 2);
		width: 300px;
    overflow: auto;
		transition: width .3s ease-in-out;
	}
	
	@media (min-width: 768px) and (max-width: 1024px) {
		.sidebar{
			width: 240px;
		}
	}
	
	@media (max-width: 767px) {
		.sidebar{
			display: none;
		}
	}
	
	.sidebar-questions-wrap{
		border: 1px solid var(--gray-300);
		border-radius: 8px;
		background: white;
	}

	.sidebar-question{
		display: block;
		padding: 16px;
		white-space: nowrap; 
		text-overflow: ellipsis;
		overflow: hidden;
		color: var(--gray-900);
	}

	.buttons-wrap{
		display: flex;
		gap: 8px;
	}

	:global(.buttons-wrap > *){
		min-width: 0;
	}
</style>