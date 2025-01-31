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