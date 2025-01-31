import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, RouterModule ],
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
