import { Account } from "./account.model";

export interface User {
	id: number,
	email: string,
	password: string,
	isActive: boolean,
	accounts: Account[]	
}

export interface UserUpdateForm {
	id: number,
	email: string,
	password: string,
	isActive: boolean,
}