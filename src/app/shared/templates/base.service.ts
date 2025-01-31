import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export class BaseService<TEntity, TCreateForm, TUpdateForm> {

  private apiUrl: string;

  constructor(private http: HttpClient, baseUrl: string) {
    this.apiUrl = environment.apiUrl + baseUrl;
  }

  create(form: TCreateForm): Observable<TEntity> {
    return this.http.post<TEntity>(this.apiUrl, form)
  }

  delete(id: number): Observable<TEntity> {
    return this.http.delete<TEntity>(`${this.apiUrl}/${id}`);
  }

  get(): Observable<TEntity[]> {
    return this.http.get<TEntity[]>(this.apiUrl);
  }

  getById(id: number): Observable<TEntity> {
    return this.http.get<TEntity>(`${this.apiUrl}/${id}`);
  }

  update(form: TUpdateForm) {
    return this.http.put<TEntity>(this.apiUrl, form);
  }
}
