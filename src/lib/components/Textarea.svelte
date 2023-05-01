<script>
	import {onMount} from 'svelte';
	import Icon from './Icon.svelte'
	
	export let value = '';
	export let error;
	export let placeholder = 'Введите текст';
	export let initialSize = "48px";
	export let resizable = true;
	export let hasButton = false;
	export let borderless = false;
	export let placeholderColor = 'var(--gray-500)';
	export let wrapCustomCSS = '';
	export let inputCustomCSS = '';
	
	let box;
	
	function fitHeight(el) {
		el.style.minHeight = {initialSize};
  	el.style.minHeight = (el.scrollHeight) + "px";
	}
	
	onMount( () => {
		fitHeight(box)
	})
</script>



<div class="textarea-wrap" style={wrapCustomCSS}>
	<textarea bind:this={box} 
						bind:value 
						on:input={fitHeight(box)}
						on:focus
						on:blur
						placeholder={placeholder}
						class:borderless
						class:error
						class:has-button={hasButton}
						class:non-resizable={!resizable}
						style:--initial-size={initialSize}
						style:--placeholder-color={placeholderColor}
						style={inputCustomCSS}
	/>
	{#if error}
		<p class="error-wrap" on:click={() => box.focus()}>
			<Icon type="alert" size="12" stroke="1.25"/>
			<span>{error}</span>
		</p>
	{/if}
</div>



<style>
	.textarea-wrap{
		width: 100%;
	}

	textarea{
		margin: 0;
		width: 100%;
		padding: 10px 16px;
		color: var(--gray-900);
		line-height: 24px; 
		border-radius: 6px;
		box-shadow: 0 0 0 1px var(--gray-300);
		border: none;
		box-sizing: border-box;
		overflow-y: hidden;
		resize: vertical;
		height: var(--initial-size);
		transition: box-shadow .2s;
	}

	textarea:hover{
		box-shadow: 0 0 0 1px var(--gray-300);
	}

	textarea::placeholder{
		color: var(--placeholder-color);
	}
	
	textarea.error{
		box-shadow: 0 0 0 1px #DC2626;
	}

	textarea.non-resizable{ 
		resize: none;
	}
	
	textarea.borderless{
		padding: 0;
		border-radius: 0;
		background-color: transparent;
		box-shadow: none;
	}

	textarea.borderless:focus{
		outline: none;
	}

	textarea.has-button{
		padding-right: 44px;
	}

	.error-wrap{
		display: flex;
		align-items: center;
		gap: 6px;
		/* margin-top: 4px; */
		padding-block: 4px;
		font-size: 14px;
		color: #DC2626;
		user-select: none;
	}

	:global(.error svg){
		position: relative;
		top: .5px;
	}
</style>