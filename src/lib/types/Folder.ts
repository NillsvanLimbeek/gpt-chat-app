import type { RecordModel } from 'pocketbase';
import type { Chat } from './Chat';

export interface Folder extends RecordModel {
	name: string;
	chats: string[];
	expand?: { chats: Chat[] };
}

export type CreateFolder = Pick<Folder, 'name' | 'chats'>;
export type UpdateFolder = Pick<Folder, 'id' | 'name' | 'chats'>;
