import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { IonButtons, IonButton, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonSelect, IonList, IonItem, IonSelectOption, MenuController, IonMenu, IonContent, IonMenuToggle, IonAvatar, IonLabel } from '@ionic/angular/standalone';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { User } from 'src/app/core/models/user.model';
import { AccountService } from 'src/app/features/services/account.service';
import { UserService } from 'src/app/features/services/user.service';
import { UserMenuComponent } from "./user-menu/user-menu.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, RouterModule, IonButton, IonSelect, IonList, IonItem, IonSelectOption, FormsModule, IonMenu, IonMenu, IonContent, IonMenuToggle, IonAvatar, IonLabel, UserMenuComponent],
})
export class HeaderComponent  implements OnInit {

  accounts: Account[] = [];
  currentAccountId!: number;
  currentUser: User | null = null;
  isLoggedIn: boolean = false;

  constructor(private serviceU: UserService, private serviceA: AccountService, private menuCtrl: MenuController) { }

  ngOnInit(): void {
    this.serviceU.currentUser$.subscribe(data => {
      this.currentUser = data;
      this.isLoggedIn = !!data;
      this.accounts = data ? [...data.accounts] : [];
    })
    
    const accountId = localStorage.getItem('accountId');
    if (accountId) this.currentAccountId = parseInt(accountId)
  }

  openTransactionMenu(): void {
    this.menuCtrl.open('transaction-menu');
  }

  openUserMenu(): void {
    this.menuCtrl.open('user-menu');
  }

  onSelectChange(event: any): void {
    this.currentAccountId = event;
    localStorage.setItem('accountId', (this.currentAccountId).toString())
  }

  //TODO Fix but : when clicking user setting, transaction-menu opens
}
