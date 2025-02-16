import { Transaction } from "./transaction.model";
import { User } from "./user.model";

export interface Account {
	id: number,
	name: string,
	balance: number,
	userId: number,
	user: User,
	transactions: Transaction[]
}

export interface AccountCreateForm {
	name: string,
	balance: number,
	userId: number,
}

export interface AccountUpdateForm {
	id: number,
	name: string,
	balance: number,
	userId: number,
}