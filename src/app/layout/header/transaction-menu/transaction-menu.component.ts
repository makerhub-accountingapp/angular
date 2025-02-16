import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonMenuToggle, IonItem, IonLabel, IonSplitPane, IonAvatar } from '@ionic/angular/standalone';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-transaction-menu',
  templateUrl: './transaction-menu.component.html',
  styleUrls: ['./transaction-menu.component.scss'],
  imports: [ IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonMenuToggle, IonItem, IonLabel, IonAvatar, RouterModule, UserMenuComponent],
})
export class TransactionMenuComponent  implements OnInit {

  pages = [
    { title: 'Add new transaction', url: '/input', icon: '../../../../assets/icon/add-circle-outline.svg'},
    { title: 'View history and statistics', url: '/report', icon: '../../../../assets/icon/stats-chart-outline.svg' },
  ]

  constructor() { }

  ngOnInit() {}

}
