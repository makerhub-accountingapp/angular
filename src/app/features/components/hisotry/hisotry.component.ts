import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Detail, DetailCreateForm, DetailGetForm, DetailUpdateForm } from 'src/app/core/models/detail.model';
import { IonList, IonItem, IonLabel, IonAvatar } from '@ionic/angular/standalone';
import { BaseComponent } from 'src/app/shared/templates/components/base/base.component';
import { DetailService } from '../../services/detail.service';
import { DatePipe, AsyncPipe } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import dayjs from 'dayjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hisotry',
  templateUrl: './hisotry.component.html',
  styleUrls: ['./hisotry.component.scss'],
  imports: [ IonList, IonItem, IonLabel, IonAvatar, DatePipe, AsyncPipe ] 
})
export class HisotryComponent implements OnInit, OnChanges {

  details$: Observable<Detail[]> = new BehaviorSubject<Detail[]>([]);
  
  @Input() selectedDate!: Date;

  constructor(private service: DetailService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadDetails();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] && !changes['selectedDate'].firstChange) {
      this.loadDetails();
    }
  }

  loadDetails(): void {
    const startDate = dayjs(this.selectedDate).startOf('month').toDate();
    const endDate = dayjs(this.selectedDate).endOf('month').toDate();

    this.details$ = this.service.get(undefined, undefined, undefined, undefined, undefined, startDate, endDate);
  }

  goToTransaction(id: number) {
    this.router.navigate(['/transaction', id]);
  }
}