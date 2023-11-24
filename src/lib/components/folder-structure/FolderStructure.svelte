<script lang="ts">
	import { folderService } from '$lib/services/folder.service';
	import { chatService } from '$lib/services/chat.service';

	import Folder from './Folder.svelte';
	import FolderHeader from './FolderHeader.svelte';
	import FolderInput from './FolderInput.svelte';

	const { useCreateFolder, useFetchFolders, useDeleteFolder, useUpdateFolder } = folderService;
	const { useDeleteChat, useUpdateChat } = chatService;

	const foldersQuery = useFetchFolders();
	const createFolder = useCreateFolder();
	const deleteFolder = useDeleteFolder();
	const updateFolder = useUpdateFolder();

	const deleteChat = useDeleteChat();
	const updateChat = useUpdateChat();

	let createFolderMode: boolean = false;

	function handleAddFolder(e: CustomEvent<string>) {
		if (e.type === 'submit') return;

		$createFolder.mutate(e.detail, {
			onSuccess: () => {
				$foldersQuery.refetch();
				createFolderMode = false;
			}
		});
	}

	function handleEditFolderName(e: CustomEvent<{ name: string; id: string }>) {
		const { name, id } = e.detail;
		const folder = $foldersQuery.data?.find((folder) => folder.id === id);

		if (!folder) return;

		$updateFolder.mutate(
			{ ...folder, name },
			{
				onSuccess: () => {
					$foldersQuery.refetch();
				}
			}
		);
	}

	function handleDeleteFolder(e: CustomEvent<string>) {
		$deleteFolder.mutate(e.detail, {
			onSuccess: () => {
				$foldersQuery.refetch();
			}
		});
	}

	function handleEditChatName(e: CustomEvent<{ name: string; id: string }>) {
		const { name, id } = e.detail;
		const chat = $chatService.find((chat) => chat.id === id);

		if (!chat) return;

		$updateChat.mutate(
			{ ...chat, name },
			{
				onSuccess: () => {
					$foldersQuery.refetch();
				}
			}
		);
	}

	function handleDeleteChat(e: CustomEvent<string>) {
		$deleteChat.mutate(e.detail, {
			onSuccess: () => {
				$foldersQuery.refetch();
			}
		});
	}
</script>

<FolderHeader on:add-folder={() => (createFolderMode = true)} />

{#if createFolderMode}
	<FolderInput on:submit={(e) => handleAddFolder(e)} on:blur={(e) => handleAddFolder(e)} />
{/if}

{#if $foldersQuery.isLoading}
	<h1>Loading...</h1>
{:else if $foldersQuery.error}
	<h1>Error... {$foldersQuery.error}</h1>
{:else if $foldersQuery.isSuccess}
	<ul>
		{#each $foldersQuery.data as folder}
			<Folder
				{folder}
				on:edit-folder={(e) => handleEditFolderName(e)}
				on:delete-folder={(e) => handleDeleteFolder(e)}
				on:delete-chat={(e) => handleDeleteChat(e)}
				on:edit-chat={(e) => handleEditChatName(e)}
			/>
		{/each}
	</ul>
{/if}
