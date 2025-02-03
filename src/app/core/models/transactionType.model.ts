import { Detail } from "./detail.model";

export interface TransactionType {
	id: number,
	name: string,
	details: Detail[]
}

export interface TransactionTypeCreateForm {
	name: string
}

export interface TransactionTypeUpdateForm {
	id: number,
	name: string
}