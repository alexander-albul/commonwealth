<script>
	import {uiState, globalData, testInfo, testQuestions} from './stores/store.js'
	import Button from './lib/Button.svelte'
	import Tabs from './lib/Tabs.svelte'
	import InfoTab from './lib/tabs/InfoTab.svelte'
	import QuestionsTabA from './lib/tabs/QuestionsTabA.svelte'
	import QuestionsTabB from './lib/tabs/QuestionsTabB.svelte'
	import SegmentedControl from './lib/SegmentedControl.svelte'
	import ScoreTab from './lib/tabs/ScoreTab.svelte'

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

	<div style="display: flex">
		<pre>{JSON.stringify($uiState, null, 2)}
		<pre>{JSON.stringify($testQuestions, null, 2)}
	</div>

	<div class="tab-content">
		<svelte:component this={tabs[$uiState.activeTab].component}/>
	</div>

	<div style="position: fixed; bottom: 0; font-family: monospace; z-index: 99; background-color: var(--gray-100); padding: 16px;">
<b>Показывать вопросы:</b>
<label>
	<input type="radio" bind:group={$uiState.questionTabVariant} value="a">Все сразу
</label>
<label>
	<input type="radio" bind:group={$uiState.questionTabVariant} value="b">По одному
</label>
</div >
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