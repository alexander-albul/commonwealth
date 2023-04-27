<script>
	import {uiState, globalData, testInfo, testQuestions} from '../stores/store.js'
	import Button from '../components/Button.svelte'
	import Tabs from '../components/Tabs.svelte'
	import SegmentedControl from '../components/SegmentedControl.svelte'
	import InfoTabB from '../tabs/InfoTabB.svelte'
	import QuestionsTabC from '../tabs/QuestionsTabC.svelte'
	import ScoreTab from '../tabs/ScoreTab.svelte'

	$: tabs = [
		{title: 'Информация', component: InfoTabB},
		{title: 'Вопросы', component: QuestionsTabC},
		{title: 'Баллы', component: ScoreTab},
	]

  function addQuestion() {
		$testQuestions = [...$testQuestions, {
			question: '',
			format: 'variants',
			variants: ['', '',],
			correctVariants: [],
			freeAnswerCommentary: '',
      score: 1,
		}]
		$uiState.selectedQuestion = $testQuestions.length - 1
	}

  $: selectedQuestion = $uiState.selectedQuestion
</script>




<main>
	<div class="header">
		<div class="title-wrap">		
			<h2>{$testInfo.title}</h2>
			<div class="header-buttons">
				<Button type="outline" title="Сохранить"/>
				<Button title="Отправить на проверку"/>
			</div>
		</div>
	</div>

  <div class="tab-content">

    <!-- Sidebar -->
    <div class="sidebar">
      <button class="sidebar-item"
              class:active={$uiState.activeTab === 0}
              on:click={() => $uiState.activeTab = 0}
      >Информация</button>
      <div class="sidebar-group">
        <div class="sidebar-questions-wrap">
            {#each $testQuestions as question, i}
              <button
                class="sidebar-question"
                class:active={$uiState.activeTab === 1 && selectedQuestion === i}
                on:click={() => {$uiState.activeTab = 1; $uiState.selectedQuestion = i}}
              >
                {question.question
                  ? `${i + 1}. ${question.question}`
                  : `Вопрос ${i + 1}`}
              </button>
            {/each}
        </div>
        <button class="sidebar-question" on:click={addQuestion}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>Добавить вопрос</span>
        </button>
      </div>
      <button class="sidebar-item"
              class:active={$uiState.activeTab === 2}
              on:click={() => $uiState.activeTab = 2}
      >
        Баллы
      </button>
    </div>
  
    <!-- Main -->
    <div class="main">
      <svelte:component this={tabs[$uiState.activeTab].component} />
    </div>


  </div>
</main>



<style>	
	main{
		flex-shrink: 0;
		margin-inline: auto;
		width: 100%;
		max-width: 1240px;
		padding: 28px;
	}

	.header{
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding-block: 28px;
		background: white;
		border: 1px solid var(--gray-300);
		border-radius: 8px;
	}
	
	.title-wrap{
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 28px;
		padding-inline: 36px;
		overflow: hidden;
	}
	
	.header-buttons{
		flex-shrink: 0;
		display: flex;
		gap: 8px;
	}

	.tab-content{
    display: flex;
    align-items: start;
		max-height: 100%;
    gap: 24px;
	}

  .main{
		display: flex;
		flex-direction: column;
		gap: 28px;
		width: 100%;
		min-width: 0;
		padding-bottom: 24px;
	}

  .sidebar{
		flex-shrink: 0;
		position: sticky;
		top: 0;
		margin-top: 24px;
    max-height: calc(100vh - 28px * 2);
		width: 300px;
    overflow: auto;
		transition: width .3s ease-in-out;
		border: 1px solid var(--gray-300);
		border-radius: 8px;
    background: white;
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
	
  .sidebar-item{
		display: block;
    width: 100%;
    border: none;
    background: white;
		padding: 12px;
    text-align: left;
  }

  .sidebar-group{
		border-block: 1px solid var(--gray-300);
  }

	.sidebar-questions-wrap{
		background: white;
    overflow: hidden;
	}

	.sidebar-question{
		display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
		padding: 12px 8px;
    padding-left: 16px;
		white-space: nowrap; 
		text-overflow: ellipsis;
		overflow: hidden;
    text-align: left;
		color: var(--gray-900);
    background: transparent;
    border: none;
	}

  .sidebar-item.active,
  .sidebar-question.active{
    font-weight: 500;
    background: var(--gray-200);
  }
</style>