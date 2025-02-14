import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = `${environment.apiUrl}/User`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {

    let params = new HttpParams()
    .set('email', email)
    .set('password', password);

    return this.http.get<User>(`${this.apiUrl}/login`, { params });
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
