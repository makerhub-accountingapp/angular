import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ButtonModule, FloatLabelModule, IftaLabelModule, InputNumberModule, InputTextModule, DatePickerModule, SelectModule ]
})
export class InputPage implements OnInit {

  max: number = Number.MAX_VALUE;
  title!: string;
  amount!: number
  isPositive: boolean = false;
  currentTime!: Date;
  isRepeating: boolean = false;
  repeats!: string[];
  selectedRepeat!: string;

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
  }

  changePositiveNegative(): void {
    this.isPositive = !this.isPositive
  }
}
