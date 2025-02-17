import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Account } from 'src/app/core/models/account.model';
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

  constructor(private serviceA: AccountService, private fb: FormBuilder) { }

  ngOnInit() {
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

  add(): void {

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
