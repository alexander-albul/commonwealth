<script>
	import {slide} from 'svelte/transition'
	import {globalData, testQuestions} from '../stores/store.js'
	import Button from './Button.svelte'
	import Icon from './Icon.svelte'
	import Textarea from './Textarea.svelte'
	import SegmentedControl from './SegmentedControl.svelte'
	import Checkbox from './Checkbox.svelte'
  export let question = {}
  export let i
	export let focusedVariant
	
	// Под большим вопросом
	export let questionError = null
	export let variantsError = ['test error', null, 'asd']
</script>



<div class="question-card">

	<!-- Header -->
  <h2 id="question-{i}">
		{question.question ? `${i + 1}. ${question.question}` : `Вопрос ${i + 1}` }
	</h2>
  
	<!-- Question -->
	<Textarea bind:value={question.question} 
						placeholder="Текст вопроса" 
						initialSize="96px" 
						error={questionError}
	/>
  
	<!-- Answer type choice -->
	<SegmentedControl items={globalData.testFormats} 
                    name="format-{i}" 
                    bind:selectedItem={$testQuestions[i].format}
                    --width="350px"
  />
	
	<!-- Answer variants-->
  {#if question.format === 'variants'}
		<div class="variants-wrap">
			{#each question.variants as answer, i}
				<div class="variant" 
						 class:focused={focusedVariant === i}
						 transition:slide|local={{duration: 300}}
				>							
					<Checkbox/>
					<Textarea bind:value={answer} 
										placeholder="Ответ {i+1}"
										on:focus={() => focusedVariant = i}
										on:blur={() => focusedVariant = null}
										borderless
										resizable={false}
										initialSize="20px"
										placeholderColor="var(--gray-600)"
										inputCustomCSS="padding-top: 16px"
										wrapCustomCSS="padding-bottom: 12px"
										error={variantsError[i]}
					/>
					<button on:click={() => {question.variants.splice(i, 1); question.variants = question.variants}}>
						<Icon type="trash" color="var(--gray-500)"/>
					</button>
				</div>
			{/each}
			<Button title="Добавить вариант" 
							type="white"
							--width="fit-content"
							on:click={() => question.variants = [...question.variants, '']}
			/>
		</div>
	{/if}
	
	<!-- Free answer -->
  {#if question.format === 'free'}
  <div class="free-answer-wrap">
    <Textarea placeholder="Пример правильного ответа, рекомендации по оценке для проверяющего" 
							initialSize="96px"
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
		font-size: 22px;
		font-weight: 500;
		white-space: nowrap; 
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.variants-wrap{
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	
	.variant{
		position: relative;
		display: flex;
		align-items: start;
		background-color: var(--gray-50);
		border-radius: 8px;
		box-shadow: 0 0 0 1px var(--gray-200);
		transition: box-shadow .15s;
	}
	
	.variant:hover{
		box-shadow: 0 0 0 1px var(--gray-400);
		/* transition: box-shadow 0s; */
	}
	
	.variant.focused{
		background: white;
    outline: 2px solid black;
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