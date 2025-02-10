import { AbstractControl, ValidationErrors } from "@angular/forms";

export class TransactionValidator {
  static optionValid(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value || value.id < 1) {
      return { optionNotSelected: true };
    }
    return null;
  }

  static endDateRequiredValidator(control: AbstractControl): ValidationErrors | null {
    const repetition = control.get('repetition')?.value;
    const endDate = control.get('endDate');

    if (repetition == 1) return null;
    if (!endDate || !endDate.value) return { endDateRequired: true };
    return null;
  }
}