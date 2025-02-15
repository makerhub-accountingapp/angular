import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = `${environment.apiUrl}/User`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.getById(parseInt(userId)).subscribe((data) => {
        this.currentUserSubject.next(data);
      });
    }
  }

  login(email: string, password: string): Observable<User> {
    let params = new HttpParams().set('email', email).set('password', password);

    return this.http.get<User>(`${this.apiUrl}/login`, { params });
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);

    if (user) {
      localStorage.setItem('userId', user.id.toString());
    } else {
      localStorage.removeItem('userId');
    }
  }

  logout(): void {
    this.setCurrentUser(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('accountId');
  }
}
