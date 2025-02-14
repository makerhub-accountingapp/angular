import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { IonButtons, IonButton, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Account } from 'src/app/core/models/account.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, RouterModule, IonButton ],
})
export class HeaderComponent  implements OnInit {

  @Input({required: true}) currentUser!: User
  accounts!: Account[];
  currentAccount!: Account;

  constructor() {

  }

  ngOnInit() {
    
  }


  openUserMenu(): void {

  }
}
