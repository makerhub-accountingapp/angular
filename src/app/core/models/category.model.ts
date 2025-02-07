import { Detail } from "./detail.model"

export interface Category {
	id: number,
	name: string,
	detailId?: number
	detail?: Detail
}