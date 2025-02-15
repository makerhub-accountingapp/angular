import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { IonButtons, IonButton, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonSelect, IonList, IonItem, IonSelectOption } from '@ionic/angular/standalone';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { User } from 'src/app/core/models/user.model';
import { AccountService } from 'src/app/features/services/account.service';
import { UserService } from 'src/app/features/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, RouterModule, IonButton, IonSelect, IonList, IonItem, IonSelectOption, FormsModule ],
})
export class HeaderComponent  implements OnInit {

  accounts: Account[] = [];
  currentUser!: User;
  currentAccountId!: number;
  isLoggedIn: boolean = false;

  constructor(private serviceU: UserService, private serviceA: AccountService) {

    const userId = localStorage.getItem('userId');
    const accountId = localStorage.getItem('accountId');

    if (userId) {
      this.isLoggedIn = true;
      this.serviceU.getById(parseInt(userId)).subscribe(data => {
        this.currentUser = data;
        this.accounts = [...data.accounts];

        if (accountId) this.currentAccountId = parseInt(accountId)
      });
    }

  }
  ngOnInit(): void {
  }

  openUserMenu(): void {

  }

  onSelectChange(event: any): void {
    console.log('currentAccountId : ' + this.currentAccountId)
    //TODO Accounts.orderbyDescending
    localStorage.setItem('accountId', (this.currentAccountId).toString())
    console.log('header account Id : ' + this.currentAccountId)
  }
}
