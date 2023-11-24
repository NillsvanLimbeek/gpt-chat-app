import { faker } from '@faker-js/faker';

import type { CreateChat } from '$lib/types/Chat';

export function generateChat(folder?: string): CreateChat {
	return {
		name: faker.lorem.words({ min: 1, max: 5 }),
		folder,
		messages: [] // TODO: generate messages
	};
}

export function generateChats(count: number, folder?: string): CreateChat[] {
	return Array.from({ length: count }, () => generateChat(folder));
}
