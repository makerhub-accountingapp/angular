import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent<TEntity, TCreateForm, TUpdateForm, TService extends BaseService<TEntity, TCreateForm, TUpdateForm>> {

  private service!: TService;
  entities: TEntity[] = [];
  entity?: TEntity;

  constructor() {}

  setServie(service: TService): void {
    this.service = service;
  }

  create(form: TCreateForm): void {
    this.service.create(form).subscribe(data => {
      this.entity = data;
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(data => {
      this.entity = data;
    });
  }

  get(): void {
    this.service.get().subscribe(data => {
    this.entities = data;  
    });
  }

  getById(id: number): void {
    this.service.getById(id).subscribe(data => {
      this.entity = data;
    });
  }

  update(form: TUpdateForm): void {
    this.service.update(form).subscribe(data => {
      this.entity = data;
    });
  }
}
