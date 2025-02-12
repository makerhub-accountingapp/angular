import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detail, DetailTransactionCreateForm } from 'src/app/core/models/detail.model';
import { RepetitionEnum } from 'src/app/core/models/transaction.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  apiUrl: string = `${environment.apiUrl}/Detail`

  constructor(private http: HttpClient) { 
  }

  get(name?: string, categoryId?: number, transactionId?: number, transactionTypeId?: number, repetition?: RepetitionEnum, startDate?: Date, endDate?: Date){

    let params = new HttpParams();
    if (name) params = params.append('name', name);
    if (categoryId) params = params.append('categoryId', categoryId);
    if (transactionId) params = params.append('transactionId', transactionId)
    if (transactionTypeId) params = params.append('transactionTypeId', transactionTypeId);
    if (repetition) params = params.append('repetition', repetition);
    if (startDate) params = params.append('startDate', startDate.toISOString());
    if (endDate) params = params.append('endDate', endDate.toISOString());
    
    return this.http.get<Detail[]>(`${this.apiUrl}/filtered`, { params })
  }

  getByTransactionId(transactionId: number): Observable<Detail[]> {
    return this.get(undefined, undefined, transactionId, undefined, undefined, undefined, undefined) 
  }

  getById(id: number): Observable<Detail> {
    return this.getById(id);
  }

  create(form: DetailTransactionCreateForm) {
    return this.http.post<Detail>(`${this.apiUrl}/detailtransaction`, form);
  }
}