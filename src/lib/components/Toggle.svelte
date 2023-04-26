<script>
	import Icon from './Icon.svelte'
	export let checked = false
</script>

<label class="toggle" class:checked>
	<input type="checkbox" bind:checked={checked}/>
	<div class="circle">
		{#if !checked}
			<Icon type="cross"/>
		{:else}
			<Icon type="check"/>
		{/if}
	</div>
</label>

<style>
	.toggle{
		flex-shrink: 0;
		position: relative;
		display: flex;
		align-items: center;
		margin-block: 8px;
		width: 52px;
		height: 32px;
		background-color: var(--gray-200);
		border-radius: 99px;
	}
	
	input{
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}
	
	.circle{
		position: absolute;
		display: grid;
		place-items: center;
		left: 4px;
		width: 24px;
		height: 24px;
		background-color: var(--gray-900);
		border-radius: 99px;
		transition: left .3s, right .3s;
		cursor: pointer;
	}
	
	.toggle.checked{
		background-color: var(--gray-900);
	}
	
	.toggle.checked .circle{
		left: 24px;
		background-color: white;
	}
</style>