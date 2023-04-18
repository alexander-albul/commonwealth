<script>
	import {onMount} from 'svelte'
	import {uiState, globalData, testInfo} from '../../stores/store.js'
	import { slide } from 'svelte/transition';
	import Button from '../Button.svelte';
	import SegmentedControl from '../SegmentedControl.svelte'
	
	let titleInput
	
	let titleGeneration = true
	
	function generateTitle(){
		if (!titleGeneration) return
		$testInfo.audience === 'Студенты' ? 
		$testInfo.title = `${$testInfo.fields} для студентов` :
		$testInfo.title = `Задание для ${$testInfo.audience}а`
	}
	
	function changeTitleManually(){
		$testInfo.title = titleInput.value
		titleGeneration = false
	}
</script>


<div class="info-tab-content">
	<!--  Audience	 -->
	<div class="audience-wrap">		
		<div class="form-group-label">Аудитория</div>
		<SegmentedControl bind:items={globalData.audience} bind:selectedItem={$testInfo.audience} on:change={generateTitle} --width="100%"/>
	</div>

	<!--  Field	 -->
	{#if $testInfo.audience === 'Студенты'}
	<div class="field" transition:slide|local>
		<div class="form-group-label">Направление</div>
		<div class="field-wrap">
			{#each globalData.fields as field}
					<label>
						<input type=radio bind:group={$testInfo.fields} name="field" value={field} on:change={generateTitle}>
						<div>{field}</div>
					</label>
			{/each}
		</div>
	</div>
	{/if}

	<!--  Title	 -->
	<label class="title-input-wrap">
		<div class="form-group-label">Название</div>
		<input bind:this={titleInput} type="text" value={$testInfo.title} on:input={changeTitleManually}/>
	</label>

	<Button title="Продолжить"
					size="large"
					on:click={() => {$uiState.activeTab = 1}}
					--margin-top="36px"
					--max-width="600px" 
	/>
</div>
	
	
<style>
	.info-tab-content{
		display: flex;
		flex-direction: column;
		margin-block: 24px;
		padding: 36px;
		background: white;
		border: 1px solid var(--gray-300);
		border-radius: 8px;
	}
	
	.info-tab-content > * + *{
		margin-top: 36px;
	}
	
	input[type="text"]{
		width: 100%;
		max-width: 600px;
	}
	
	.form-group-label{
		font-weight: 500;
		margin-bottom: 16px;
	}
	
	/*  Audience	 */
	.audience-wrap{		
		max-width: 600px;
	}
	
	
	/*  Field	 */
	
	.field-wrap{
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 8px;
		max-width: 600px;
	}
	
	.field-wrap label{
		display: inline-flex;
		flex-direction: column;
		align-items: start;
		gap: 20px;
		padding: 16px;
		border-radius: 8px; 
		background: var(--gray-100);
		cursor: pointer;
	}
	
	.field-wrap label div{		
		user-select: none;
	}
</style>