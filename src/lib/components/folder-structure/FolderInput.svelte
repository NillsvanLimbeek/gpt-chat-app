<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Icon from '../icons/Icon.svelte';

	const dispatch = createEventDispatcher<{ submit: string; blur: string }>();

	export let value: string = '';
	export let type: 'FOLDER' | 'CHAT' = 'FOLDER';

	let input: HTMLInputElement;

	onMount(() => {
		input.focus();
	});
</script>

<form class="flex items-center gap-3" on:submit={() => dispatch('submit', input.value)}>
	<Icon name={type === 'FOLDER' ? 'folder-closed' : 'file'} />

	<input
		class="input input-bordered input-sm"
		type="text"
		bind:this={input}
		bind:value
		placeholder="Folder name"
		on:blur={() => dispatch('blur', input.value)}
	/>
</form>
