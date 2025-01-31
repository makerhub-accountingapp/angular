import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HisotryComponent } from 'src/app/features/components/hisotry/hisotry.component';
import { StatisticsComponent } from 'src/app/features/components/statistics/statistics.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [ IonContent, HisotryComponent, StatisticsComponent ]
})
export class ReportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
