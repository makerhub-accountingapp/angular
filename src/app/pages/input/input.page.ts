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
import { DetailTransactionCreateForm } from 'src/app/core/models/detail.model';

export interface Repetition {
  id: number;
  name: string;
}

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
    MessageModule
  ],
})
export class InputPage implements OnInit {
  max: number = Number.MAX_VALUE;
  isPositive: boolean = false;
  repetitions!: Repetition[];
  types!: TransactionType[];
  categories!: Category[];

  form!: FormGroup;

  constructor(private fb: FormBuilder, private serviceTT: TransactionTypeService, private serviceC: CategoryService) { }

  ngOnInit() {

    /********** FormGroup setting **********/

    this.form = this.fb.group(
      {
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

  send() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      console.log('invalid form')
    } else {
      //TODO service.Create()
      //TODO Amount needs to be controled with +/-

      let amount: number = this.form.controls['amount'].value;
      if (!this.isPositive) amount *= -1

      let dtForm: DetailTransactionCreateForm = {
        name: this.form.controls['name'].value,
        amount: amount,
        repetition: this.form.controls['repetition'].value,
        transactionDate: this.form.controls['transactionDate'].value,
        endDate: this.form.controls['transactionDate'].value,
        transactionTypeId: this.form.controls['transactionTyopeId'].value,
        categoryId: this.form.controls['categoryId'].value,
        note: this.form.controls['note'].value,
        accountId: this.form.controls['accountId'].value,
      }
    }


    console.log(this.form.valid);
    console.log(this.form.controls['name'].valid);
    console.log(this.form.controls['name'].value);
    console.log(this.form.controls['amount'].valid);
    console.log(this.form.controls['amount'].value);
    console.log(this.form.controls['transactionDate'].valid);
    console.log(this.form.controls['transactionDate'].value);
    console.log(this.form.controls['repetition'].valid);
    console.log(this.form.controls['repetition'].value);
    console.log(this.form.controls['endDate'].valid);
    console.log(this.form.controls['endDate'].value);
    console.log(this.form.controls['transactionTypeId'].valid);
    console.log(this.form.controls['transactionTypeId'].value);
    console.log(this.form.controls['categoryId'].valid);
    console.log(this.form.controls['categoryId'].value);
    console.log(this.form.controls['note'].valid);
    console.log(this.form.controls['note'].value);
  }
}

/********** Note **********/

//TODO todo list for HTML
//TODO Change size of +/- icon
//TODO Change Error message position for Amount
//TODO Change transactionDate and EndDate size

// this.form = this.fb.group({
//   name: [
//     '', // Default value
//     [Validators.required, Validators.minLength(2)], // Sync validations
//     [] // Async validations
//   ]
// });
