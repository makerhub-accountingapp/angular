import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { UserService } from 'src/app/features/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    ButtonModule,
  ],
})
export class UserPage implements OnInit {
  form!: FormGroup;
  user!: User;
  isEditingEmail: boolean = false;
  isEditingPassword: boolean = false;

  constructor(private serviceU: UserService, private fb: FormBuilder) {
    this.form = this.fb.group({
      currentemail: ['', [], []],
      newemail: ['', [Validators.required], []],
      currentpw: ['', [Validators.required], []],
      newpw: ['', [Validators.required], []],
      confirmpw: ['', [Validators.required], []]
    }, {});
  }

  ngOnInit() {
    const storageUserId = localStorage.getItem('userId');

    if (storageUserId) {
      this.serviceU.getById(parseInt(storageUserId)).subscribe((data) => {
        this.user = data;
        this.form.patchValue({
          currentemail: data.email,
          currentpw: 'hidden'
        });
        this.form.get('currentemail')?.disable();
        this.form.get('currentpw')?.disable();
      });
    }
  }

  save(): void {
    this.isEditingEmail = false;
    this.isEditingPassword = false;

    this.form.patchValue({currentpw: 'hidden'});
    this.form.get('currentemail')?.disable();
    this.form.get('currentpw')?.disable();

  }

  changeIsEditingEmail(): void {
    this.isEditingEmail = true;
  }

  changeIsEditingPassword(): void {
    this.isEditingPassword = true;
    this.form.patchValue({currentpw: ""});
    this.form.get('currentpw')?.enable();
  }
}
