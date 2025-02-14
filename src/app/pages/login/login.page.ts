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
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/features/services/user.service';
import { Router, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    PasswordModule
  ],
})
export class LoginPage implements OnInit {
  isLoggedIn!: boolean;
  form!: FormGroup;
  currentUser!: User;

  constructor(
    private fb: FormBuilder,
    private serviceU: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required], []],
        password: ['', [Validators.required], []],
      },
      {}
    );

    const storageValue = localStorage.getItem('userId');

    if (storageValue) {
      this.isLoggedIn = true;
      this.serviceU.getById(parseInt(storageValue)).subscribe((data) => {
        this.currentUser = data;
        console.log(this.currentUser)
      });

      this.router.navigate(['/home'])
    }
  }

  login(): void {
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;

    console.log(email);
    console.log(password)

    this.serviceU.login(email, password).subscribe(data => {
      this.currentUser = data;
      
      if (this.currentUser) {
        this.isLoggedIn = true;
        localStorage.setItem('userId', this.currentUser.id.toString());
        this.router.navigate(['/home']);
      }
    })
  }
}
