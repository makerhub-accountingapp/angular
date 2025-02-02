import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BaseService<TEntity, TCreateForm, TUpdateForm> {

  protected apiUrl: string = environment.apiUrl;
  protected entityName = '';

  constructor(protected http: HttpClient) {}

  setApiUrl(entityName: string) {
    this.entityName = entityName;
    this.apiUrl += `/${this.entityName}`;
  }

  create(form: TCreateForm): Observable<TEntity> {
    return this.http.post<TEntity>(this.apiUrl, form)
  }

  delete(id: number): Observable<TEntity> {
    return this.http.delete<TEntity>(`${this.apiUrl}/${id}`);
  }

  get(): Observable<TEntity[]> {
    const temp = this.http.get<TEntity[]>(this.apiUrl);
    console.log(temp)
    return temp;
  }

  getById(id: number): Observable<TEntity> {
    return this.http.get<TEntity>(`${this.apiUrl}/${id}`);
  }

  update(form: TUpdateForm) {
    return this.http.put<TEntity>(this.apiUrl, form);
  }
}
