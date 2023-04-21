<script>
  export let question = {}
  export let i

	import {globalData, testQuestions} from '../stores/store.js'
	import Button from './Button.svelte'
	import Textarea from './Textarea.svelte'
	import SegmentedControl from './SegmentedControl.svelte'
	import Toggle from './Toggle.svelte'
</script>

<div class="question-card">
  <h2 id="question-{i}">{question.question ? `${i + 1}. ${question.question}` : `Вопрос ${i + 1}` }</h2>
  <Textarea bind:value={question.question} placeholder="Текст вопроса" initialSize="96px"/>
  <SegmentedControl items={globalData.testFormats} 
                    name="format-{i}" 
                    bind:selectedItem={$testQuestions[i].format}
										on:change
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
		display: flex;
		gap: 12px;
	}
</style>