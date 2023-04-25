<script>
	import { createEventDispatcher } from 'svelte';
	
	export let name;
	export let selectedItem;
	export let items = ['Option 1', 'Option 2', 'Option 3',  ]
	
	const dispatch = createEventDispatcher();
	
	function dispatchChange() {
		dispatch('change')
	}

</script>

<div class="segmented-control">
	{#each items as item, i}
		<label>
			<input type=radio 
						 bind:group={selectedItem}
						 name={name}
						 value={item.value ? item.value : item}
						 on:change={dispatchChange}
			>
			<div>
				{item.title ? item.title : item}
			</div>
		</label> 
	{/each}
</div>

<style>
	.segmented-control{
		width: var(--width);
		display: inline-flex;
		padding: 4px;
		border-radius: 8px;
		background: var(--gray-100);
		overflow: hidden;
	}
	
	.segmented-control label{
		display: flex;
		justify-content: center;
		width: 100%;
		line-height: 24px;
		cursor: pointer;
	}
	
	.segmented-control input[type="radio"]{
		position: absolute;
		opacity: 0;
	}
	
	.segmented-control input[type="radio"] + div{
		display: grid;
		place-items: center;
		width: 100%;
    padding: 4px 12px;
		border-radius: 6px;
		user-select: none;
	}
	
	.segmented-control input[type="radio"]:checked + div{
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 
								0px 1px 2px rgba(0, 0, 0, 0.06);
	}
	
	.segmented-control input[type="radio"]:after{
		content: '';
		opacity: 1;
	}
</style>