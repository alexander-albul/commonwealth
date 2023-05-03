<script>
	export let title = 'Button'
	export let type = 'primary'
	export let size = 'default'
	export let disabled = false
	export let customCSS
</script>

<button
	class:primary="{type === 'primary'}"
	class:secondary="{type === 'secondary'}"
	class:outline="{type === 'outline'}"
	class:white="{type === 'white'}"
	class:large="{size === 'large'}"
	disabled={disabled}
	style={customCSS}
	on:click
>
	{title}
</button>

<style>
	button{
		display: inline-block;
		margin-top: var(--margin-top);
		padding: 8px 16px;
		width: var(--width);
		max-width: var(--max-width);
		line-height: 20px;
		border-radius: 8px;
		cursor: pointer;
		user-select: none;
		transition: opacity .15s;
	}
	
	button.primary{
		color: white;
		background: black;
		border-color: transparent;
	}
	
	button.secondary{
		background: var(--gray-100);
		border-color: var(--gray-200);
	}
	
	button.outline{
		background: inherit;
		border-color: var(--gray-300);
	}
	
	button.white{
		background: white;
		border-color: var(--gray-300);
	}
	
	button.large{
		padding: 12px 16px;
	}

	button:disabled{
		opacity: .5;
	}
</style>