<script>
	import {slide} from 'svelte/transition'
	import {uiState, globalData, testQuestions} from '../stores/store.js'
	import {addQuestion} from '../utils/utils.js'
	import Button from '../components/Button.svelte'
	import Icon from '../components/Icon.svelte'
	import Question from '../components/Question.svelte'

  $: selectedQuestion = $uiState.selectedQuestion
</script>



<div class="questions-tab-content">
	<div class="main">
		{#if $testQuestions.length > 0}
			{#key selectedQuestion}
				<Question bind:question={$testQuestions[$uiState.selectedQuestion]} 
									bind:i={selectedQuestion}
				/>
			{/key}
  			<Button title="Распределить баллы"
							size="large"
							--width="100%"
							on:click={() => $uiState.activeTab = 2}
				/>
		{:else}
		<div class="placeholder-wrap">
			<p>Пока в задании нет вопросов</p>
			<Button title="Добавить" --width="200px" on:click={addQuestion}/>
		</div>
		{/if}
	</div>
</div>
	


<style>
	.questions-tab-content{
		display: flex;
    flex-direction: column;
		align-items: start;
	}
	/* TODO: Если точно останется вид по одному вопросу за раз, почистить стили */

	.main{
		display: flex;
		flex-direction: column;
		gap: 28px;
		width: 100%;
		min-width: 0;
		padding-top: 24px;
		padding-bottom: 24px;
	}
	
	.placeholder-wrap{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 28px;
		padding: 48px;
		background: white;
		border: 1px solid var(--gray-300);
		border-radius: 8px;
	}

	h3 {
		font-weight: 500;
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