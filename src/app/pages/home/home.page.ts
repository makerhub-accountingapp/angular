import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import dayjs from 'dayjs';
import { AccountUpdateForm } from 'src/app/core/models/account.model';
import { ChartComponent } from 'src/app/features/components/chart/chart.component';
import { AccountService } from 'src/app/features/services/account.service';
import { DetailService } from 'src/app/features/services/detail.service';
import { UserService } from 'src/app/features/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, ChartComponent, FormsModule, IonButton],
})
export class HomePage implements OnInit {
  accountId!: number;
  total: number = 0;
  available: number = 0;
  balance: number = 0;
  isEditing: boolean = false;

  constructor(
    private router: Router,
    private serviceA: AccountService,
    private serviceD: DetailService
  ) {}

  ngOnInit() {
    this.isEditing = false;
    this.loadAccountData();

    setInterval(() => {
      const newAccountId = localStorage.getItem('accountId');
      if(newAccountId && parseInt(newAccountId) !== this.accountId) {
        this.loadAccountData();
      }
    }, 1000);
  }

  changeIsEditing(): void {
    this.isEditing = true;
  }

  changeBalance(): void {
    this.isEditing = false;
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.serviceA.getById(this.accountId).subscribe((data) => {
        const form: AccountUpdateForm = {
          id: this.accountId,
          name: data.name,
          balance: this.balance,
          userId: parseInt(userId),
        };
        this.serviceA.update(form).subscribe((data) => {
          this.balance = data.balance;
          this.loadAccountData();
        });
      });
    }

    this.available = this.balance + this.total;
  }

  redirectToInput(): void {
    this.router.navigate(['/input']);
  }

  loadAccountData(): void {
    const storageAccount = localStorage.getItem('accountId');

    if (storageAccount) {
      this.accountId = parseInt(storageAccount);

      this.serviceA.getById(this.accountId).subscribe((data) => {
        this.balance = data.balance;

        this.updateAvailable();
      });
    }
  }

  updateAvailable(): void {
    this.total = 0;
    const startDate = dayjs().startOf('month').toDate();
    const endDate = dayjs().endOf('month').toDate();

    this.serviceD
      .get(undefined, undefined, undefined, undefined, undefined, this.accountId, startDate, endDate)
      .subscribe((data) => {

        data.map((d) => {
          this.total += d.amount;
        });
        this.available = this.balance + this.total;
      });
  }
}
