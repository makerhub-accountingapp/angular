import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionType, TransactionTypeCreateForm, TransactionTypeUpdateForm } from 'src/app/core/models/transactionType.model';
import { BaseService } from 'src/app/shared/templates/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService extends BaseService<TransactionType, TransactionTypeCreateForm, TransactionTypeUpdateForm>{

  constructor(http: HttpClient) { 
    super(http);
    this.setApiUrl('TransactionType');
  }

  getByUserId(userId: number): Observable<TransactionType[]> {
        return this.http.get<TransactionType[]>(`${this.apiUrl}/userId/${userId}`);
      }
}
