import { pb } from '$lib/pocketbase';
import type { Folder } from '$lib/types';
import type { Chat } from '$lib/types/Chat';
import { faker } from '@faker-js/faker';

import { generateChats } from './generateChats';
import { generateFolders } from './generateFolders';

async function initMock() {
	// Create folders
	const folders = generateFolders(5);

	// For every folder created, create a rondom amount of chats with the folder id
	for (const folder of folders) {
		const newFolder = await pb.collection('folders').create<Folder>(folder);

		const chats = generateChats(faker.number.int(10));
		const chatIds = [];

		for (const chat of chats) {
			const newChat = await pb.collection('chats').create<Chat>({ ...chat, folder: newFolder.id });
			chatIds.push(newChat.id);
		}

		// Update the folder with the ids of the chats
		folder.chats = chatIds;
		await pb.collection('folders').update<Folder>(newFolder.id, { chats: chatIds });
	}

	console.log('Mock data created');
}

initMock();
