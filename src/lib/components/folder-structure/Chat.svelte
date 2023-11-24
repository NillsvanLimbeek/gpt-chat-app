<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import type { Chat } from '$lib/types/Chat';

	import Icon from '../icons/Icon.svelte';
	import FolderInput from './FolderInput.svelte';

	export let chat: Chat;

	const dispatch = createEventDispatcher<{
		'delete-chat': string;
		'edit-chat': { name: string; id: string };
	}>();

	let showButtons = false;
	let updateName = false;

	function handleEditName(e: CustomEvent<string>) {
		dispatch('edit-chat', { name: e.detail, id: chat.id });
		updateName = false;
	}
</script>

{#if updateName}
	<FolderInput value={chat.name} on:submit={(e) => handleEditName(e)} type="CHAT" />
{:else}
	<button
		class="flex justify-between my-2 w-full relative"
		on:mouseenter={() => (showButtons = true)}
		on:mouseleave={() => (showButtons = false)}
	>
		<div class="flex gap-3 w-[80%]">
			<Icon name="file" />
			<h1 class="truncate">{chat.name}</h1>
		</div>

		{#if showButtons}
			<div class="flex gap-2" transition:fade={{ duration: 200 }}>
				<button class="flex items-center" on:click={() => (updateName = true)}>
					<Icon name="pencil" props={{ size: '20' }} />
				</button>

				<button class="flex items-center" on:click={() => dispatch('delete-chat', chat.id)}>
					<Icon name="trash" props={{ size: '20' }} />
				</button>
			</div>
		{/if}
	</button>
{/if}
