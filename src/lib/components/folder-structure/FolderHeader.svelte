<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import AddFolder from '../icons/AddFolder.svelte';

	const dispatch = createEventDispatcher<{ 'add-folder': void }>();
</script>

<div>
	<div class="flex justify-between mb-4">
		<h1>File Explorer</h1>
		<button on:click={() => dispatch('add-folder')}><AddFolder /></button>
	</div>
</div>
