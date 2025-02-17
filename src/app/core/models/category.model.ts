import { Detail } from "./detail.model"

export interface Category {
	id: number,
	name: string,
	userId: number,
	detail?: Detail
}

export interface CategoryCreateForm {
	name: string,
	userId: number,
}

export interface CategoryUpdateForm {
	id: number,
	name: string,
	userId: number,
}
