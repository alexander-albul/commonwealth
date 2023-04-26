<script>
	import {globalData, testInfo} from './store.js'
	
	$: testTitle = 'Новое задание'
</script>

<!-- {#if $testInfo.audience === ''} -->
	<h1>{testTitle}</h1>
<!-- {:else}
	<h1>{
		$testInfo.audience === 'Студенты' ? 
		testTitle = `${$testInfo.fields} для студентов ` :
		testTitle = `Задание для ${$testInfo.audience}а`
		}
	</h1>
{/if} -->

<style>
	h1{
		margin: 0;
	}
</style>