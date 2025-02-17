import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { RepetitionEnum } from 'src/app/core/models/transaction.model';
import { Category } from 'src/app/core/models/category.model';
import {
  TransactionType,
  TransactionTypeCreateForm,
  TransactionTypeUpdateForm,
} from 'src/app/core/models/transactionType.model';
import { TextareaModule } from 'primeng/textarea';
import { TransactionValidator } from 'src/app/shared/validators/transaction.validator';
import { TransactionTypeService } from 'src/app/features/services/transaction-type.service';
import { BaseComponent } from 'src/app/shared/templates/components/base/base.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryService } from 'src/app/features/services/category.service';
import { MessageModule } from 'primeng/message'
import { Detail, DetailTransactionCreateForm } from 'src/app/core/models/detail.model';
import { DetailService } from 'src/app/features/services/detail.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Repetition } from 'src/app/core/models/repetition.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    ButtonModule,
    FloatLabelModule,
    IftaLabelModule,
    InputNumberModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    TextareaModule,
    ReactiveFormsModule,
    MessageModule,
    ToastModule
  ],
})
export class InputPage implements OnInit {
  max: number = Number.MAX_VALUE;
  isPositive: boolean = false;
  repetitions!: Repetition[];
  types!: TransactionType[];
  categories!: Category[];
  createdEntity?: Detail;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private serviceTT: TransactionTypeService, private serviceC: CategoryService, private serviceD: DetailService, private ServiceM: MessageService) { }

  ngOnInit() {

    /********** FormGroup setting **********/

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)], []],
      amount: [
        null,
        [Validators.required, Validators.min(0), Validators.max(this.max)],
        [],
      ],
      repetition: [1, [Validators.required], []],
      transactionDate: [new Date(), [Validators.required], []],
      endDate: [null],
      transactionTypeId: [
        undefined,
        [Validators.required, TransactionValidator.optionValid],
        [],
      ],
      categoryId: [
        undefined,
        [Validators.required, TransactionValidator.optionValid],
        [],
      ],
      note: ['', [], []],
    },
      { validators: TransactionValidator.endDateRequiredValidator }
    );

    /********** Other default settings **********/

    // endDate is diabled by default and when the repetition != no-repeat, it will be enabled
    this.form.get('endDate')?.disable();
    this.onChangeRepeat();

    // get otions
    this.getTypes();
    this.getCategories();

    this.repetitions = [
      { id: 1, name: 'No Repeat' },
      { id: 2, name: 'Daily' },
      { id: 3, name: 'Weekly' },
      { id: 4, name: 'Monthly' },
      { id: 5, name: 'Yearly' },
    ];
  }

  /********** Methods **********/

  getTypes(): void {
    this.serviceTT.get().subscribe(data => this.types = data);
  }

  getCategories(): void {
    this.serviceC.get().subscribe(data => this.categories = data);
  }

  changePositiveNegative(): void {
    this.isPositive = !this.isPositive;
  }

  onChangeRepeat() {
    this.form.get('repetition')?.valueChanges.subscribe(value => {
      const endDateControl = this.form.get('endDate');

      if (value == 1) {
        this.form.get('endDate')?.disable();
      } else {
        this.form.get('endDate')?.enable();
      }
    });
  }

  send(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      console.log('invalid form')
    } else {

      let amount: number = this.form.controls['amount'].value;
      if (!this.isPositive) amount *= -1

      let dtForm: DetailTransactionCreateForm = {
        name: this.form.controls['name'].value,
        amount: amount,
        repetition: this.form.controls['repetition'].value,
        transactionDate: this.form.controls['transactionDate'].value.toISOString().split('.')[0],

        //TODO Add verification to endDate (endDate > transactionDate)
        //TODO Add success or fail message
        
        endDate: this.form.controls['endDate'].value.toISOString().split('.')[0],
        transactionTypeId: this.form.controls['transactionTypeId'].value,
        categoryId: this.form.controls['categoryId'].value,
        note: this.form.controls['note'].value,
        accountId: 1,
      }

      this.serviceD.create(dtForm).subscribe(data => {
        this.createdEntity = data;

        if (this.createdEntity == null) {
          this.ServiceM.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error occured during the procedure.'
          })
        } else {
          this.ServiceM.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Successfully registered.'
          })

          console.log(this.createdEntity);
        }
      });
    }
  }
}

/********** Note **********/

// this.form = this.fb.group({
//   name: [
//     '', // Default value
//     [Validators.required, Validators.minLength(2)], // Sync validations
//     [] // Async validations
//   ]
// });

// To change css of primeNG element, try :
// class=""
// style=""
// [style]="{'attribute': 'value' }"
