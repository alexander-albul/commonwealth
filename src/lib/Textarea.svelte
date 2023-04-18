<script>
	import {onMount} from 'svelte';
	import Icon from './Icon.svelte'
	
	export let value = '';
	export let placeholder = 'Введите текст';
	export let initialSize = "48px";
	export let resizable = true;
	export let hasButton = false;
	
	let box;
	
	function fitHeight(el) {
		el.style.minHeight = {initialSize};
  	el.style.minHeight = (el.scrollHeight) + "px";
	}
	
	onMount( () => {
		fitHeight(box)
	})
</script>


<div class="textarea-wrap">
	<textarea bind:this={box} 
						bind:value 
						on:input={fitHeight(box)}
						placeholder={placeholder}
						class:non-resizable={!resizable}
						class:has-button={hasButton}
						style:--initial-size={initialSize}
	/>
	{#if hasButton}
	<button on:click={()=>alert('click')}>
		<Icon type="trash"/>
	</button>
	{/if}
</div>


<style>
	.textarea-wrap{
		position: relative;
		width: 100%;
	}
	
	button{
		position: absolute;
		top: 6px;
		right: 6px;
		display: inline-flex;
		margin: 0;
		padding: 8px;
		background: transparent;
		border: none;
		border-radius: 8px;
	}
	
	textarea{
		margin: 0;
		width: 100%;
		padding: 10px 16px; 
		line-height: 24px; 
		border-radius: 6px;
		box-shadow: 0 0 1px var(--gray-300);
		box-sizing: border-box;
		overflow-y: hidden;
		resize: vertical;
		height: var(--initial-size);
	}
	
	textarea.non-resizable{ 
		resize: none;
	}
	
	textarea.has-button{
		padding-right: 44px;
	}
</style>