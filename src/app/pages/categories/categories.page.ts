import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Category, CategoryCreateForm, CategoryUpdateForm } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/features/services/category.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, FloatLabelModule, InputTextModule, MessageModule, ButtonModule,]
})
export class CategoriesPage implements OnInit {

  categories!: Category[];
  editingId!: number | null;
  form!: FormGroup
  isAdded: boolean = false;
  isChanged: boolean = false;
  isDeleted: boolean = false;
  clickCount: number = 0;

  constructor(private serviceC: CategoryService, private fb: FormBuilder, private ngZone: NgZone) { }

  ngOnInit() {
    this.initPage();
  }

  add(): void {
    const userId = localStorage.getItem('userId');
    const newName = this.form.controls['newName'].value;

    if (userId && newName) {
      const form: CategoryCreateForm = {
        name: newName,
        userId: parseInt(userId)
      }

      this.serviceC.create(form).subscribe(data => {
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
    this.form.get(`category${id}`)?.enable();
  }

  save(id: number) {
    this.editingId = null;
    this.disableAll();
    this.form.get('newName')?.enable();

    const userId = localStorage.getItem('userId');
    const newName = this.form.controls[`category${id}`].value;
    let selectedAccount: Category;

    this.serviceC.getById(id).subscribe(data => {
      selectedAccount = data;
      if (userId && newName) {
        const form: CategoryUpdateForm = {
          id: id,
          name: newName,
          userId: parseInt(userId)
        }

        this.serviceC.update(form).subscribe(data => {
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
      this.serviceC.delete(id).subscribe(data => {
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
      this.serviceC.getByUserId(parseInt(storageUser)).subscribe(data => {
        this.categories = data;

        this.initForm();
        this.patchForm();
        this.disableAll();
      });
    }
  }

  initForm() {
    const controls: { [key: string]: FormControl } = {};

    this.categories.forEach((category, index) => {
      controls['category' + category.id] = new FormControl('');
    });

    controls['newName'] = new FormControl('');

    this.form = this.fb.group(controls);
  }

  patchForm(): void {
    this.categories.forEach((category, index) => {
      this.form.patchValue({
        ['category' + category.id]: category.name
      });
    });
  }

  disableAll(): void {
    this.categories.forEach((category, index) => {
      this.form.get(`category${category.id}`)?.disable();
    });
  }
}
