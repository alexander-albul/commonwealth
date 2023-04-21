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
		}]
		$uiState.selectedQuestion = $testQuestions.length - 1
	}

  $: selectedQuestion = $uiState.selectedQuestion
</script>



<div class="questions-tab-content">
	<div class="main">
		{#key selectedQuestion}
			<Question bind:question={$testQuestions[$uiState.selectedQuestion]} 
								bind:i={selectedQuestion}
			/>
		{/key}
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
    margin-bottom: 16px;
		padding: 8px;
		background: white;
		border: 1px solid var(--gray-300);
		border-radius: 8px;
    overflow: hidden;
	}

	.sidebar-question{
		display: block;
    width: 100%;
		padding: 8px;
		white-space: nowrap; 
		text-overflow: ellipsis;
		overflow: hidden;
    text-align: left;
		color: var(--gray-900);
    background: transparent;
    border: none;
		border-radius: 6px;
	}

  .sidebar-question.active{
    background: var(--gray-200);
  }

	.buttons-wrap{
		display: flex;
		gap: 8px;
	}

	:global(.buttons-wrap > *){
		min-width: 0;
	}
</style>