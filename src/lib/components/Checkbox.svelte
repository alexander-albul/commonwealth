<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte'
	export let checked = false
  export let focused = false
  export let checkSize = "16"

	const dispatch = createEventDispatcher();

  function handleFocus() {
    focused = true
  }

  function handleBlur() {
    focused = false
  }
</script>



<label class="toggle" on:focus>
	<input type="checkbox"
         bind:checked={checked} 
         on:focus={handleFocus}
         on:blur={handleBlur}
         on:change
  />
  <div class="circle" class:checked class:focused>
    <Icon type={"check"} size={checkSize}/>
  </div>
</label>



<style>
	.toggle{
		flex-shrink: 0;
		position: relative;
		padding: 16px;
		cursor: pointer;
	}

  .circle.focused{
    outline: 2px solid black;
  }
	
	input{
    position: absolute;
    top: 0;
    left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
    margin: 0;
	}
	
  .circle{
		display: flex;
		align-items: center;
    justify-content: center;
		height: 24px;
    aspect-ratio: 1;
    background-color: white;
    color: transparent;
    box-shadow: 0 0 0 1px var(--gray-400) inset;
		border-radius: 99px;
    transition: color .15s;
  }

  .toggle:hover .circle{
    color: var(--gray-400);
  }

	.circle.checked{
    color: white;
		background-color: var(--gray-900);
    box-shadow: none;
	}

  .toggle:hover .circle.checked{
    color: white;
  }
</style>