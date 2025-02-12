import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { IonButtons, IonButton, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, RouterModule, IonButton, IonIcon ],
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  openUserMenu(): void {

  }
}
