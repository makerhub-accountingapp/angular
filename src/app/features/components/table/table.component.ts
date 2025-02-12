import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DetailService } from '../../services/detail.service';
import { Detail } from 'src/app/core/models/detail.model';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message'
import { SelectModule } from 'primeng/select';
import { TransactionTypeService } from '../../services/transaction-type.service';
import { TransactionType } from 'src/app/core/models/transactionType.model';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [TableModule, ButtonModule, DatePipe, DialogModule, FloatLabelModule, IftaLabelModule,InputNumberModule, DatePickerModule, MessageModule, SelectModule, ReactiveFormsModule]
})
export class TableComponent  implements OnInit {
  @Input({required: true}) transactionId!: number;
  @Input({required: true}) height!: string;
  details!: Detail[];
  total: number = 0;
  selectedDetail!: Detail;
  visible: boolean = false;
  types!: TransactionType[];
  categories!: Category[];

  constructor(private serviceD: DetailService, private serviceTT: TransactionTypeService, private serviceC: CategoryService, private fb: FormBuilder) { 
    this.form = this.fb.group({
          transactionDate: ['', [Validators.required], []],
          amount: ['', [Validators.required], []],
          transactionTypeId: ['', [Validators.required], []],
          categoryId: ['', [Validators.required], []],
          note: ['', [Validators.required], []]
        },
          {}
        );
  }

  max: number = Number.MAX_VALUE;
  form!: FormGroup;

  ngOnInit() {
    this.serviceD.getByTransactionId(this.transactionId).subscribe(data => {
      
      this.details = data.map(d => ({
        ...d,
        transactionDate: new Date(d.transactionDate)
      }))

      for (let i = 0; i < this.details.length; i++) {
        this.total += this.details[i].amount;
      }
    });

    this.serviceTT.get().subscribe(data => {
      this.types = data;
    });

    this.serviceC.get().subscribe(data => {
      this.categories = data;
    })

    this.form.get('transactionDate')?.disable();
    this.form.get('amount')?.disable();
    this.form.get('transactionTypeId')?.disable();
    this.form.get('categoryId')?.disable();
    this.form.get('note')?.disable();
  }

  showDialog(detail: Detail): void {
    this.selectedDetail = {
      ...detail,
      transactionType: {...detail.transactionType},
      category: {...detail.category},
    };
    
    this.form.patchValue({
      transactionDate: this.selectedDetail.transactionDate,
      amount: this.selectedDetail.amount,
      transactionTypeId: this.selectedDetail.transactionType.id,
      categoryId: this.selectedDetail.category.id,
      note: this.selectedDetail.note
    })

    this.visible = true;
  }
}
