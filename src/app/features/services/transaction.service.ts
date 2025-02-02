import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction, TransactionCreateForm, TransactionUpdateForm } from 'src/app/core/models/transaction.model';
import { BaseService } from 'src/app/shared/templates/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService<Transaction, TransactionCreateForm, TransactionUpdateForm> {

  constructor(http: HttpClient) { 
    super(http);
    this.setApiUrl('Transaction');
  }
}
