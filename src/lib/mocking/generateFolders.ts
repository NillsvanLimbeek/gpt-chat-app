import { faker } from '@faker-js/faker';

import type { CreateFolder } from '$lib/types';

function generateFolder(): CreateFolder {
	return {
		name: faker.lorem.words({ min: 1, max: 3 }),
		chats: []
	};
}

export function generateFolders(count: number): CreateFolder[] {
	return Array.from({ length: count }, () => {
		return generateFolder();
	});
}
