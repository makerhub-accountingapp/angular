import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { IonButtons, IonButton, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonSelect, IonList, IonItem, IonSelectOption } from '@ionic/angular/standalone';
import { Account } from 'src/app/core/models/account.model';
import { User } from 'src/app/core/models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, RouterModule, IonButton, IonSelect, IonList, IonItem, IonSelectOption, FormsModule ],
})
export class HeaderComponent  implements OnInit {

  @Input({required: true}) currentUser!: User
  accounts: Account[] = [
    {id: 1, name: 'Main', balance: 50, userId: 1, user: this.currentUser, transactions: []},
    {id: 2, name: 'Sub', balance: 100, userId: 1, user: this.currentUser, transactions: []},

  ];
  currentAccountId: number = 1;

  constructor() {

  }

  ngOnInit() {
    
  }


  openUserMenu(): void {

  }
}
