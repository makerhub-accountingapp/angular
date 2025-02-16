import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { TransactionMenuComponent } from './layout/header/transaction-menu/transaction-menu.component';
import { HeaderComponent } from './layout/header/header.component';
import { User } from './core/models/user.model';
import { UserMenuComponent } from "./layout/header/user-menu/user-menu.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonContent, RouterModule, TransactionMenuComponent, HeaderComponent, UserMenuComponent, UserMenuComponent],

})
export class AppComponent {

  constructor() {}
}
