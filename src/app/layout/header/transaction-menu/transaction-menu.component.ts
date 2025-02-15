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
    { title: 'Add new transaction', url: '/input', icon: 'http://www.w3.org/2000/svg'},
    { title: 'View history and statistics', url: '/report', icon: 'http://www.w3.org/2000/svg' },
  ]

  constructor() { }

  ngOnInit() {}

}
