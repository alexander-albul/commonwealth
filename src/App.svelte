<script>
	import {uiState} from './stores/store.js'
	import ViewA from './views/ViewA.svelte'
	import ViewB from './views/ViewB.svelte'
</script>

{#if $uiState.viewVariant === 'tabs'}
	<ViewA/>
{:else}
	<ViewB/>
{/if}


<div style="position: fixed; bottom: 0; font-family: monospace; z-index: 99; background-color: var(--gray-100); padding: 16px;">
	<b>Навигация</b>
	<label>
		<input type="radio" bind:group={$uiState.viewVariant} value="tabs"/>
		Вкладки
	</label>
	<label>
		<input type="radio" bind:group={$uiState.viewVariant} value="sidebar"/>
		Сайдбар
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

