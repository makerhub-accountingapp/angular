import { Component, inject, Inject, Injectable, OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent<TEntity, TCreateForm, TUpdateForm, TService extends BaseService<TEntity, TCreateForm, TUpdateForm>> {

  protected service!: TService;

  constructor() {}

  setServie(service: TService): void {
    this.service = service;
  }

  create(form: TCreateForm): Observable<TEntity> {
    return this.service.create(form);
  }

  delete(id: number): Observable<TEntity> {
    return this.service.delete(id)
  }

  get(): Observable<TEntity[]> {
    return this.service.get();
  }

  getById(id: number): Observable<TEntity> {
    return this.service.getById(id)
  }

  update(form: TUpdateForm): Observable<TEntity> {
    return this.service.update(form)
  }
}
