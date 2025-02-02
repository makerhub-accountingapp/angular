import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { MonthEnum } from 'src/app/core/models/monthEnum.model';
import { HisotryComponent } from 'src/app/features/components/hisotry/hisotry.component';
import { StatisticsComponent } from 'src/app/features/components/statistics/statistics.component';
import { TransactionComponent } from 'src/app/features/components/transaction/transaction.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [ IonContent, HisotryComponent, StatisticsComponent, TransactionComponent ]
})
export class ReportPage implements OnInit {

  isCategory: boolean = true;
  filter: string = 'Category';
  transactionTypes: string[] = [
    'One-Time Payment',
    'Monthly Payment',
    'Savings',
    'Wedding',
    'Trip'
  ];
  currentMonth: number = (new Date).getMonth();
  selectedMonth: string = MonthEnum[this.currentMonth];

  constructor() { }

  ngOnInit() {}

  changeFilter() {
    this.isCategory = !this.isCategory;
    if (this.isCategory) {
      this.filter = 'Category';
    } else {
      this.filter = 'Name';
    }
  }

  changeToNextMonth() {
    this.currentMonth += 1;

    if (this.currentMonth > 12) {
      this.currentMonth = 1;
    }

    this.selectedMonth = MonthEnum[this.currentMonth];
  }

  changeToPreviousMonth() {
    this.currentMonth -= 1;

    if (this.currentMonth < 1) {
      this.currentMonth = 12;
    }

    this.selectedMonth = MonthEnum[this.currentMonth];
  }
}
