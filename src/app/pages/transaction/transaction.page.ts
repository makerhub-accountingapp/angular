import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RepetitionEnum, Transaction } from 'src/app/core/models/transaction.model';
import { Detail } from 'src/app/core/models/detail.model';
import { TransactionService } from 'src/app/features/services/transaction.service';
import { DetailService } from 'src/app/features/services/detail.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { TransactionValidator } from 'src/app/shared/validators/transaction.validator';
import { Repetition } from 'src/app/core/models/repetition.model';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { HisotryComponent } from "../../features/components/hisotry/hisotry.component";
import { TableComponent } from "../../features/components/table/table.component";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
  standalone: true,
  imports: [IonContent,
    CommonModule,
    FormsModule,
    ButtonModule,
    FloatLabelModule,
    IftaLabelModule,
    InputNumberModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    TextareaModule,
    ReactiveFormsModule,
    MessageModule,
    ToastModule,
    HisotryComponent,
    TableComponent,]
})
export class TransactionPage implements OnInit {

  id: string | null = null;
  intId!: number;
  transaction!: Transaction;
  details!: Detail[];
  repetitions!: Repetition[];
  isEditing: boolean = false;
  tableHeight!: string;

  form!: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private tService: TransactionService, private dService: DetailService, private fb: FormBuilder, private serviceM: MessageService) {
    this.route.paramMap.subscribe(params => this.id = params.get('id'))

    this.form = this.fb.group({
      repetition: ['', [Validators.required], []],
      setDate: ['', [Validators.required], []],
      endDate: ['', [], []],
    },
      { validators: TransactionValidator.endDateRequiredValidator }
    );
  }

  ngOnInit() {
    /********** Default setups **********/

    if (this.id) this.intId = parseInt(this.id)

    // Sets up repetitions
    this.repetitions = [
      { id: 1, name: 'No Repeat' },
      { id: 2, name: 'Daily' },
      { id: 3, name: 'Weekly' },
      { id: 4, name: 'Monthly' },
      { id: 5, name: 'Yearly' },
    ];

    // Gets transaction
    if (this.id) this.tService.getById(parseInt(this.id)).subscribe(data => {
      this.transaction = {
        ...data,
        setDate: new Date(data.setDate),
        endDate: data.endDate ? new Date(data.endDate) : null
      };
      console.log(data);
      console.log(this.transaction);

      const repetition = this.repetitions[data.repetition].name;

      this.form.patchValue({
        repetition: data.repetition,
        setDate: this.transaction.setDate,
        endDate: this.transaction.endDate
      })

      this.form.get('repetition')?.disable();
      this.form.get('setDate')?.disable();
      this.form.get('endDate')?.disable();
    });


    // Gets details
    if (this.id) this.dService.getByTransactionId(parseInt(this.id)).subscribe(data => {
      this.details = data;
    });


    this.onChangeRepeat();
    this.updateTableHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateTableHeight();
  }

  GoToHistory(): void {
    this.router.navigate(['/report']);
  }

  change(): void {
    this.isEditing = true;
    
    if (this.form.get('repetition')?.value != 1) {
      this.form.get('endDate')?.enable(); 
    }
  }

  onChangeRepeat() {
    this.form.get('repetition')?.valueChanges.subscribe(value => {
      const endDateControl = this.form.get('endDate');

      if (value == 1) {
        this.form.get('endDate')?.disable();
      } else {
        this.form.get('endDate')?.enable();
      }
    });
  }

  send(): void {
    this.isEditing = false;
    this.form.get('repetition')?.disable();
    this.form.get('setDate')?.disable();
    this.form.get('endDate')?.disable();
  }

  updateTableHeight(): void {
    const windowHeight = window.innerHeight;
    this.tableHeight = `${windowHeight * 0.55}px`;
  }

  // initForm(): void {
  //   this.form = this.fb.group({
  //     name: [this.transaction.name, [Validators.required, Validators.minLength(1)], []],
  //     repetition: [this.transaction.repetition, [Validators.required], []],
  //     setDate: [this.transaction.setDate, [Validators.required], []],
  //     endDate: [this.transaction.setDate, [], []],
  //   },
  //     { validators: TransactionValidator.endDateRequiredValidator }
  //   );

  //   this.form.get('name')?.disable();
  //   this.form.get('repetition')?.disable();
  //   this.form.get('setDate')?.disable();
  //   this.form.get('endDate')?.disable();
  // }
}
