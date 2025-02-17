import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TransactionType, TransactionTypeCreateForm, TransactionTypeUpdateForm } from 'src/app/core/models/transactionType.model';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { TransactionTypeService } from 'src/app/features/services/transaction-type.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.page.html',
  styleUrls: ['./types.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, FloatLabelModule, InputTextModule, MessageModule, ButtonModule,]
})
export class TypesPage implements OnInit {

  transactionTypes!: TransactionType[];
  editingId!: number | null;
  form!: FormGroup
  isAdded: boolean = false;
  isChanged: boolean = false;
  isDeleted: boolean = false;
  clickCount: number = 0;

  constructor(private serviceC: TransactionTypeService, private fb: FormBuilder, private ngZone: NgZone) { }

  ngOnInit() {
    this.initPage();
  }

  add(): void {
    const userId = localStorage.getItem('userId');
    const newName = this.form.controls['newName'].value;

    if (userId && newName) {
      const form: TransactionTypeCreateForm = {
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
    this.form.get(`transactionType${id}`)?.enable();
  }

  save(id: number) {
    this.editingId = null;
    this.disableAll();
    this.form.get('newName')?.enable();

    const userId = localStorage.getItem('userId');
    const newName = this.form.controls[`transactionType${id}`].value;
    let selectedAccount: TransactionType;

    this.serviceC.getById(id).subscribe(data => {
      selectedAccount = data;
      if (userId && newName) {
        const form: TransactionTypeUpdateForm = {
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
        this.transactionTypes = data;

        this.initForm();
        this.patchForm();
        this.disableAll();
      });
    }
  }

  initForm() {
    const controls: { [key: string]: FormControl } = {};

    this.transactionTypes.forEach((transactionType, index) => {
      controls['transactionType' + transactionType.id] = new FormControl('');
    });

    controls['newName'] = new FormControl('');

    this.form = this.fb.group(controls);
  }

  patchForm(): void {
    this.transactionTypes.forEach((transactionType, index) => {
      this.form.patchValue({
        ['transactionType' + transactionType.id]: transactionType.name
      });
    });
  }

  disableAll(): void {
    this.transactionTypes.forEach((transactionType, index) => {
      this.form.get(`transactionType${transactionType.id}`)?.disable();
    });
  }
}
