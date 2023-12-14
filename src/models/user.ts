export interface User {
	id: string;
	name: string;
	username: string;
	status: string;
	phone: string;
}

export interface UserList {
	list: User[];
}
