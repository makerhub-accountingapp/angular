import { Component, OnInit, Output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  imports: [IonButton]
})
export class StatisticsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
}
