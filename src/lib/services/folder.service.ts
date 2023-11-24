import { writable } from 'svelte/store';
import { createMutation, createQuery } from '@tanstack/svelte-query';

import type { Folder, UpdateFolder } from '$lib/types';
import { pb } from '$lib/pocketbase';

function createFolderService() {
	const { subscribe, update } = writable<Folder[]>([]);

	function useFetchFolders() {
		return createQuery({ queryKey: ['folders'], queryFn: () => fetchFolders() });
	}

	async function fetchFolders(): Promise<Folder[]> {
		try {
			return await pb.collection('folders').getFullList<Folder>({ expand: 'chats' });
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	function useCreateFolder() {
		return createMutation({
			mutationKey: ['folders'],
			mutationFn: (name: string) => createFolder(name)
		});
	}

	async function createFolder(name: Folder['name']) {
		try {
			const folder = await pb.collection('folders').create<Folder>({ name });
			update((folders) => [...folders, folder]);
		} catch (error) {
			console.error(error);
		}
	}

	async function updateFolder({ id, name }: UpdateFolder) {
		try {
			const newFolder = await pb.collection('folders').update<Folder>(id, { name });
			update((folders) => folders.map((folder) => (folder.id === id ? newFolder : folder)));
		} catch (error) {
			console.error(error);
		}
	}

	function useUpdateFolder() {
		return createMutation({
			mutationKey: ['folders'],
			mutationFn: (data: UpdateFolder) => updateFolder(data)
		});
	}

	function useDeleteFolder() {
		return createMutation({
			mutationKey: ['folders'],
			mutationFn: (id: Folder['id']) => deleteFolder(id)
		});
	}

	async function deleteFolder(id: Folder['id']) {
		try {
			await pb.collection('folders').delete(id);
			update((folders) => folders.filter((folder) => folder.id !== id));
		} catch (error) {
			console.error(error);
		}
	}

	return {
		subscribe,
		useCreateFolder,
		useFetchFolders,
		useUpdateFolder,
		useDeleteFolder
	};
}

export const folderService = createFolderService();
