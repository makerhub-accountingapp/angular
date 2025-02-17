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
import { User, UserUpdateForm } from 'src/app/core/models/user.model';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

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
  isIncorrectPass: boolean = false;
  isNotCorresponding: boolean = false;

  constructor(private serviceU: UserService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      currentemail: ['', [], []],
      newemail: ['', [Validators.required], []],
      password: ['hidden', [], []],
      currentpw: ['', [Validators.required], []],
      newpw: ['', [Validators.required], []],
      confirmpw: ['', [Validators.required], []]
    }, {});
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(): void {
    const storageUserId = localStorage.getItem('userId');

    if (storageUserId) {
      this.serviceU.getById(parseInt(storageUserId)).subscribe((data) => {
        this.user = data;
        this.form.patchValue({
          currentemail: data.email,
          password: data.password
        });
        this.form.get('currentemail')?.disable();
        this.form.get('password')?.disable();
      });
    }
  }

  saveEmail(): void {
    const confirm = this.form.controls['confirmpw'].value;

    if (confirm != this.user.password) this.isIncorrectPass = true;

    else {
      this.isIncorrectPass = false;
      this.isEditingEmail = false;
      this.form.get('currentemail')?.disable();
      let updateForm: UserUpdateForm;

      const storageUserId = localStorage.getItem('userId');

      if (storageUserId) {
        updateForm = {
          id: parseInt(storageUserId),
          email: this.form.controls['newemail'].value,
          password: this.user.password,
          isActive: true
        }

        this.serviceU.update(updateForm).subscribe(data => {
          this.loadUser();
          this.form.get('newemail')?.reset();
          this.form.get('confirmpw')?.reset();
        });
      }
    }
  }

  savePassword(): void {
    const currentpw = this.form.controls['currentpw'].value;
    const newpw = this.form.controls['newpw'].value;
    const confirm = this.form.controls['confirmpw'].value;

    if (currentpw != this.user.password) this.isIncorrectPass = true;
    else if (newpw != confirm) this.isNotCorresponding = true;

    else {
      this.isIncorrectPass = false;
      this.isNotCorresponding = false;
      this.isEditingPassword = false;
      this.form.get('currentpw')?.disable();
      this.form.get('newpw')?.disable();
      this.form.get('confirmpw')?.disable();
      
      let updateForm: UserUpdateForm;

      const storageUserId = localStorage.getItem('userId');

      if (storageUserId) {
        updateForm = {
          id: parseInt(storageUserId),
          email: this.user.email,
          password: newpw,
          isActive: true
        }

        this.serviceU.update(updateForm).subscribe(data => {
          this.loadUser();
          this.form.get('currentpw')?.reset();
          this.form.get('newpw')?.reset();
          this.form.get('confirmpw')?.reset();
        });
      }
    }
  }

  changeIsEditingEmail(): void {
    this.isEditingEmail = true;
  }

  changeIsEditingPassword(): void {
    this.isEditingPassword = true;
    this.form.patchValue({ currentpw: "" });
    this.form.get('currentpw')?.enable();
  }

  onClickUser(): void {
    this.isEditingEmail = false;
    this.isEditingPassword =false;
    this.form.get('newemail')?.reset();
    this.form.get('currentpw')?.reset();
    this.form.get('newpw')?.reset();
    this.form.get('confirmpw')?.reset();
  }

  logout(): void {
    this.serviceU.logout();
    this.router.navigate(['/login']);
  }

  delete(): void {
    const form: UserUpdateForm = {
      id: this.user.id,
      email: this.user.email,
      password: this.user.password,
      isActive: false
    }

    this.serviceU.update(form).subscribe(data => this.logout())
  }
}
