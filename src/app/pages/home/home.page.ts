import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { ChartComponent } from 'src/app/features/components/chart/chart.component';
import { AccountService } from 'src/app/features/services/account.service';
import { UserService } from 'src/app/features/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton,  IonContent, ChartComponent, FormsModule, IonButton ]
})
export class HomePage implements OnInit {

  accountId!: number;
  total!: number;
  available: number = 0;
  balance: number = 0;
  expenses: number = -250;
  isEditing: boolean = false;

  constructor(private router: Router, private serviceA: AccountService) { 
  }

  ngOnInit() {
    this.isEditing = false;
    const storageValue = localStorage.getItem('accountId');

    if (storageValue) {
      this.accountId = parseInt(storageValue);

      this.serviceA.getById(this.accountId).subscribe(data => {
        this.balance = data.balance;
        this.available = this.balance + this.expenses;
        console.log('home accountId' + this.accountId)
        console.log(data)
      });
    }
  }

  changeIsEditing(): void {
    this.isEditing = !this.isEditing;
    this.available = this.balance + this.expenses;
  }

  redirectToInput(): void {
    this.router.navigate(['/input'])
  }
}
