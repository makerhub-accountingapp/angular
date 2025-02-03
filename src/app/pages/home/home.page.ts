import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { ChartComponent } from 'src/app/features/components/chart/chart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton,  IonContent, ChartComponent, FormsModule, IonButton ]
})
export class HomePage implements OnInit {

  available: number = 0;
  balance: number = 0;
  expenses: number = -250;
  isEditing: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const storageValue = localStorage.getItem('balance');
    if (storageValue){
      this.balance = parseFloat(storageValue);
    } else {
      this.balance = 0;
    }

    this.available = this.balance + this.expenses;
    this.isEditing = false;
  }

  changeIsEditing(): void {
    this.isEditing = !this.isEditing;
    this.available = this.balance + this.expenses;
    localStorage.setItem('balance', this.balance.toString());
  }

  redirectToInput(): void {
    this.router.navigate(['/input'])
  }
}
