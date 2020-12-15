export interface Note {
	id: string;
	link: string;
	author: string;
	title: string;
	content: string;
	lastModified: string;
}

export interface User {
	username: string;
	token: string;
	email?: string;
}

export interface Change {
	position: number;
	before: string;
	after: string;
}

export interface Revision {
	hash: string;
	timestamp: string;
	username: string;
	changes: Change[];
	message: string;
}
