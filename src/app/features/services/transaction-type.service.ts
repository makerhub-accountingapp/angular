import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
