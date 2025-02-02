import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import dayjs from 'dayjs';
import { MonthEnum } from 'src/app/core/models/monthEnum.model';
import { HisotryComponent } from 'src/app/features/components/hisotry/hisotry.component';
import { StatisticsComponent } from 'src/app/features/components/statistics/statistics.component';
import { TransactionComponent } from 'src/app/features/components/transaction/transaction.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TransactionTypeService } from 'src/app/features/services/transaction-type.service';
import { BaseComponent } from 'src/app/shared/templates/components/base/base.component';
import { TransactionType, TransactionTypeCreateForm, TransactionTypeUpdateForm } from 'src/app/core/models/transactionType.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [ IonContent, HisotryComponent, StatisticsComponent, DatePipe, AsyncPipe ]
})
export class ReportPage extends BaseComponent<TransactionType, TransactionTypeCreateForm, TransactionTypeUpdateForm, TransactionTypeService> implements OnInit {

  isCategory: boolean = true;
  filter: string = 'Category';
  transactionTypes$: Observable<TransactionType[]> = new BehaviorSubject<TransactionType[]>([]);

  selectedDate: Date = new Date();

//   console.log(dayjs().startOf('month').format('YYYY-MM-DD')); // 今月の最初の日
// console.log(dayjs().endOf('month').format('YYYY-MM-DD'));   // 今月の最後の日


  constructor(service: TransactionTypeService) { 
    super();
    this.setServie(service);
  }

  ngOnInit() { 
    this.transactionTypes$ = this.get();
  }

  changeFilter() {
    this.isCategory = !this.isCategory;
    if (this.isCategory) {
      this.filter = 'Category';
    } else {
      this.filter = 'Name';
    }
  }

  changeToNextMonth() {
    if (dayjs().isAfter(this.selectedDate, 'month')) {
      this.selectedDate = dayjs(this.selectedDate).add(1, 'month').toDate();
    }
  }

  changeToPreviousMonth() {
      this.selectedDate = dayjs(this.selectedDate).add(-1, 'month').toDate();
  }
}
