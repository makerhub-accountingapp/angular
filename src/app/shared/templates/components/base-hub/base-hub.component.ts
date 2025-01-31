import { Component, OnInit } from '@angular/core';
import { BaseHubService } from '../../services/base-hub.service';

@Component({
  selector: 'app-base-hub',
  templateUrl: './base-hub.component.html',
  styleUrls: ['./base-hub.component.scss'],
})
export class BaseHubComponent<
  TEntity,
  TCreateForm,
  TUpdateForm,
  TService extends BaseHubService<TEntity, TCreateForm, TUpdateForm>
> {
  protected service!: TService;
  entities: TEntity[] = [];
  entity?: TEntity;

  constructor() {}

  setServie(service: TService): void {
    this.service = service;
  }

  create(form: TCreateForm): void {
    this.service.entity$?.subscribe((data) => {
      next: this.entity = data;
    });
  }

  delete(id: number): void {
    this.service.entity$?.subscribe((data) => {
      next: this.entity = data
    });
  }

  get(): void {
    this.service.entities$.subscribe((data) => {
      next: this.entities = data;
    });
  }

  getById(id: number): void {
    this.service.entity$?.subscribe((data) => {
      next: this.entity = data;
    });
  }

  update(form: TUpdateForm): void {
    this.service.entity$?.subscribe((data) => {
      next: this.entity = data;
    });
  }
}
