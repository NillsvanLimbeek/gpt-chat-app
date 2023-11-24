<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import type { Folder } from '$lib/types';
	import { chatService } from '$lib/services/chat.service';

	import Icon from '../icons/Icon.svelte';
	import FolderInput from './FolderInput.svelte';
	import Chat from './Chat.svelte';

	export let folder: Folder;

	const { setChats } = chatService;
	const dispatch = createEventDispatcher<{
		'delete-folder': string;
		'edit-folder': { name: string; id: string };
		'delete-chat': string;
		'edit-chat': { name: string; id: string };
	}>();

	let open = false;
	let updateName = false;
	let showButtons = false;

	function handleEditName(e: CustomEvent<string>) {
		dispatch('edit-folder', { name: e.detail, id: folder.id });
		updateName = false;
	}

	onMount(() => {
		if (folder.expand) {
			setChats(folder.expand.chats);
		}
	});
</script>

{#if updateName}
	<FolderInput value={folder.name} on:submit={(e) => handleEditName(e)} />
{:else}
	<button
		class="w-full flex my-2"
		on:mouseenter={() => (showButtons = true)}
		on:mouseleave={() => (showButtons = false)}
	>
		<button class="w-full flex gap-3" on:click={() => (open = !open)}>
			{#if open}
				<Icon name="folder-open" />
			{:else}
				<Icon name="folder-closed" />
			{/if}

			<h1>{folder.name}</h1>
		</button>

		{#if showButtons}
			<div class="flex gap-2">
				<button class="flex items-center" on:click={() => (updateName = true)}>
					<Icon name="pencil" props={{ size: '20' }} />
				</button>

				<button class="flex items-center" on:click={() => dispatch('delete-folder', folder.id)}>
					<Icon name="trash" props={{ size: '20' }} />
				</button>
			</div>
		{/if}
	</button>

	{#if open && folder.expand}
		<ul class="ml-5">
			{#each folder.expand.chats as chat}
				<Chat {chat} on:delete-chat on:edit-chat />
			{/each}
		</ul>
	{/if}
{/if}
