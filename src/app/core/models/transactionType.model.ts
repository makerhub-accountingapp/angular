import { Detail } from "./detail.model";

export interface TransactionType {
	id: number,
	name: string,
	userId: number,
	details?: Detail[]
}

export interface TransactionTypeCreateForm {
	name: string
	userId: number,
}

export interface TransactionTypeUpdateForm {
	id: number,
	name: string,
	userId: number,
}