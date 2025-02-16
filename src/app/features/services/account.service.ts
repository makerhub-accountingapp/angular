import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { Account, AccountCreateForm, AccountUpdateForm } from 'src/app/core/models/account.model';
import { BaseService } from 'src/app/shared/templates/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<Account, AccountCreateForm, AccountUpdateForm> {

  constructor(http: HttpClient) { 
    super(http);
    this.setApiUrl('Account');
  }
}
