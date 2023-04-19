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
	} 
</script>


<div class="questions-tab-content">
	<div class="main">
		{#each $testQuestions as question, i}
			<Question question={question} i={i}/>
			<!-- <div class="question-card">
				<h2 id="question-{i}">Вопрос {i + 1}</h2>
				<Textarea bind:value={question.question} placeholder="Текст вопроса" initialSize="96px"/>
				<SegmentedControl items={globalData.testFormats} 
													name="format-{i}" 
													bind:selectedItem={$testQuestions[i].format} 
													--width="350px"
				/>

				{#if question.format === 'variants'}
				<div class="variants-wrap">
					{#each question.variants as answer, i}
						<div class="variant">							
							<Textarea bind:value={answer} placeholder="Ответ {i+1}" hasButton resizable={false}/>
							<Toggle/>
						</div>
					{/each}
					<Button title="Добавить вариант" 
									type="secondary" 
									on:click={() => question.variants = [...question.variants, '']}
					/>
				</div>
				{:else if question.format === 'free'}
				<div class="free-answer-wrap">
					<Textarea placeholder="Пример правильного ответа, рекомендации по оценке для проверяющего" initialSize="96px"/>
				</div>
				{/if}

			</div> -->
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
	
	h2{
    margin-top: -56px;
    padding-top: 56px;
		font-size: 22px;
		font-weight: 500;
	}
	
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
	}
	
	.sidebar{
		flex-shrink: 0;
		position: sticky;
		top: 0;
		padding-top: 24px;
    max-height: calc(100vh - 28px * 2);
		width: 360px;
    overflow: auto;
		transition: width .3s ease-in-out;
	}
	
	@media (min-width: 768px) and (max-width: 1024px) {
		.sidebar{
			width: 200px;
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
	
	.sidebar-question:target{
		color: red;
		background-color: black;
	}
	
	.variants-wrap{
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	
	.variant{
		display: flex;
		gap: 12px;
	}

	.buttons-wrap{
		display: flex;
		gap: 8px;
	}

	:global(.buttons-wrap > *){
		min-width: 0;
	}
</style>