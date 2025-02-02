import { Component, OnInit } from '@angular/core';
import { Detail, DetailCreateForm, DetailUpdateForm } from 'src/app/core/models/detail.model';
import { IonList, IonItem, IonLabel, IonAvatar } from '@ionic/angular/standalone';
import { BaseComponent } from 'src/app/shared/templates/components/base/base.component';
import { DetailService } from '../../services/detail.service';
import { DatePipe, AsyncPipe } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-hisotry',
  templateUrl: './hisotry.component.html',
  styleUrls: ['./hisotry.component.scss'],
  imports: [ IonList, IonItem, IonLabel, IonAvatar, DatePipe, AsyncPipe ] 
})
export class HisotryComponent extends BaseComponent<Detail, DetailCreateForm, DetailUpdateForm, DetailService> implements OnInit{

  details$: Observable<Detail[]> = new BehaviorSubject<Detail[]>([]);

  constructor(service: DetailService) {
    super();
    this.setServie(service);
  }

  ngOnInit(): void {
    this.details$ = this.get();
  }
}