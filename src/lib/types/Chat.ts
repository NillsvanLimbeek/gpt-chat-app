import type { RecordModel } from 'pocketbase';

export interface Chat extends RecordModel {
	name: string;
	folder?: string;
	messages: string[];
}

export type CreateChat = Pick<Chat, 'name' | 'folder' | 'messages'>;
export type UpdateChat = Pick<Chat, 'id' | 'name' | 'folder' | 'messages'>;
