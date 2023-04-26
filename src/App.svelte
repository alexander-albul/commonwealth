<script>
	import {uiState} from './lib/stores/store.js'
	import ViewA from './lib/views/ViewA.svelte'
	import ViewB from './lib/views/ViewB.svelte'
</script>

{#if $uiState.viewVariant === 'tabs'}
	<ViewA/>
{:else}
	<ViewB/>
{/if}


<div class="view-settings">
	<b>Навигация</b>
	<label>
		<input type="radio" bind:group={$uiState.viewVariant} value="sidebar"/>
		Сайдбар
	</label>
	<label>
		<input type="radio" bind:group={$uiState.viewVariant} value="tabs"/>
		Вкладки
	</label>
	{#if $uiState.viewVariant === "tabs"}
		<b style="margin-left: 24px">Показывать вопросы:</b>
		<label>
			<input type="radio" bind:group={$uiState.questionTabVariant} value="a">
			Все сразу
		</label>
		<label>
			<input type="radio" bind:group={$uiState.questionTabVariant} value="b">
			По одному
		</label>
	{/if}
</div>



<style>
	.view-settings{
		position: fixed; 
		bottom: 0; 
		padding: 16px;
		font-family: monospace; 
		background-color: var(--gray-100); 
		z-index: 99; 
	}
</style>