import { Detail } from "./detail.model";

export interface TransactionType {
	id: number,
	name: string,
	details: Detail[]
}