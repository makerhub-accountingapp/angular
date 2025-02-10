import { Category } from "./category.model";
import { RepetitionEnum, Transaction } from "./transaction.model";
import { TransactionType } from "./transactionType.model";

export interface Detail {
	id: number,
	amount: number,
	transactionDate: Date,
	note: string,
	transactionId: number,
	transaction: Transaction,
	categoryId: number,
	category: Category,
	transactionTypeId: number,
	transactionType: TransactionType
}

export interface DetailTransactionCreateForm {
	name: string,
	amount: number,
	repetition: number,
	transactionDate: Date,
	endDate?: Date,
	transactionTypeId: number
	categoryId: number,
	note: string,
	accountId: number
}

export interface DetailGetForm {
	name?: string,
	categoryId?: number,
	transactionTypeId?: number,
	repetition?: RepetitionEnum,
	startDate?: Date,
	endDate?: Date
}

export interface DetailCreateForm {
	amount: number,
	transactionDate: Date,
	note: string,
	transactionId: number,
	categoryId: number,
	transactionTypeId: number
}

export interface DetailUpdateForm {
	id: number,
	amount: number,
	transactionDate: Date,
	note: string,
	transactionId: number,
	categoryId: number,
	transactionTypeId: number
}