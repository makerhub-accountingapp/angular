import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { TransactionMenuComponent } from './layout/header/transaction-menu/transaction-menu.component';
import { HeaderComponent } from './layout/header/header.component';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonContent, RouterModule, TransactionMenuComponent, HeaderComponent],

})
export class AppComponent {

  currentUser: User = {
    id: 1,
    email: 'test',
    password: 'test',
    isActive: true,
    accounts: []
  }

  constructor() {}
}
