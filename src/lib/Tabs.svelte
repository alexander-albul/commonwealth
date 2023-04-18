<script>
	export let items = [
		{title: 'Tab 1'},
		{title: 'Tab 2'},
		{title: 'Информация'},
	]
	
	export let activeTab = 0
</script>

<div class="tabs">
	{#each items as tab, i}
		<div 
				 class="tab" 
				 class:active={activeTab === i}
				 on:click={() => activeTab = i}
				 on:keypress={() => activeTab = i}
		>
			<span class="title">{tab.title}</span>
			<span class="title-active">{tab.title}</span>
		</div>
	{/each}
</div>

<style>
	.tabs{
		display: flex;
		padding-inline: 16px;overflow: hidden;
	}
	
	.tab{
		position: relative;
		display: inline-flex;
		padding: 20px;
		user-select: none;
		cursor: pointer;
	}
	
	.title{
		position:absolute;
	}
	
	.title-active{
		opacity: 0;
		font-weight: 500;
	}
	
	.tab.active:after{
		content: '';
		position: absolute;
		width: calc(100% - 20px * 2);
		bottom: 0;
		border-bottom: 2px solid black;
	}
	
	.tab.active .title{
		opacity: 0;
	}
	
	.tab.active .title-active{
		opacity: 1;
	}
</style>