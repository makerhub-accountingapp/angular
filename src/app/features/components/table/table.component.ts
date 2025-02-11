import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DetailService } from '../../services/detail.service';
import { Detail } from 'src/app/core/models/detail.model';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [TableModule, ButtonModule, DatePipe]
})
export class TableComponent  implements OnInit {
  @Input({required: true}) transactionId!: number;
  @Input({required: true}) height!: string;
  details!: Detail[];
  total: number = 0;

  constructor(private serviceD: DetailService) { }

  ngOnInit() {
    console.log(this.transactionId);
    this.serviceD.getByTransactionId(this.transactionId).subscribe(data => {
      
      this.details = data.map(d => ({
        ...d,
        transactionDate: new Date(d.transactionDate)
      }))

      for (let i = 0; i < this.details.length; i++) {
        this.total += this.details[i].amount;
      }

      console.log(this.details);
    });
  }
}
