import { Component, Input, OnInit } from '@angular/core';
import { Detail } from 'src/app/core/models/detail.model';
import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  implements OnInit {

  @Input({required: true}) id!: number; 
  detail!: Detail;
  visible: boolean = false;

  constructor(private serviceD: DetailService) { }

  ngOnInit() {
    this.serviceD.getById(this.id).subscribe(data => {
      this.detail = data;
    })
  }
}
