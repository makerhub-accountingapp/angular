import { Component, OnInit, Output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  imports: [IonButton]
})
export class StatisticsComponent  implements OnInit {

  isCategory: boolean = true;
  filter: string = 'Category';
  transactionTypes: string[] = [
    'One-Time Payment',
    'Monthly Payment',
    'Savings',
    'Wedding',
    'Trip'
  ];

  constructor() { }

  ngOnInit() {}

  changeFileter() {
    this.isCategory = !this.isCategory;
    if (this.isCategory) {
      this.filter = 'Category';
    } else {
      this.filter = 'Name';
    }
  }
}
