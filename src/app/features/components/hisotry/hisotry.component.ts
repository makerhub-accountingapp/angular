import { Component, OnInit } from '@angular/core';
import { Detail, DetailCreateForm, DetailUpdateForm } from 'src/app/core/models/detail.model';
import { IonList, IonItem, IonLabel, IonAvatar } from '@ionic/angular/standalone';
import { BaseComponent } from 'src/app/shared/templates/components/base/base.component';
import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'app-hisotry',
  templateUrl: './hisotry.component.html',
  styleUrls: ['./hisotry.component.scss'],
  imports: [ IonList, IonItem, IonLabel, IonAvatar] 
})
export class HisotryComponent extends BaseComponent<Detail, DetailCreateForm, DetailUpdateForm, DetailService> implements OnInit{

  ngOnInit(): void {
    this.get();
  }

  constructor(service: DetailService) {
    super();
    this.setServie(service);
  }
}