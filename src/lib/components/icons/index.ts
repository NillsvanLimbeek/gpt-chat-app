import type { ComponentType } from 'svelte';

import AddFolder from './AddFolder.svelte';
import FolderClosed from './FolderClosed.svelte';
import FolderOpen from './FolderOpen.svelte';
import Trash from './Trash.svelte';
import Pencil from './Pencil.svelte';
import File from './File.svelte';

export interface Icon {
	name: IconName;
	component: ComponentType;
}

export interface IconProps {
	size?: string;
}

export const icons = {
	'add-folder': AddFolder,
	'folder-closed': FolderClosed,
	'folder-open': FolderOpen,
	trash: Trash,
	pencil: Pencil,
	file: File
} as const;

export const ICONS: Icon[] = [
	{ name: 'add-folder', component: AddFolder },
	{ name: 'folder-closed', component: FolderClosed },
	{ name: 'folder-open', component: FolderOpen },
	{ name: 'trash', component: Trash },
	{ name: 'pencil', component: Pencil },
	{ name: 'file', component: File }
];

export type IconName = keyof typeof icons;
