import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Account, AccountCreateForm, AccountUpdateForm } from 'src/app/core/models/account.model';
import { AccountService } from 'src/app/features/services/account.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, FloatLabelModule, InputTextModule, MessageModule, ButtonModule,]
})
export class AccountsPage implements OnInit {

  accounts!: Account[];
  editingId!: number | null;
  form!: FormGroup
  isAdded: boolean = false;
  isChanged: boolean = false;
  isDeleted: boolean = false;
  clickCount: number = 0;

  constructor(private serviceA: AccountService, private fb: FormBuilder, private ngZone: NgZone) { }

  ngOnInit() {
    this.initPage();
  }

  add(): void {
    const userId = localStorage.getItem('userId');
    const newName = this.form.controls['newName'].value;

    if (userId && newName) {
      const form: AccountCreateForm = {
        name: newName,
        balance: 0,
        userId: parseInt(userId)
      }

      this.serviceA.create(form).subscribe(data => {
        if (data) {
          this.isAdded = true;
        }

        setTimeout(() => {
          this.isAdded = false;
        }, 5000);
      });
    }
    this.initPage();
    this.ngZone.runOutsideAngular(() => {
      window.location.reload();
    });
  }

  change(id: number): void {
    this.editingId = id;
    this.disableAll();
    this.form.get('newName')?.disable();
    this.form.get(`account${id}`)?.enable();
  }

  save(id: number) {
    this.editingId = null;
    this.disableAll();
    this.form.get('newName')?.enable();

    const userId = localStorage.getItem('userId');
    const newName = this.form.controls[`account${id}`].value;
    let selectedAccount: Account;

    this.serviceA.getById(id).subscribe(data => {
      selectedAccount = data;
      if (userId && newName) {
        const form: AccountUpdateForm = {
          id: id,
          name: newName,
          balance: data.balance,
          userId: parseInt(userId)
        }

        this.serviceA.update(form).subscribe(data => {
          if (data) this.isChanged = true;
          setTimeout(() => {
            this.isChanged = false;
          }, 5000);
          this.initPage();
          this.ngZone.runOutsideAngular(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  delete(id: number): void {
    this.clickCount++;

    if (this.clickCount > 1) {
      this.serviceA.delete(id).subscribe(data => {
        if (data) this.isDeleted = false;
        setTimeout(() => {
          this.isDeleted = false;
        }, 5000);
        this.clickCount = 0;
        this.initPage();
    this.ngZone.runOutsideAngular(() => {
      window.location.reload();
    });
      })
    }
  }

  initPage(): void {
    const storageUser = localStorage.getItem('userId');

    if (storageUser) {
      this.serviceA.getByUserId(parseInt(storageUser)).subscribe(data => {
        this.accounts = data;

        this.initForm();
        this.patchForm();
        this.disableAll();
      });
    }
  }

  initForm() {
    const controls: { [key: string]: FormControl } = {};

    this.accounts.forEach((account, index) => {
      controls['account' + account.id] = new FormControl('');
    });

    controls['newName'] = new FormControl('');

    this.form = this.fb.group(controls);
  }

  patchForm(): void {
    this.accounts.forEach((account, index) => {
      this.form.patchValue({
        ['account' + account.id]: account.name
      });
    });
  }

  disableAll(): void {
    this.accounts.forEach((account, index) => {
      this.form.get(`account${account.id}`)?.disable();
    });
  }
}
