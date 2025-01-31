import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Detail, DetailCreateForm, DetailUpdateForm } from 'src/app/core/models/detail.model';
import { BaseHubService } from 'src/app/shared/templates/services/base-hub.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DetailService extends BaseHubService<Detail, DetailCreateForm, DetailUpdateForm> {

  constructor(http: HttpClient) { 
    super(http, environment.detailHub, 'Detail');
  }
}
