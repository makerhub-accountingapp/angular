import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel'
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber'
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { RepetitionEnum } from 'src/app/core/models/transaction.model';
import { Category } from 'src/app/core/models/category.model';
import { TransactionType } from 'src/app/core/models/transactionType.model';
import { TextareaModule } from 'primeng/textarea';
import { TransactionValidator } from 'src/app/shared/validators/transaction.validator';

export interface Repetition {
  id: number,
  name: string
}

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ButtonModule, FloatLabelModule, IftaLabelModule, InputNumberModule, InputTextModule, DatePickerModule, SelectModule, TextareaModule, ReactiveFormsModule ]
})

export class InputPage implements OnInit {

  max: number = Number.MAX_VALUE;
  isPositive: boolean = false;
  isOneTime: boolean = true;
  repetitions!: Repetition[];
  types!: TransactionType[];
  categories!: Category[];

  form!: FormGroup
  name!: string;
  amount!: number
  repetition!: Repetition;
  setDate!: Date;
  endDate?: Date;
  transactionType!: TransactionType;
  category?: Category;
  note: string = "";

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    /********** Date **********/

    this.setDate = new Date();

    /********** Repetition **********/
    
    this.repetitions = [
      { id: 1, name: "No Repeat" },
      { id: 2, name: "Daily" },
      { id: 3, name: "Weekly" },
      { id: 4, name: "Monthly" },
      { id: 5, name: "Yearly" },
    ]
    
    this.repetition = this.repetitions[0];

    /********** Transaction type **********/
    
    this.types = [
      { id: 0, name: "No type selected"},
      { id: 1, name: "One-time payment" },
    ]
    
    this.transactionType = this.types[0];

    /********** Category **********/

    this.categories = [
      { id: 0, name: "No category selected"},
      { id: 1, name: "Groceries" }
    ]

    this.category = this.categories[0];

    /********** Form Group **********/

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)], []],
      amount: [0, [Validators.required, Validators.min(0), Validators.max(this.max)], []],
      repetition: [this.repetitions[0], [Validators.required], []],
      setDate: [new Date, [Validators.required], []],
      endDate: [null, [], []],
      transactionType: [null, [Validators.required, TransactionValidator.optionValid], []],
      category: [null, [Validators.required, TransactionValidator.optionValid], []],
      note: ['', [], []],
    }, {});
  }

  changePositiveNegative(): void {
    this.isPositive = !this.isPositive
  }

  onChangeRepeat() {
    if (this.repetition == this.repetitions[0]){
      this.isOneTime = true;
    } else {
      this.isOneTime = false;
    }
  }

  send() {
    console.log(this.form.valid);
    console.log(this.form.controls['name'].valid);
    console.log(this.form.controls['name']);
    console.log(this.form.controls['note'].value);
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