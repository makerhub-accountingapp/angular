import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ButtonModule, FloatLabelModule, IftaLabelModule, InputNumberModule, InputTextModule, DatePickerModule, SelectModule, TextareaModule ]
})
export class InputPage implements OnInit {

  max: number = Number.MAX_VALUE;
  title!: string;
  amount!: number
  isPositive: boolean = false;
  currentTime!: Date;
  isOneTime: boolean = true;
  repeats!: string[];
  selectedRepeat!: string;
  endDate?: Date;
  types!: TransactionType[];
  selectedType!: TransactionType;
  categories!: Category[];
  selectedCategory!: Category;
  note: string = "";

  constructor() { }

  ngOnInit() {
    this.currentTime = new Date();

    this.repeats = [
      "No Repeat", 
      "Daily", 
      "Weekly", 
      "Monthly", 
      "Yearly", 
    ];

    this.selectedRepeat = this.repeats[0];

    this.types = [
      { id: 1, name: "one-time payment" }
    ]

    this.selectedType = this.types[0];

    this.categories = [
      { id: 1, name: "groceries" }
    ]

    this.selectedCategory = this.categories[0];
  }

  changePositiveNegative(): void {
    this.isPositive = !this.isPositive
  }

  onChangeRepeat() {
    if (this.selectedRepeat == this.repeats[0]){
      this.isOneTime = true;
    } else {
      this.isOneTime = false;
    }
  }
}
