<script>
	import {uiState, globalData, testInfo, testQuestions} from '../stores/store.js'
	import {addQuestion} from '../utils/utils.js'
	import {fade, fly, slide} from 'svelte/transition'
	import Button from '../components/Button.svelte'
	import Icon from '../components/Icon.svelte'
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

  $: selectedQuestion = $uiState.selectedQuestion

	let notificationHidden = false;


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
			// У кнопки отправки sent, в других местах canBeSent 
			$uiState.sent = true
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




<main>
	<div class="header">
		<div class="title-wrap">		
			<h2>{$testInfo.title}</h2>
			<div class="header-buttons">
				<Button type="outline" title="Сохранить черновик"/>
				<Button title="Отправить на проверку" on:click={deepCheckAllQuestions}/>
			</div>
		</div>
	</div>

  <div class="tab-content">

    <!-- Sidebar -->
		<!-- TOOD: Выделить в отдельный компонент -->
    <div class="sidebar">
      <button class="sidebar-item"
              class:active={$uiState.activeTab === 0}
              on:click={() => $uiState.activeTab = 0}
      >
				<span>Информация</span>
			</button>
      <div class="sidebar-group">
        <div class="sidebar-questions-wrap">
            {#each $testQuestions as question, i}
              <button
                class="sidebar-question"
                class:active={$uiState.activeTab === 1 && selectedQuestion === i}
								transition:slide|local={{duration: 200}}
                on:click={() => {$uiState.activeTab = 1; $uiState.selectedQuestion = i}}
              >
                <span>{question.question ? `${i + 1}. ${question.question}` : `Вопрос ${i + 1}`}</span>
								{#if Object.values(question.errors).includes(true)}
									<Icon type="alert" size="16" stroke="1"/>
								{/if}
              </button>
            {/each}
        </div>
        <button class="sidebar-question" on:click={addQuestion}>
					<!-- TODO: Залить в компонент иконки -->
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

{#if $uiState.sendingBlocked && !notificationHidden}
<div class="fade-wrap" 
		 transition:fade={{duration: 100}}
>
	<div class="notification"
			 in:fly={{y: 40}}
			 on:introend={hideNotification}
	>
		<span>Проверьте вопросы со знаком<Icon type="alert" size="16" stroke="1"/>, в них есть недоработки</span>
	</div>
</div>
{/if}

{#if $uiState.sent}
	<div class="pop-up-wrap">
		<div class="pop-up">
			<h2>Задание ушло на модерацию</h2>
			<p>Проверка займет 2 дня.</p>
			<p> Отслеживайте ее статус в списке заданий</p>
			<Button title="К заданиям" on:click={() => location.reload()}/>
		</div>
	</div>
{/if}

<svelte:body style:oferflow={$uiState.sent ? 'hidden' : 'auto'}/>


<style>	
	main{
		flex-shrink: 0;
		margin-inline: auto;
		width: 100%;
		max-width: 1120px;
		padding: 28px;
		transition: padding .3s;
	}

	@media (max-width: 767px) {
		main{
			padding: 16px;
		}
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
		cursor: pointer;
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
		padding: 12px;
		white-space: nowrap; 
		text-overflow: ellipsis;
		overflow: hidden;
    text-align: left;
		color: var(--gray-900);
    background: transparent;
    border: none;
		cursor: pointer;
	}

	.sidebar-question span{
		width: 100%;
	}

  .sidebar-item.active,
  .sidebar-question.active{
    font-weight: 500;
    background: var(--gray-200);
  }

	.notification{
		position: absolute;
		right: 16px;
		bottom: 56px;
		width: 320px;
		background-color: white;
		padding: 24px;
		background-color: var(--gray-900);
		color: white;
		border-radius: 8px;
		box-shadow: 0 10px 8px rgb(0 0 0 / 0.04), 0 4px 3px rgb(0 0 0 / 0.1);
		z-index: 99;
	}

	.whitespace-pre{
		whitespace: pre;
	}

	.pop-up-wrap{
		position: absolute;
		top: 0;
		left: 0;
		display: grid;
		place-items: center;
		width: 100vw;
		height: 100vh;
		background: rgba(0 0 0 / .4);
	}

	.pop-up{
		width: 450px;
		padding: 36px;
		text-align: center;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 10px 8px rgb(0 0 0 / 0.04), 0 4px 3px rgb(0 0 0 / 0.1);
		z-index: 99999;
	}

	.pop-up h2{
		margin-bottom: 16px;
	}

	.pop-up p{
		margin-bottom: 32px;
	}
</style>