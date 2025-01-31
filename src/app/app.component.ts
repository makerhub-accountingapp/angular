import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonSplitPane, IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, RouterModule, IonSplitPane, IonAvatar],

})
export class AppComponent {

  pages = [
    { title: 'View history and statistics', url: '/report', icon: 'http://www.w3.org/2000/svg' },
  ]
  constructor() {}
}
