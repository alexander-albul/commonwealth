<script>
	import {uiState, globalData, testInfo, testQuestions} from '../stores/store.js'
	import Button from '../components/Button.svelte'
	import Tabs from '../components/Tabs.svelte'
	import InfoTab from '../tabs/InfoTab.svelte'
	import QuestionsTabA from '../tabs/QuestionsTabA.svelte'
	import QuestionsTabB from '../tabs/QuestionsTabB.svelte'
	import SegmentedControl from '../components/SegmentedControl.svelte'
	import ScoreTab from '../tabs/ScoreTab.svelte'

	$: tabs = [
		{title: 'Информация', component: InfoTab},
		{title: 'Вопросы', component: $uiState.questionTabVariant == 'a' ? QuestionsTabA : QuestionsTabB},
		{title: 'Баллы', component: ScoreTab},
	]
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
		<Tabs bind:activeTab={$uiState.activeTab} items={tabs}/>
	</div>

	<div class="tab-content">
		<svelte:component this={tabs[$uiState.activeTab].component}/>
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
		padding-block: 28px 0;
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
		max-height: 100%;
	}
</style>