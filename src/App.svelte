<script>
	import {uiState, globalData, testInfo, testQuestions} from './stores/store.js'
	import Button from './lib/Button.svelte'
	import Tabs from './lib/Tabs.svelte'
	import InfoTab from './lib/tabs/InfoTab.svelte'
	import QuestionsTab from './lib/tabs/QuestionsTab.svelte'
	import ScoreTab from './lib/tabs/ScoreTab.svelte'
	 
	let tabs = [
		{title: 'Информация', component: InfoTab},
		{title: 'Вопросы', component: QuestionsTab},
		{title: 'Баллы', component: ScoreTab},
		]
</script>



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

<style>	
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
</style>