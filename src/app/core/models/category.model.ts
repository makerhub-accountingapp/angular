import { Detail } from "./detail.model"

export interface Category {
	id: number,
	name: string,
	detail?: Detail
}

export interface CategoryCreateForm {
	name: string,
}

export interface CategoryUpdateForm {
	id: number,
	name: string,
}
