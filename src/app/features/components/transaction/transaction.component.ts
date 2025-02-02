import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionCreateForm, TransactionUpdateForm } from 'src/app/core/models/transaction.model';
import { BaseComponent } from 'src/app/shared/templates/components/base/base.component';
import { TransactionService } from '../../services/transaction.service';
import { IonList, IonItem, IonLabel, IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  imports: [ IonList, IonItem, IonLabel, IonAvatar]
})
export class TransactionComponent extends BaseComponent<Transaction, TransactionCreateForm, TransactionUpdateForm, TransactionService> implements OnInit {

  constructor(service: TransactionService) { 
    super();
    this.setServie(service);
  }

  ngOnInit() {
    this.get();
  }
}
