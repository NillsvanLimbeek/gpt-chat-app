import { get, writable } from 'svelte/store';
import { createMutation, createQuery } from '@tanstack/svelte-query';

import { pb } from '$lib/pocketbase';
import type { Chat, UpdateChat } from '$lib/types/Chat';

function createChatService() {
	const store = writable<Chat[]>([]);
	const { subscribe, update } = store;

	function setChats(chats: Chat[]) {
		update(() => [...get(store), ...chats]);
	}

	async function updateChat({ id, name }: UpdateChat) {
		try {
			const newChat = await pb.collection('chats').update<Chat>(id, { name });
			update((chats) => chats.map((chat) => (chat.id === id ? newChat : chat)));
		} catch (error) {
			console.error(error);
		}
	}

	function useUpdateChat() {
		return createMutation({
			mutationKey: ['chats'],
			mutationFn: (data: UpdateChat) => updateChat(data)
		});
	}

	function useDeleteChat() {
		return createMutation({
			mutationKey: ['chats'],
			mutationFn: (id: Chat['id']) => deleteChat(id)
		});
	}

	async function deleteChat(id: Chat['id']) {
		try {
			await pb.collection('chats').delete(id);
		} catch (error) {
			console.error(error);
		}
	}

	return {
		subscribe,
		setChats,
		useUpdateChat,
		useDeleteChat
	};
}

export const chatService = createChatService();
