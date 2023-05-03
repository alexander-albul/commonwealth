<script>
	import {uiState, testQuestions} from './lib/stores/store.js'
	import ViewA from './lib/views/ViewA.svelte'
	import ViewB from './lib/views/ViewB.svelte'

	let debugShown = false;
	
	const toggleDebug = () => debugShown = !debugShown
</script>

{#if $uiState.viewVariant === 'tabs'}
	<ViewA/>
{:else}
	<ViewB/>
{/if}

{#if !$uiState.sent}
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
		<b style="margin-left: 24px">Вопросы:</b>
		<label>
			<input type="radio" bind:group={$uiState.questionTabVariant} value="a">
			Списком
		</label>
		<label>
			<input type="radio" bind:group={$uiState.questionTabVariant} value="b">
			По одному
		</label>
	{/if}
	
	<button on:click={toggleDebug}>Debug</button>
</div>
{/if}

{#if debugShown}
	<div class="debug">
		<pre>{JSON.stringify($uiState, null, 2)}</pre>
		<pre>{JSON.stringify($testQuestions, null, 2)}</pre>
	</div>
{/if}



<style>
	.view-settings{
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 16px;
    font-family: monospace;
    background-color: var(--gray-100);
    z-index: 9;
	}

	.view-settings button {
    margin-left: auto;
    font-family: monospace;
    font-size: 13px;
	}

	.debug {
    position: fixed;
    bottom: 48px;
    right: 8px;
    max-height: calc(100vh - 48px * 2);
    padding: 8px;
    backdrop-filter: blur(20px);
    background-color: rgba(255 255 255 / .6);
    border: 1px solid rgba(0 0 0 / .1);
    overflow: auto;
	}
</style>