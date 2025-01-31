import { Component, inject, OnInit } from '@angular/core';
import { DetailService } from '../../services/detail.service';
import { Detail, DetailCreateForm, DetailUpdateForm } from 'src/app/core/models/detail.model';
import { BaseHubComponent } from 'src/app/shared/templates/components/base-hub/base-hub.component';
import { IonAvatar, IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hisotry',
  templateUrl: './hisotry.component.html',
  styleUrls: ['./hisotry.component.scss'],
  imports: [IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonItem, IonLabel, IonAvatar]
})
export class HisotryComponent extends BaseHubComponent<Detail, DetailCreateForm, DetailUpdateForm, DetailService> implements OnInit{

  ngOnInit(): void {
    this.get();
  }

  constructor(service: DetailService) {
    super();
    this.setServie(service);
  }
}
