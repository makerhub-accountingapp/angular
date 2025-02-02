import { Account } from "./account.model";
import { Detail } from "./detail.model";

export interface Transaction {
	id: number,
	name: string,
	accountId: number,
	account: Account,
	repetition: RepetitionEnum,
	setDate: Date,
	endDate: Date,
	details: Detail[]
}

export enum RepetitionEnum {
	None = 1,
	Daily,
	Weekly,
	Monthly,
	Yearly
}

export interface TransactionCreateForm {
	name: string,
	accountId: number,
	repetition: RepetitionEnum,
	setDate: Date,
	endDate: Date,
}

export interface TransactionUpdateForm {
	id: number,
	name: string,
	accountId: number,
	repetition: RepetitionEnum,
	setDate: Date,
	endDate: Date,
}