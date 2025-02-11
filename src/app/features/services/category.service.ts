import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CategoryCreateForm, CategoryUpdateForm } from 'src/app/core/models/category.model';
import { BaseService } from 'src/app/shared/templates/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category, CategoryCreateForm, CategoryUpdateForm> {

  constructor(http: HttpClient) {
    super(http);
    this.setApiUrl('Category');
  }
}
