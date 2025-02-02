import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Detail, DetailCreateForm, DetailUpdateForm } from 'src/app/core/models/detail.model';
import { BaseService } from 'src/app/shared/templates/services/base.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DetailService extends BaseService<Detail, DetailCreateForm, DetailUpdateForm> {

  constructor(http: HttpClient) { 
    super(http);
    this.setApiUrl('Detail');
  }
}