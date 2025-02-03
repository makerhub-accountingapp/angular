import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Detail, DetailCreateForm, DetailGetForm, DetailUpdateForm } from 'src/app/core/models/detail.model';
import { RepetitionEnum } from 'src/app/core/models/transaction.model';
import { BaseService } from 'src/app/shared/templates/services/base.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DetailService extends BaseService<Detail, DetailCreateForm, DetailUpdateForm> {

  constructor(http: HttpClient) { 
    super(http);
    this.setApiUrl('Detail');
  }

  override get(name?: string, categoryId?: number, transactionTypeId?: number, repetition?: RepetitionEnum, startDate?: Date, endDate?: Date){

    let params = new HttpParams();
    if (name) params = params.append('name', name);
    if (categoryId) params = params.append('categoryId', categoryId);
    if (transactionTypeId) params = params.append('transactionTypeId', transactionTypeId);
    if (repetition) params = params.append('repetition', repetition);
    if (startDate) params = params.append('startDate', startDate.toISOString());
    if (endDate) params = params.append('endDate', endDate.toISOString());
    
    return this.http.get<Detail[]>(`${this.apiUrl}/filtered`, { params })
  }
}