import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonMenuToggle, IonItem, IonLabel, IonSplitPane, IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  imports: [ IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonMenuToggle, IonItem, IonLabel, IonAvatar, RouterModule],
})
export class UserMenuComponent  implements OnInit {

  pages = [
    { title: 'User setting', url: '/input', icon: '../../../../assets/icon/person-outline.svg'},
    { title: 'Manage accounts', url: '/report', icon: '../../../../assets/icon/card-outline.svg' },
    { title: 'Manage categories', url: '/report', icon: '../../../../assets/icon/pricetag-outline.svg' },
    { title: 'Manage transaction types', url: '/report', icon: '../../../../assets/icon/file-tray-stacked-outline.svg' },
  ]

  constructor() { }

  ngOnInit() {}

}
