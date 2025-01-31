import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { TransactionMenuComponent } from './layout/header/transaction-menu/transaction-menu.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonContent, RouterModule, TransactionMenuComponent, HeaderComponent],

})
export class AppComponent {

  pages = [
    { title: 'View history and statistics', url: '/report', icon: 'http://www.w3.org/2000/svg' },
  ]
  constructor() {}
}
