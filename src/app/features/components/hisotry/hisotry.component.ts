import { Component, OnInit } from '@angular/core';
import { DetailService } from '../../services/detail.service';
import { Detail, DetailCreateForm, DetailUpdateForm } from 'src/app/core/models/detail.model';
import { BaseComponent } from 'src/app/shared/templates/components/base/base.component';

@Component({
  selector: 'app-hisotry',
  templateUrl: './hisotry.component.html',
  styleUrls: ['./hisotry.component.scss'],
})
export class HisotryComponent extends BaseComponent<Detail, DetailCreateForm, DetailUpdateForm, DetailService> {

  constructor(service: DetailService) {
    super();
    this.setServie(service);
  }
}
