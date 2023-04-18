<div class="question-card">
  
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

</div>